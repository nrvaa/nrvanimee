const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lastRequestTime = 0;

// ==== CACHE MEMORI (in-memory) ====
const memoryCache = new Map();       // key -> { data, expiry }
const pendingRequests = new Map();   // key -> Promise (biar request yang sama nggak dobel)
const DEFAULT_CACHE_DURATION = 5 * 60 * 1000; // 5 menit

const getCacheKey = (endpoint, method) => `${method}:${endpoint}`;

const isCacheable = (method) => method.toUpperCase() === 'GET';

export const jikanFetch = async (endpoint, options = {}, retries = 3) => {
    const isServer = typeof window === 'undefined';
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jikan.moe/v4';
    const url = `${baseUrl}${endpoint}`;

    // opsi baru: skipCache & cacheDuration, sisanya tetap jadi fetchOptions asli
    const { skipCache = false, cacheDuration = DEFAULT_CACHE_DURATION, ...restOptions } = options;
    const method = restOptions.method || 'GET';
    const cacheKey = getCacheKey(endpoint, method);
    const cacheable = isCacheable(method);

    // 1. Cek cache memori dulu, kalau masih fresh langsung balikin tanpa fetch
    if (cacheable && !skipCache) {
        const cached = memoryCache.get(cacheKey);
        if (cached && Date.now() < cached.expiry) {
            return cached.data;
        }
    }

    // 2. Kalau ada request identik yang lagi jalan (misal double-call dari React),
    //    numpang ke promise yang sama daripada nembak API dua kali
    if (cacheable && pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey);
    }

    // Tambahkan opsi cache Next.js HANYA kalau di server
    const fetchOptions = {
        ...restOptions,
        ...(isServer && { next: { revalidate: 3600, ...restOptions.next } })
    };

    const requestPromise = (async () => {
        for (let i = 0; i < retries; i++) {
            try {
                // Global throttle per environment
                const now = Date.now();
                const timeSinceLastRequest = now - lastRequestTime;
                if (timeSinceLastRequest < 400) {
                    await delay(400 - timeSinceLastRequest);
                }
                lastRequestTime = Date.now();

                const response = await fetch(url, fetchOptions);

                if (response.status === 429) {
                    const waitTime = (i + 1) * 1000;
                    console.warn(`Rate limited (429). Retrying in ${waitTime}ms...`);
                    await delay(waitTime);
                    continue;
                }

                if (!response.ok && response.status >= 500) {
                    await delay(1000);
                    continue;
                }

                const data = await response.json();

                // 3. Simpan ke cache kalau berhasil dan bukan response error
                if (cacheable && !data.error) {
                    memoryCache.set(cacheKey, {
                        data,
                        expiry: Date.now() + cacheDuration,
                    });
                }

                return data;
            } catch (error) {
                if (i === retries - 1) return { error: true, message: error.message };
                await delay(1000);
            }
        }

        return { error: true, message: "Max retries reached." };
    })();

    if (cacheable) {
        pendingRequests.set(cacheKey, requestPromise);
        // Setelah selesai (berhasil/gagal), hapus dari daftar "sedang berjalan"
        requestPromise.finally(() => pendingRequests.delete(cacheKey));
    }

    return requestPromise;
};

// Util buat hapus cache secara manual, misalnya tombol "refresh" atau habis update data
export const clearJikanCache = (endpointContains) => {
    if (!endpointContains) {
        memoryCache.clear();
        return;
    }
    for (const key of memoryCache.keys()) {
        if (key.includes(endpointContains)) memoryCache.delete(key);
    }
};
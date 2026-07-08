const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simple global throttle to prevent bursting Jikan API on server-side renders
let lastRequestTime = 0;

export const jikanFetch = async (endpoint, options = {}) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    // Jikan limit is 3 req/sec. We enforce a minimum of 400ms between requests (2.5 req/sec).
    if (timeSinceLastRequest < 400) {
        await delay(400 - timeSinceLastRequest);
    }
    
    lastRequestTime = Date.now();
    
    // Next.js App Router caching: cache results for 1 hour (3600 seconds) by default to avoid hitting Jikan excessively.
    const fetchOptions = {
        next: { revalidate: 3600 },
        ...options
    };
    
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
    const response = await fetch(url, fetchOptions);
    return response.json();
};

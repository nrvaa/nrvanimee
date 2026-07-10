"use client";

import { useEffect, useState, useRef } from "react";
import AnimeList from "@/components/AnimeList";
import { jikanFetch } from "@/lib/api";

const EndlessAnime = () => {
    const [animeList, setAnimeList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);
    const fetchInProgress = useRef(false);

    const fetchAnime = async (pageToFetch) => {
        if (!hasMore || fetchInProgress.current) return;
        
        fetchInProgress.current = true;
        setLoading(true);
        try {
            const data = await jikanFetch(`/top/anime?page=${pageToFetch}`);
            
            if (data.data) {
                // Filter out duplicates that might occur due to list shifting on the server
                setAnimeList((prev) => {
                    const newItems = data.data.filter(
                        (newItem) => !prev.some((existingItem) => existingItem.mal_id === newItem.mal_id)
                    );
                    return [...prev, ...newItems];
                });
                setHasMore(data.pagination?.has_next_page ?? false);
            }
        } catch (error) {
            console.error("Failed to fetch anime:", error);
        }
        setLoading(false);
        fetchInProgress.current = false;
    };

    useEffect(() => {
        if (page > 1) {
            fetchAnime(page);
        }
    }, [page]);

    // Initial fetch
    useEffect(() => {
        fetchAnime(1);
    }, []);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <AnimeList api={{ data: animeList }} />
            
            <div className="w-full mt-12 flex justify-center">
                {loading ? (
                    <div className="px-12 py-6 font-black text-2xl uppercase tracking-widest text-swiss-red animate-pulse border-4 border-black bg-white shadow-[8px_8px_0px_0px_var(--theme-black)]">
                        LOADING DATA...
                    </div>
                ) : hasMore ? (
                    <button 
                        onClick={handleLoadMore}
                        className="px-12 py-6 font-black text-2xl uppercase tracking-widest text-black bg-white border-4 border-black shadow-[8px_8px_0px_0px_var(--theme-black)] hover:bg-swiss-red hover:text-[#fff] hover:border-swiss-red hover:shadow-[8px_8px_0px_0px_var(--theme-black)] transition-all active:translate-y-2 active:shadow-none"
                    >
                        LOAD MORE ANIME
                    </button>
                ) : (
                    <div className="font-black text-xl md:text-3xl uppercase tracking-widest text-black">
                        END OF THE ARCHIVE.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EndlessAnime;

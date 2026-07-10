"use client"

import { useEffect, useState } from "react";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { jikanFetch } from "@/lib/api";

const Page = () => {
    const [topManga, setTopManga] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await jikanFetch("/top/manga?limit=24");
                setTopManga(response);
            } catch (error) {
                console.error("Error fetching top manga:", error);
                setTopManga({ error: true, message: error.message });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center min-h-[50vh] bg-swiss-muted swiss-diagonal border-b-4 border-black">
                <p className="text-2xl font-bold tracking-widest animate-pulse">
                    LOADING...
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1">
            <section className="py-12 md:py-24 px-8 border-b-4 border-black flex-1 bg-swiss-muted swiss-diagonal">
                <div className="container mx-auto">
                    <Header title="TOP MANGA" />
                    <AnimeList api={topManga} type="manga" />
                </div>
            </section>
        </div>
    );
};

export default Page;

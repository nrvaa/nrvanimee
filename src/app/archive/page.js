"use client";

import { useArchive } from "@/providers/ArchiveProvider";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const ArchivePage = () => {
    const { savedAnime, isLoaded } = useArchive();

    if (!isLoaded) {
        return (
            <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal items-center justify-center p-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-black animate-pulse">LOADING ARCHIVE...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal">
            <div className="container mx-auto px-8 py-12 md:py-24">
                <div className="border-4 border-black p-8 md:p-12 bg-white" style={{boxShadow: "24px 24px 0px 0px var(--theme-black)"}}>
                    <Header title="MY ARCHIVE" />
                    
                    {savedAnime.length === 0 ? (
                        <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal mt-8">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">NO ANIME SAVED</h2>
                            <p className="mt-4 font-bold text-swiss-red tracking-widest uppercase">Start exploring and save your favorites!</p>
                        </div>
                    ) : (
                        <AnimeList api={{ data: savedAnime }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArchivePage;

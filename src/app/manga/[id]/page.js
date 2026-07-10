"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import SaveButton from "@/components/SaveButton"

const Page = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jikan.moe/v4';
                const response = await fetch(`${baseUrl}/manga/${id}/full`);
                const manga = await response.json();
                setData(manga.data || null);
            } catch (error) {
                console.error("Error fetching manga details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (data?.title) {
            document.title = `${data.title} | NRVANIMELIST`;
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center min-h-[50vh] bg-swiss-white border-b-4 border-black">
                <p className="text-2xl font-bold tracking-widest animate-pulse">
                    LOADING...
                </p>
            </div>
        );
    }

    if (!data) {
        return (
             <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted m-8">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">NOT FOUND</h2>
             </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 bg-swiss-white swiss-diagonal">
            <div className="container mx-auto px-8 py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white border-4 border-black p-8 md:p-12" style={{boxShadow: "24px 24px 0px 0px var(--theme-black)"}}>
                    {/* Left Column: Image */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="border-4 border-black relative">
                            <div className="relative aspect-[3/4] w-full bg-swiss-muted">
                                <Image 
                                    src={data.images?.webp?.large_image_url || data.images?.webp?.image_url} 
                                    alt={data.title} 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-8 border-t-4 border-black pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red">Score</span>
                                    <span className="block text-2xl font-black">{data.score || "N/A"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red">Rank</span>
                                    <span className="block text-2xl font-black">#{data.rank || "?"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red">Chapters</span>
                                    <span className="block text-2xl font-black">{data.chapters || "?"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red">Volumes</span>
                                    <span className="block text-2xl font-black">{data.volumes || "?"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-start">
                        <div className="inline-block bg-black text-white px-3 py-1 font-bold text-xs uppercase tracking-widest w-fit mb-4">
                            {data.status}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black mb-6">
                            {data.title}
                        </h1>
                        
                        <div className="flex flex-wrap gap-2 mb-12">
                            {data.genres?.map(genre => (
                                <span key={genre.mal_id} className="px-4 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest hover:bg-swiss-red hover:text-white hover:border-swiss-red transition-colors cursor-default">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <SaveButton anime={data} />

                        <div className="border-t-4 border-black pt-8 relative">
                            <h3 className="text-xl font-black uppercase tracking-widest text-swiss-red mb-6">Synopsis</h3>
                            <p className="text-lg md:text-xl font-medium leading-relaxed max-w-4xl text-black">
                                {data.synopsis || "No synopsis available."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const keyword = params?.keyword || "";
  const order_by = searchParams?.get("order_by") || "";
  const sort = searchParams?.get("sort") || "";
  
  const decodedKeyword = decodeURI(keyword);
  const currentFilter = order_by || "default";

  const [searchAnime, setSearchAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;
    document.title = `Search: ${decodedKeyword} | NRVANIMELIST`;
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jikan.moe/v4';
        let url = `${baseUrl}/anime?q=${decodedKeyword}`;
        if (order_by) url += `&order_by=${order_by}`;
        if (sort) url += `&sort=${sort}`;

        const response = await fetch(url);
        const result = await response.json();
        setSearchAnime(result);
      } catch (error) {
        console.error("Error searching anime:", error);
        setSearchAnime({ error: true, message: error.message });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keyword, order_by, sort]);

  return (
    <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal">
      <div className="container mx-auto px-8 py-12 md:py-24">
        <div
          className="border-4 border-black p-8 md:p-12 bg-white"
          style={{ boxShadow: "24px 24px 0px 0px var(--theme-black)" }}
        >
          <Header title={`SEARCH: ${decodedKeyword}`} />

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 mb-8 border-b-4 border-black pb-8">
            <span className="font-black uppercase tracking-widest text-swiss-red flex items-center mr-4">
              SORT BY:
            </span>
            <Link
              href={`/search/${keyword}`}
              className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase tracking-widest transition-colors ${currentFilter === "default" ? "bg-black text-swiss-red" : "bg-white text-black hover:bg-swiss-red hover:text-[#fff] hover:border-swiss-red"}`}
            >
              Relevance
            </Link>
            <Link
              href={`/search/${keyword}?order_by=score&sort=desc`}
              className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase tracking-widest transition-colors ${currentFilter === "score" ? "bg-black text-swiss-red" : "bg-white text-black hover:bg-swiss-red hover:text-[#fff] hover:border-swiss-red"}`}
            >
              Highest Score
            </Link>
            <Link
              href={`/search/${keyword}?order_by=popularity&sort=asc`}
              className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase tracking-widest transition-colors ${currentFilter === "popularity" ? "bg-black  text-swiss-red" : "bg-white text-black hover:bg-swiss-red hover:text-[#fff] hover:border-swiss-red"}`}
            >
              Most Popular
            </Link>
            <Link
              href={`/search/${keyword}?order_by=start_date&sort=desc`}
              className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase tracking-widest transition-colors ${currentFilter === "start_date" ? "bg-black text-swiss-red" : "bg-white text-black hover:bg-swiss-red hover:text-[#fff] hover:border-swiss-red"}`}
            >
              Newest
            </Link>
          </div>

          {isLoading ? (
            <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal w-full">
              <p className="text-2xl font-bold tracking-widest animate-pulse">
                LOADING SEARCH RESULTS...
              </p>
            </div>
          ) : searchAnime?.error || searchAnime?.status >= 400 ? (
            <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
                API ERROR
              </h2>
              <p className="mt-4 font-bold text-swiss-red tracking-widest uppercase">
                {searchAnime?.message || "Failed to fetch from MyAnimeList"}
              </p>
            </div>
          ) : searchAnime?.data && searchAnime.data.length > 0 ? (
            <AnimeList api={searchAnime} />
          ) : (
            <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
                NO RESULTS FOUND
              </h2>
              <p className="mt-4 font-bold text-swiss-red tracking-widest uppercase">
                TRY A DIFFERENT KEYWORD
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

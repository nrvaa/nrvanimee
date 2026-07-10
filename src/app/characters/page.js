"use client";

import { useEffect, useState } from "react";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { jikanFetch } from "@/lib/api";

const Page = () => {
  const [topChar, setTopChar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Top Characters | NRVANIMELIST";
    const fetchData = async () => {
      try {
        const response = await jikanFetch("/top/characters");
        setTopChar(response);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setTopChar({ error: true, message: error.message });
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
    <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal">
      <div className="container mx-auto px-8 py-12 md:py-24">
        <div
          className="border-4 border-black p-8 md:p-12 bg-white"
          style={{ boxShadow: "24px 24px 0px 0px var(--theme-black)" }}
        >
          <Header title="ALL CHARACTERS" />
          <AnimeList api={topChar} type="character" />
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { jikanFetch } from "@/lib/api";
import { useEffect, useState } from "react";

// const Page = async () => {
//   const topAnime = await jikanFetch("/top/anime");

//   return (
//     <div className="flex flex-col flex-1">
//       <section className="py-12 md:py-24 px-8 border-b-4 border-black flex-1 bg-swiss-white">
//         <div className="container mx-auto">
//           <Header title="TOP ANIME" />
//           <AnimeList api={topAnime} />
//         </div>
//       </section>
//     </div>
//   );
// };

const Page = () => {
  const [topAnime, setTopAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jikanFetch("/top/anime");
        setTopAnime(response);
      } catch (error) {
        console.error("Error fetching top anime:", error);
        setTopAnime({ error: true, message: error.message });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-[50vh] bg-swiss-white border-b-4 border-black">
        <p className="text-2xl font-bold tracking-widest animate-pulse">
          LOADING...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">  
      <section className="py-12 md:py-24 px-8 border-b-4 border-black flex-1 bg-swiss-white">
        <div className="container mx-auto">
          <Header title="TOP ANIME" />
          <AnimeList api={topAnime} />
        </div>
      </section>
    </div>
  );
};

export default Page;

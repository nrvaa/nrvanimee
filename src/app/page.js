

"use client";

import { useEffect, useState } from "react";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import EndlessAnime from "@/components/EndlessAnime";
import { jikanFetch } from "@/lib/api";

const Page = () => {
  const [topAnime, setTopAnime] = useState(null);
  const [topManga, setTopManga] = useState(null);
  const [recAnime, setRecAnime] = useState([]);
  
  const [loadingAnime, setLoadingAnime] = useState(true);
  const [loadingManga, setLoadingManga] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    document.title = "NRVANIMELIST | Objective Anime Tracking";
    
    jikanFetch('/top/anime?limit=4')
      .then(res => setTopAnime(res))
      .catch(err => console.error(err))
      .finally(() => setLoadingAnime(false));

    jikanFetch('/top/manga?limit=2')
      .then(res => setTopManga(res))
      .catch(err => console.error(err))
      .finally(() => setLoadingManga(false));

    jikanFetch('/recommendations/anime')
      .then(recs => {
        let list = [];
        let seen = new Set();
        if (recs.data) {
          for (const rec of recs.data) {
            for (const entry of rec.entry) {
              if (!seen.has(entry.mal_id)) {
                seen.add(entry.mal_id);
                list.push(entry);
                if (list.length >= 8) break;
              }
            }
            if (list.length >= 8) break;
          }
        }
        setRecAnime(list);
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingRecs(false));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b-4 border-black bg-swiss-white swiss-grid-pattern py-24 md:py-48 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-swiss-red -skew-x-12 translate-x-16 z-0 opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-black">
              N  EW
              <br />
              R  EALM OF <br />
              <span className="text-swiss-red">V  ISUAL</span>
              <br />
              A  NIME
            </h1>
            <p className="mt-8 text-xl md:text-2xl font-bold max-w-2xl text-black tracking-wide">
              A DECRYPTED ARCHIVE OF JAPANESE ANIMATION.
              <br />
              MADE BY YOURS TRULY.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Anime Section */}
      <section className="py-12 md:py-24 px-8 border-b-4 border-black">
        <div className="container mx-auto">
          <Header
            title="01. TOP ANIME"
            linkTitle="VIEW ALL ANIME"
            linkHref="/popular"
          />
          {loadingAnime ? (
            <div className="py-12 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal">
              <p className="font-bold animate-pulse text-swiss-red tracking-widest uppercase">LOADING TOP ANIME...</p>
            </div>
          ) : (
            <AnimeList api={topAnime} />
          )}
        </div>
      </section>

      {/* Newest Releases Section */}
      <section className="py-12 md:py-24 px-8 bg-swiss-muted swiss-diagonal border-b-4 border-black">
        <div className="container mx-auto">
          <Header
            title="02. TOP MANGA"
            linkTitle="VIEW ALL MANGA"
            linkHref="/topmanga"
          />
          {loadingManga ? (
            <div className="py-12 border-2 border-black p-12 text-center bg-white">
              <p className="font-bold animate-pulse text-swiss-red tracking-widest uppercase">LOADING TOP MANGA...</p>
            </div>
          ) : (
            <AnimeList api={topManga} type="manga" />
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-12 md:py-24 px-8 bg-swiss-white border-b-4 border-black">
        <div className="container mx-auto">
          <Header
            title="03. RECOMMENDATIONS"
          />
          {loadingRecs ? (
            <div className="py-12 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal">
              <p className="font-bold animate-pulse text-swiss-red tracking-widest uppercase">LOADING RECOMMENDATIONS...</p>
            </div>
          ) : (
            <AnimeList api={{ data: recAnime }} />
          )}
        </div>
      </section>

      {/* Endless Scroll Section */}
      <section className="py-12 md:py-24 px-8 bg-swiss-muted swiss-diagonal border-b-4 border-black">
        <div className="container mx-auto">
          <Header
            title="04. ENDLESS DISCOVERY"
          />
          <EndlessAnime />
        </div>
      </section>
    </div>
  );
};

export default Page;
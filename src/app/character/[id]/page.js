"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jikan.moe/v4';
        const response = await fetch(`${baseUrl}/characters/${id}/full`);
        const result = await response.json();
        setData(result.data || null);
      } catch (error) {
        console.error("Error fetching character details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data?.name) {
      document.title = `${data.name} | NRVANIMELIST`;
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
      <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal items-center justify-center p-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
          CHARACTER NOT FOUND
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-swiss-white swiss-diagonal">
      <div className="container mx-auto px-8 py-12 md:py-24">
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 bg-white border-4 border-black p-8 md:p-12"
          style={{ boxShadow: "24px 24px 0px 0px var(--theme-black)" }}
        >
          {/* Left Column: Image & Basic Info */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="border-4 border-black relative">
              <Image
                src={
                  data.images?.webp?.image_url || data.images?.jpg?.image_url
                }
                alt={data.name}
                width={500}
                height={750}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Metadata Grid */}
            <div className="mt-8 border-4 border-black divide-y-4 divide-black bg-swiss-white">
              <div className="p-4 flex flex-col items-center text-center">
                <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red mb-1">
                  Favorites
                </span>
                <span className="block text-2xl font-black">
                  {data.favorites?.toLocaleString() || "0"}
                </span>
              </div>

              {data.name_kanji && (
                <div className="p-4 flex flex-col items-center text-center">
                  <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red mb-1">
                    Kanji
                  </span>
                  <span className="block text-xl font-bold tracking-widest">
                    {data.name_kanji}
                  </span>
                </div>
              )}

              {data.nicknames?.length > 0 && (
                <div className="p-4 flex flex-col items-center text-center">
                  <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red mb-1">
                    Nicknames
                  </span>
                  <span className="block text-sm font-bold tracking-widest">
                    {data.nicknames.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-start">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black mb-6">
              {data.name}
            </h1>

            <div className="border-t-4 border-black pt-8 mt-4">
              <h3 className="text-xl font-black uppercase tracking-widest mb-6 text-swiss-red">
                About
              </h3>
              <p className="text-lg font-medium leading-relaxed max-w-4xl whitespace-pre-wrap">
                {data.about || "No information available."}
              </p>
            </div>

            {/* Voice Actors */}
            {data.voices?.length > 0 && (
              <div className="border-t-4 border-black pt-8 mt-12">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 text-swiss-red">
                  Voice Actors
                </h3>
                <div className="flex flex-wrap gap-4">
                  {data.voices.slice(0, 10).map((voice, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-black p-3 bg-swiss-muted flex items-center gap-4"
                    >
                      {voice.person.images?.jpg?.image_url && (
                        <Image
                          src={voice.person.images.jpg.image_url}
                          alt={voice.person.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-cover rounded-full border-2 border-black"
                        />
                      )}
                      <div>
                        <p className="font-bold text-sm uppercase">
                          {voice.person.name}
                        </p>
                        <p className="text-xs font-bold tracking-widest text-swiss-red opacity-80">
                          {voice.language}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Anime Appearances */}
            {data.anime?.length > 0 && (
              <div className="border-t-4 border-black pt-8 mt-12">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 text-swiss-red">
                  Anime Appearances
                </h3>
                <div className="flex flex-wrap gap-4">
                  {data.anime.slice(0, 12).map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/anime/${item.anime.mal_id}`}
                      className="border-2 border-black p-2 bg-swiss-muted hover:bg-swiss-red hover:text-[#fff] group transition-colors flex items-center gap-4 w-[300px]"
                    >
                      {item.anime.images?.webp?.image_url && (
                        <div className="w-12 h-16 relative flex-shrink-0 border-2 border-black">
                          <Image
                            src={item.anime.images.webp.image_url}
                            alt={item.anime.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="font-bold text-sm uppercase truncate">
                          {item.anime.title}
                        </p>
                        <p className="text-xs font-bold tracking-widest opacity-80">
                          {item.role}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

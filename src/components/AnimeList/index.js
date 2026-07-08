import Image from "next/image" 
import Link from "next/link"

const AnimeList = ({ api, type = "anime" }) => {
    if (api?.error || api?.status >= 400) {
        return (
            <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal w-full col-span-full">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">API ERROR</h2>
                <p className="mt-4 font-bold text-swiss-red tracking-widest uppercase">{api.message || "Too many requests to Jikan API."}</p>
            </div>
        );
    }

    if (!api?.data || api.data.length === 0) {
        return (
            <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted swiss-diagonal w-full col-span-full">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">NO RESULTS FOUND</h2>
                <p className="mt-4 font-bold text-swiss-red tracking-widest uppercase">The list is currently empty.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 w-full">
            {api.data?.map((anime) => {
                return (
                    <Link key={anime.mal_id} href={`/${type}/${anime.mal_id}`} className="group block border-2 border-black bg-white hover:bg-swiss-red transition-colors duration-200 cursor-pointer h-full flex flex-col relative top-0 hover:-translate-y-1">
                        <div className="border-b-2 border-black overflow-hidden relative aspect-[3/4]">
                            <Image 
                                src={anime.images?.webp?.image_url || anime.images?.jpg?.image_url} 
                                alt={anime.title || anime.name} 
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="font-black text-xl uppercase leading-tight mb-4 text-black group-hover:text-white transition-colors duration-200">
                                {anime.title || anime.name}
                            </h3>
                            <div className="mt-auto">
                                <span className="block font-bold text-sm tracking-widest text-black group-hover:text-white transition-colors duration-200 mb-1">
                                    {anime.year || "TBA"}
                                </span>
                                <span className="block text-xs uppercase tracking-widest opacity-70 text-black group-hover:text-white transition-colors duration-200">
                                    {anime.genres?.map((g) => g.name).join(", ")}
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            })}
      </div>
    )
}

export default AnimeList
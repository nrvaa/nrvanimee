import Image from "next/image"
import SaveButton from "@/components/SaveButton"

const Page = async ({ params }) => {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${id}/full`);
    const anime = await response.json();
    const data = anime.data;

    if (!data) {
        return (
             <div className="py-24 border-2 border-black p-12 text-center bg-swiss-muted m-8">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">NOT FOUND</h2>
             </div>
        )
    }

    return (
        <div className="flex flex-col flex-1 bg-swiss-white">
            <div className="container mx-auto px-8 py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Left Column: Image */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="border-4 border-black p-2 bg-swiss-white relative shadow-[16px_16px_0px_0px_rgba(255,48,0,1)] transition-transform hover:-translate-y-2 hover:translate-x-2 hover:shadow-[0px_0px_0px_0px_rgba(255,48,0,1)] duration-200">
                            <div className="relative aspect-[3/4] w-full border-2 border-black">
                                <Image 
                                    src={data.images?.webp?.large_image_url || data.images?.webp?.image_url} 
                                    alt={data.title} 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-12 border-t-4 border-black pt-4">
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
                                    <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red">Episodes</span>
                                    <span className="block text-2xl font-black">{data.episodes || "?"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest text-swiss-red">Status</span>
                                    <span className="block text-lg font-bold uppercase">{data.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-start">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black mb-6">
                            {data.title}
                        </h1>
                        <h2 className="text-2xl font-bold text-gray-500 mb-8 tracking-tight">{data.title_japanese}</h2>

                        <div className="flex flex-wrap gap-2 mb-12">
                            {data.genres?.map(genre => (
                                <span key={genre.mal_id} className="px-4 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest hover:bg-swiss-red hover:text-white hover:border-swiss-red transition-colors">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* <SaveButton anime={data} /> */}

                        <div className="border-t-4 border-black pt-8 relative mt-8">
                            <div className="absolute top-0 right-0 w-32 h-32 swiss-dots opacity-20 -mt-16 pointer-events-none"></div>
                            <h3 className="text-xl font-black uppercase tracking-widest text-swiss-red mb-6">Synopsis</h3>
                            <p className="text-lg md:text-xl font-medium leading-relaxed max-w-4xl text-black">
                                {data.synopsis || "No synopsis available."}
                            </p>
                        </div>
                        
                        {data.trailer?.youtube_id && (
                            <div className="mt-12 border-t-4 border-black pt-8">
                                <h3 className="text-xl font-black uppercase tracking-widest text-swiss-red mb-6">Trailer</h3>
                                <div className="aspect-video w-full max-w-4xl border-4 border-black relative">
                                    <iframe 
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${data.trailer.youtube_id}`}
                                        title="Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page

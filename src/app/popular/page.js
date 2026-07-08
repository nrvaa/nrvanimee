import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { jikanFetch } from "@/lib/api";

const Page = async () => {
    const topAnime = await jikanFetch("/top/anime");

    return (
        <div className="flex flex-col flex-1">
            <section className="py-12 md:py-24 px-8 border-b-4 border-black flex-1 bg-swiss-white">
                <div className="container mx-auto">
                    <Header title="POPULAR ANIME" />
                    <AnimeList api={topAnime} />
                </div>
            </section>
        </div>
    )
}

export default Page

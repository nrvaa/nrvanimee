import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { jikanFetch } from "@/lib/api";

export const metadata = {
    title: "Top Characters | NRVANIMELIST",
    description: "The most popular characters in Japanese animation.",
};

const Page = async () => {
    const topChar = await jikanFetch('/top/characters');

    return (
        <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal">
            <div className="container mx-auto px-8 py-12 md:py-24">
                <div className="border-4 border-black p-8 md:p-12 bg-white" style={{boxShadow: "24px 24px 0px 0px var(--theme-black)"}}>
                    <Header title="ALL CHARACTERS" />
                    <AnimeList api={topChar} type="character" />
                </div>
            </div>
        </div>
    );
};

export default Page;

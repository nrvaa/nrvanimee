import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

export const metadata = {
    title: "Seasonal Anime | NRVANIMELIST",
    description: "Currently airing seasonal anime.",
};

const Page = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seasons/now`);
    const seasonalAnime = await response.json();

    return (
        <div className="flex flex-col flex-1 bg-swiss-muted swiss-diagonal">
            <div className="container mx-auto px-8 py-12 md:py-24">
                <div className="border-4 border-black p-8 md:p-12 bg-white" style={{boxShadow: "24px 24px 0px 0px var(--theme-black)"}}>
                    <Header title="CURRENT SEASON" />
                    <AnimeList api={seasonalAnime} />
                </div>
            </div>
        </div>
    );
};

export default Page;

import Link from "next/link";
import InputSearch from "./InputSearch";

const Navbar = () => {
    return (
        <header className="bg-white border-b-4 border-black">
            <div className="container mx-auto flex items-center justify-between md:flex-row flex-col px-8 py-6 gap-6">
                <Link 
                  href="/" 
                  className="font-black md:text-xl text-sm tracking-[0.15em] uppercase text-black hover:text-swiss-red transition-colors duration-200"
                >
                  NRVANIME LIST
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/popular" className="font-bold text-sm uppercase tracking-widest hover:text-swiss-red transition-colors hidden md:block">Top Anime</Link>
                    <Link href="/topmanga" className="font-bold text-sm uppercase tracking-widest hover:text-swiss-red transition-colors hidden md:block">Top Manga</Link>
                    <Link href="/seasonal" className="font-bold text-sm uppercase tracking-widest hover:text-swiss-red transition-colors hidden lg:block">Seasonal</Link>
                    <Link href="/archive" className="font-bold text-sm uppercase tracking-widest text-swiss-red hover:text-black transition-colors hidden md:block">Archive</Link>
                    <InputSearch />
                </div>
            </div>
        </header>
    )
}

export default Navbar
import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-black text-white py-12 md:py-24 border-t-8 border-swiss-red mt-auto">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                NRVA
                <br />
                <span className="text-swiss-red">ANIMELIST</span>
              </h2>
              <p className="font-bold tracking-widest uppercase text-sm opacity-80 max-w-sm">
                A DECRYPTED ARCHIVE OF JAPANESE ANIMATION. PURE SIGNAL, NO
                CLUTTER.
              </p>
            </div>

            <div className="flex flex-col gap-2 font-bold text-sm uppercase tracking-widest text-right">
              <Link href="/" className="hover:text-swiss-red transition-colors">
                Home
              </Link>
              <Link
                href="/popular"
                className="hover:text-swiss-red transition-colors"
              >
                Top Anime
              </Link>
              <Link
                href="/topmanga"
                className="hover:text-swiss-red transition-colors"
              >
                Top Manga
              </Link>
              <Link
                href="/characters"
                className="hover:text-swiss-red transition-colors"
              >
                Characters
              </Link>
              <Link
                href="/seasonal"
                className="hover:text-swiss-red transition-colors"
              >
                Seasonal
              </Link>
            </div>
          </div>

          <div className="border-t-2 border-[#333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60">
            <p>
              &copy; {new Date().getFullYear()} NRVA MUSIC. ALL RIGHTS RESERVED.
            </p>
            <p>
              DESIGNED WITH{" "}
              <span className="text-swiss-red">
                <a href="https://nrvamusic.com" target="_blank" className="hover:text-swiss-red transition-colors">&lt;3</a>
              </span>
              .
            </p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

import Link from "next/link";

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-4 mb-8 swiss-dots pt-8">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 bg-swiss-red" />
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
          {title}
        </h2>
      </div>
      {linkHref && linkTitle ? (
        <Link 
          href={linkHref} 
          className="mt-4 md:mt-0 px-6 py-2 border-2 border-black bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-swiss-red hover:text-white transition-colors duration-200 inline-block"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;

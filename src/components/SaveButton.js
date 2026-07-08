"use client";

import { useArchive } from "@/providers/ArchiveProvider";

const SaveButton = ({ anime }) => {
    const { toggleSave, isSaved, isLoaded } = useArchive();

    if (!isLoaded) return null;

    const saved = isSaved(anime.mal_id);

    return (
        <button 
            onClick={() => toggleSave(anime)}
            className={`px-8 py-4 font-black text-xl uppercase tracking-widest transition-colors duration-200 border-4 border-black mt-6 block w-full text-center ${saved ? 'bg-swiss-red text-[#fff] hover:bg-black hover:text-[#fff]' : 'bg-white text-black hover:bg-black hover:text-[#fff]'}`}
        >
            {saved ? "REMOVE FROM ARCHIVE" : "SAVE TO ARCHIVE"}
        </button>
    );
};

export default SaveButton;

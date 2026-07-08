"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
    const [savedAnime, setSavedAnime] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        const stored = localStorage.getItem("nrva_archive");
        if (stored) {
            try {
                setSavedAnime(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse archive");
            }
        }
        setIsLoaded(true);
    }, []);

    const toggleSave = (animeData) => {
        setSavedAnime((prev) => {
            const isSaved = prev.some((item) => item.mal_id === animeData.mal_id);
            let newList;
            if (isSaved) {
                newList = prev.filter((item) => item.mal_id !== animeData.mal_id);
            } else {
                newList = [...prev, animeData];
            }
            localStorage.setItem("nrva_archive", JSON.stringify(newList));
            return newList;
        });
    };

    const isSaved = (id) => {
        return savedAnime.some((item) => item.mal_id === id);
    };

    return (
        <ArchiveContext.Provider value={{ savedAnime, toggleSave, isSaved, isLoaded }}>
            {children}
        </ArchiveContext.Provider>
    );
};

export const useArchive = () => useContext(ArchiveContext);

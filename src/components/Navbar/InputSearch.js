"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useRef } from "react"
import { useRouter } from "next/navigation"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()
    
    const handleSearch = (event) => {
        event.preventDefault()
        const keyword = searchRef.current?.value
        if (keyword) {
            router.push(`/search/${keyword}`)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch(e)
    }

    return (
        <div className="relative flex items-center group">
            <input 
                placeholder="SEARCH ANIME..." 
                className="bg-white text-black placeholder:text-gray-500 border-2 border-black focus:outline-none focus:border-swiss-red px-4 py-3 rounded-none w-64 md:w-80 font-bold uppercase tracking-wider transition-colors duration-200"
                ref={searchRef}
                onKeyDown={handleKeyDown}
            />
            <button 
                className="absolute right-0 top-0 bottom-0 px-4 bg-black text-white hover:bg-swiss-red hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center" 
                onClick={handleSearch}
                aria-label="Search"
            >
                <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
        </div>
    )
}

export default InputSearch
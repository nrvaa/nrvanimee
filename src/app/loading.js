const Loading = () => {
    return (
        <div className="flex flex-col flex-1 bg-swiss-white swiss-diagonal items-center justify-center min-h-[50vh] p-12">
            <div className="border-4 border-black p-12 bg-white animate-pulse" style={{boxShadow: "24px 24px 0px 0px var(--theme-black)"}}>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black flex flex-col items-center gap-4">
                    <span className="w-16 h-16 bg-swiss-red border-4 border-black inline-block animate-spin"></span>
                    FETCHING DATA...
                </h1>
            </div>
        </div>
    );
};

export default Loading;

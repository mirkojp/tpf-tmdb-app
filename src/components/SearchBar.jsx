import React, { useEffect, useState, useRef } from "react";
import fetchGenres from "./fetchGenres"; 

const SearchBar = ({ setSearchQuery, setSelectedGenres }) => {
    const [genres, setGenres] = useState([]);
    const [isGenreListVisible, setIsGenreListVisible] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const genreDropdownRef = useRef(null);

    useEffect(() => {
        const getGenres = async () => {
            const genresData = await fetchGenres();
            setGenres(genresData);
        };

        getGenres();
    }, []);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target)) {
                setIsGenreListVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.search.value.trim();
        setSearchQuery(searchQuery);
        setSelectedGenres(selectedGenreIds); 
    };

    //Maneja añadir y quitar generos
    const handleGenreChange = (genreId) => {
        setSelectedGenreIds((prevSelectedGenres) => {
            if (prevSelectedGenres.includes(genreId)) {
                return prevSelectedGenres.filter((id) => id !== genreId);
            } else {
                return [...prevSelectedGenres, genreId];
            }
        });
    };

    //Visibilidad de lista de generos
    const handleToggleGenreList = () => {
        setIsGenreListVisible((prevState) => !prevState);
    };

    return (
        <div className="bg-[#0d253f] p-4 flex flex-col sm:flex-row justify-center items-center">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                    type="text"
                    name="search"
                    placeholder="Busqueda..."
                    className="p-2 rounded-md text-black"
                />
                <div className="relative" ref={genreDropdownRef}>
                    <button
                        type="button"
                        onClick={handleToggleGenreList}
                        className="bg-[#90cea1] text-black px-4 py-2 rounded-md font-bold hover:bg-[#01b4e4]"
                    >
                        Generos
                    </button>
                    {isGenreListVisible && (
                        <div
                            className="absolute top-full mt-2 bg-white p-2 rounded-md shadow-lg max-h-48 overflow-y-auto"
                            style={{ width: "200px" }} // Adjust width as necessary
                        >
                            {genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    type="button"
                                    onClick={() => handleGenreChange(genre.id)}
                                    className={`block text-black px-4 py-2 rounded-md mb-2 ${selectedGenreIds.includes(genre.id) ? "bg-[#01b4e4]" : ""}`}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-[#90cea1] text-black px-4 py-2 rounded-md font-bold hover:bg-[#01b4e4]"
                >
                    Buscar
                </button>
            </form>
        </div>
    );
};

export default SearchBar;

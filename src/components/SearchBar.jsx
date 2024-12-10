import React, { useEffect, useState, useRef } from "react";
import fetchGenres from "./FetchGenres";

const SearchBar = ({ setSearchQuery, setSelectedGenres }) => {
    const [genres, setGenres] = useState([]);
    const [isGenreListVisible, setIsGenreListVisible] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState(""); // Estado del input de texto
    const [isGenreSelectDisabled, setIsGenreSelectDisabled] = useState(false); // Estado de deshabilitación de géneros
    const [isTextInputDisabled, setIsTextInputDisabled] = useState(false); // Estado de deshabilitación del texto
    const genreDropdownRef = useRef(null);

    useEffect(() => {
        const getGenres = async () => {
            const genresData = await fetchGenres();
            setGenres(genresData);
        };

        getGenres();
    }, []);

    // Maneja la lógica de deshabilitar campos
    useEffect(() => {
        if (searchInputValue.trim() !== "") {
            setIsGenreSelectDisabled(true);
        } else {
            setIsGenreSelectDisabled(false);
        }

        if (selectedGenreIds.length > 0) {
            setIsTextInputDisabled(true);
        } else {
            setIsTextInputDisabled(false);
        }
    }, [searchInputValue, selectedGenreIds]);

    // Cierra la lista de géneros al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                genreDropdownRef.current &&
                !genreDropdownRef.current.contains(event.target)
            ) {
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
        setSearchQuery(searchInputValue.trim());
        setSelectedGenres([...selectedGenreIds]);
    };

    const handleInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenreIds((prevSelectedGenres) => {
            if (prevSelectedGenres.includes(genreId)) {
                return prevSelectedGenres.filter((id) => id !== genreId);
            } else {
                return [...prevSelectedGenres, genreId];
            }
        });
    };

    const handleToggleGenreList = () => {
        setIsGenreListVisible((prevState) => !prevState);
    };

    return (
        <div className="bg-[#0d253f] p-4 flex flex-col sm:flex-row justify-center items-center">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                    type="text"
                    name="search"
                    placeholder="Búsqueda..."
                    className="p-2 rounded-md text-black"
                    value={searchInputValue}
                    onChange={handleInputChange}
                    disabled={isTextInputDisabled} // Deshabilitar si hay géneros seleccionados
                />
                <div className="relative" ref={genreDropdownRef}>
                    <button
                        type="button"
                        onClick={handleToggleGenreList}
                        className={`bg-[#90cea1] text-black px-4 py-2 rounded-md font-bold hover:bg-[#01b4e4] ${isGenreSelectDisabled ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isGenreSelectDisabled} // Deshabilitar si hay texto en el input
                    >
                        Géneros
                    </button>
                    {isGenreListVisible && !isGenreSelectDisabled && (
                        <div
                            className="absolute top-full mt-2 bg-white p-2 rounded-md shadow-lg max-h-48 overflow-y-auto"
                            style={{ width: "200px" }}
                        >
                            {genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    type="button"
                                    onClick={() => handleGenreChange(genre.id)}
                                    className={`block text-black px-4 py-2 rounded-md mb-2 ${selectedGenreIds.includes(genre.id) ? "bg-[#01b4e4]" : ""
                                        }`}
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

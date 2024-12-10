import React, { useState, useRef, useEffect } from "react";
import fetchGenres from "./FetchGenres";

const SearchBar = ({ setSearchQuery, setSelectedGenres }) => {
    const [genres, setGenres] = useState([]);
    const [isGenreListVisible, setIsGenreListVisible] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]); // Estado del input de generos
    const [searchInputValue, setSearchInputValue] = useState(""); // Estado del input de texto
    const genreDropdownRef = useRef(null);

    // Obtener los géneros
    useEffect(() => {
        const getGenres = async () => {
            const genresData = await fetchGenres();
            setGenres(genresData);
        };
        getGenres();
    }, []);

    // Maneja el cambio de visibilidad de la lista de géneros
    const handleToggleGenreList = () => {
        if (!isGenreListVisible) {
            // Si la lista se va a abrir, agregar el event listener
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Si la lista se va a cerrar, quitar el event listener
            document.removeEventListener("mousedown", handleClickOutside);
        }
        setIsGenreListVisible((prevState) => !prevState);
    };

    // Detecta clics fuera del dropdown
    const handleClickOutside = (event) => {
        if (
            genreDropdownRef.current &&
            !genreDropdownRef.current.contains(event.target)
        ) {
            setIsGenreListVisible(false);
            document.removeEventListener("mousedown", handleClickOutside); // Limpia el event listener
        }
    };

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

    const isTextInputDisabled = selectedGenreIds.length > 0; // Deshabilitar input si hay géneros seleccionados
    const isGenreSelectDisabled = searchInputValue.trim() !== ""; // Deshabilitar selección de géneros si hay texto en el input

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

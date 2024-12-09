import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FetchFilms = ({ searchQuery, selectedGenres }) => {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = process.env.TMDB_APP_BASE_URL;
    const navigate = useNavigate();

    //Cambio de Generos o SearchQuery, regresan a pag 1
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedGenres]);


    useEffect(() => {
        const getFilms = async () => {
            try {
                const genreString = selectedGenres.join(",");
                const endpoint = searchQuery
                    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${searchQuery}&page=${currentPage}&with_genres=${genreString}`
                    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=${currentPage}&with_genres=${genreString}`;

                const response = await axios.get(endpoint);
                setFilms(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error al obtener las películas:", error);
            }
        };

        getFilms();
    }, [currentPage, searchQuery, selectedGenres]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilmClick = (filmId) => {
        navigate(`/film/${filmId}`);
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mt-4">
                {films.map((film) => (
                    <div
                        key={film.id}
                        className="border border-[#0d253f] bg-[#90cea1] rounded-lg p-4 cursor-pointer"
                        onClick={() => handleFilmClick(film.id)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                            alt={film.title}
                            className="w-full rounded-md"
                        />
                        <h3 className="text-lg">{film.title}</h3>
                        <p>Calificación: {film.vote_average}/10</p>
                    </div>
                ))}
            </div>

            <div className="mt-5 flex justify-center items-center">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-6 py-3 rounded-lg font-semibold text-black bg-[#90cea1] disabled:bg-[#A0A9B8] transition-colors duration-300"
                >
                    &#8592; Anterior
                </button>

                <span className="text-lg mx-4 font-semibold text-[#0d253f]">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 rounded-lg font-semibold text-black bg-[#90cea1] disabled:bg-[#A0A9B8] transition-colors duration-300"
                >
                    Siguiente &#8594;
                </button>
            </div>
        </div>
    );
};

export default FetchFilms;

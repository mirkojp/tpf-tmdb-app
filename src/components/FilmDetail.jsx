import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header.jsx"; // Importando Header prediseñado
import Footer from "./Footer.jsx"; // Importando Footer prediseñado

const FilmDetail = () => {
    const { id } = useParams(); // Obtener el ID de la película desde la URL
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = process.env.TMDB_APP_BASE_URL;


    useEffect(() => {
        const fetchFilmDetail = async () => {
            try {
                if (!id) {
                    setError("ID de película no encontrado");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`
                );
                setFilm(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los detalles de la película:", error);
                setError("Error al obtener los detalles de la película");
                setLoading(false);
            }
        };

        fetchFilmDetail();
    }, [id]);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div>
            <Header /> {/* Mostrar el Header prediseñado */}

            <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8 bg-gray-100 rounded-lg shadow-lg">
                <div className="w-full md:w-1/3">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={film.title}
                        className="w-full rounded-lg"
                    />
                </div>
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{film.title}</h1>
                    <p className="text-lg text-gray-600 mb-4">Fecha de estreno: {film.release_date}</p>
                    <p className="text-xl font-semibold text-orange-500 mb-4">Calificación: {film.vote_average}/10</p>
                    <p className="text-lg text-gray-800">{film.overview}</p>

                    {/* Enlace para ir a la página del tráiler */}
                    <div className="mt-4 flex space-x-4">
                        <Link
                            to={`/film/${id}/trailer`}
                            className=" inline-block px-6 py-3 rounded-lg font-semibold text-black bg-[#90cea1] hover:bg-[#01b4e4] disabled:bg-[#A0A9B8] transition-colors duration-300" 
                        >
                            Ver Tráiler
                        </Link>

                        {/* Botón Volver al inicio */}
                        <Link
                            to="/"
                            className=" inline-block px-6 py-3 rounded-lg font-semibold text-black bg-[#90cea1] hover:bg-[#01b4e4] disabled:bg-[#A0A9B8] transition-colors duration-300"
                        >
                            Volver al inicio
                        </Link>
                    </div>
            
                </div>
            </div>

            <Footer /> {/* Mostrar el Footer prediseñado */}
        </div>

    );
};

export default FilmDetail;

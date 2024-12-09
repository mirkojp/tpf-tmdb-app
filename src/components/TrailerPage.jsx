import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header.jsx"; // Importando Header prediseñado
import Footer from "./Footer.jsx"; // Importando Footer prediseñado

const TrailerPage = () => {
    const { id } = useParams(); 
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = process.env.VITE_TMDB_API_KEY;
    const BASE_URL = process.env.VITE_TMDB_APP_BASE_URL;
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
                );

                if (response.data.results) {
                    const trailer = response.data.results.find(
                        (video) => video.type === "Trailer" && video.site === "YouTube"
                    );
                    if (trailer) {
                        setTrailerKey(trailer.key);
                    } else {
                        setError("Tráiler no disponible");
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener el tráiler:", error);
                setError("Error al obtener el tráiler");
                setLoading(false);
            }
        };

        fetchTrailer();
    }, [id]);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div>
            <Header /> 

            <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-lg">
                {trailerKey ? (
                    <div className="w-full max-w-5xl aspect-video">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Tráiler de la película"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                    </div>
                ) : (
                    <p className="text-gray-600">Tráiler no disponible</p>
                )}
                <div className="mt-4 flex justify-center space-x-4">
                    <Link
                        to="/"
                        className="px-6 py-3 rounded-lg font-semibold text-black bg-[#90cea1] hover:bg-[#01b4e4] transition-colors duration-300"
                    >
                        Volver al inicio
                    </Link>
                    <Link
                        to={`/film/${id}`}
                        className="px-6 py-3 rounded-lg font-semibold text-black bg-[#90cea1] hover:bg-[#01b4e4] transition-colors duration-300"
                    >
                        Volver a la película
                    </Link>
                </div>


            </div>

            <Footer /> 
        </div>
    );
};

export default TrailerPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header"; // Importando Header prediseñado
import Footer from "./Footer"; // Importando Footer prediseñado

const TrailerPage = () => {
    const { id } = useParams();
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = "113e41e17e0b6bd1dcc6191a324046d5";
    const BASE_URL = "https://api.themoviedb.org/3";

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

    return (
        <div className="flex flex-col min-h-screen"> {/* Aplicamos flexbox y mínimo tamaño de pantalla */}
            <Header /> {/* Header siempre visible */}

            <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-lg flex-grow">
                {/* Mostrar tráiler si está disponible, sino mensaje de error */}
                {loading ? (
                    <p className="text-center">Cargando...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : trailerKey ? (
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

                {/* Botones siempre visibles */}
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

            <Footer /> {/* Footer siempre visible */}
        </div>
    );
};

export default TrailerPage;

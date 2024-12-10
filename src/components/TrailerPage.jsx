import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header"; // Importando Header prediseñado
import Footer from "./Footer"; // Importando Footer prediseñado

const TrailerPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]); // Estado para múltiples tráileres
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = "113e41e17e0b6bd1dcc6191a324046d5";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
                );

                if (response.data.results) {
                    const availableTrailers = response.data.results.filter(
                        (video) => video.type === "Trailer" && video.site === "YouTube"
                    );
                    if (availableTrailers.length > 0) {
                        setTrailers(availableTrailers); // Guardar múltiples tráileres
                    } else {
                        setError("No hay tráileres disponibles");
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los tráileres:", error);
                setError("Error al obtener los tráileres");
                setLoading(false);
            }
        };

        fetchTrailers();
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-lg flex-grow">
                {loading ? (
                    <p className="text-center">Cargando...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : trailers.length > 0 ? (
                    <div className="flex flex-col space-y-6 w-full max-w-screen-lg">
                        {trailers.map((trailer) => (
                            <div key={trailer.id} className="w-full aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={`Tráiler de la película - ${trailer.name}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                ></iframe>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Tráileres no disponibles</p>
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

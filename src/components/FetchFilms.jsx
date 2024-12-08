
import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchFilms = ({ searchQuery, selectedGenres }) => {
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const API_KEY = "113e41e17e0b6bd1dcc6191a324046d5";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const getFilms = async () => {
            try {
                // Build query with genres
                const genreString = selectedGenres.join(",");
                const endpoint = searchQuery
                    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${currentPage}&with_genres=${genreString}`
                    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${currentPage}&with_genres=${genreString}`;

                const response = await axios.get(endpoint);
                setFilms(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching films:", error);
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

    return (
        <div>
            <h1>{searchQuery ? `Results for "${searchQuery}"` : "Popular Films"}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {films.map((film) => (
                    <div
                        key={film.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            width: "200px",
                        }}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                            alt={film.title}
                            style={{ width: "100%", borderRadius: "4px" }}
                        />
                        <h3 style={{ fontSize: "16px" }}>{film.title}</h3>
                        <p>Rating: {film.vote_average}/10</p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    style={{
                        marginRight: "10px",
                        visibility: currentPage === 1 ? "hidden" : "visible",
                    }}
                >
                    &#8592; Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{
                        marginLeft: "10px",
                        visibility: currentPage === totalPages ? "hidden" : "visible",
                    }}
                >
                    &#8594; Next
                </button>
            </div>
        </div>
    );
};

export default FetchFilms;


import React, { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import FetchFilms from "./FetchFilms.jsx";
import SearchBar from "./SearchBar.jsx";
import { useNavigate } from "react-router-dom"; // For navigation

const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    const navigate = useNavigate(); 

    // Function to navigate to film detail page
    const navigateToFilmDetail = (id) => {
        navigate(`/film/${id}`);
    };
    return (
        <div className="flex flex-col min-h-screen"> {/* Aplicamos flexbox y mínimo tamaño de pantalla */}
            <Header />
            <SearchBar
                setSearchQuery={setSearchQuery}
                setSelectedGenres={setSelectedGenres}
            />
            <FetchFilms
                searchQuery={searchQuery}
                selectedGenres={selectedGenres}
                onFilmClick={navigateToFilmDetail}
            />
            <Footer />
        </div>
    );
};

export default Main;

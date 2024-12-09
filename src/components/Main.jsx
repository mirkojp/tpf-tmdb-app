// import React, { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import FetchFilms from "./FetchFilms";
// import SearchBar from "./SearchBar";

// const Main = () => {
//     const [searchQuery, setSearchQuery] = useState("");

//     return (
//         <div>
//             <Header />
//             <SearchBar setSearchQuery={setSearchQuery} />
//             <FetchFilms searchQuery={searchQuery} />
//             <Footer />
//         </div>
//     );
// };

// export default Main;
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FetchFilms from "./FetchFilms";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom"; // For navigation

const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    const navigate = useNavigate(); // Hook for navigation

    // Function to navigate to film detail page
    const navigateToFilmDetail = (id) => {
        navigate(`/film/${id}`);
    };

    return (
        <div>
            <Header />
            <SearchBar
                setSearchQuery={setSearchQuery}
                setSelectedGenres={setSelectedGenres}
            />
            <FetchFilms
                searchQuery={searchQuery}
                selectedGenres={selectedGenres}
                onFilmClick={navigateToFilmDetail} // Pass the navigation function to FetchFilms
            />
            <Footer />
        </div>
    );
};

export default Main;

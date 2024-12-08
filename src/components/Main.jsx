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

const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
        <div>
            <Header />
            <SearchBar
                setSearchQuery={setSearchQuery}
                setSelectedGenres={setSelectedGenres}
            />
            <FetchFilms searchQuery={searchQuery} selectedGenres={selectedGenres} />
            <Footer />
        </div>
    );
};

export default Main;

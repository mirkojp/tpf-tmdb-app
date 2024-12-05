import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FetchFilms from "./FetchFilms";

const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <Header setSearchQuery={setSearchQuery} />
            <FetchFilms searchQuery={searchQuery} />
            <Footer />
        </div>
    );
};

export default Main;
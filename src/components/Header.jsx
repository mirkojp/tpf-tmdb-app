import React from "react";

const Header = () => {
    return (
        <header className="bg-black p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="cursor-pointer">
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="Logo"
                    className="h-12 sm:h-10 md:h-8"
                />
            </div>
        </header>
    );
};

export default Header;

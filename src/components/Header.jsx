import React from "react";
import { Link } from "react-router-dom"; // Importar Link para la navegación

const Header = () => {
    return (
        <header className="bg-[#0d253f] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="cursor-pointer">
                <Link to="/"> {/* Envolvemos el logo en un Link para redirigir al inicio */}
                    <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt="Logo"
                        className="h-12 sm:h-10 md:h-8"
                    />
                </Link>
            </div>
        </header>
    );
};

export default Header;

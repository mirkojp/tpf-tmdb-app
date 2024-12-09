import React from "react";
import githubLogo from "../assets/github-mark-white.png";

const Footer = () => {
    return (
        <footer className="bg-[#0d253f] p-2 flex justify-center items-center sm:p-4 md:p-6">
            <a href="https://github.com/mirkojp" target="_blank" rel="noopener noreferrer">
                <img
                    src={githubLogo}
                    alt="GitHub Logo"
                    className="h-10 w-10 sm:h-12 sm:w-12"
                />
            </a>
        </footer>
    );
};

export default Footer;
// import React from "react";

// const Header = () => {
//     const handleLogoClick = () => {
//         alert("Logo clicked! Navigating to homepage...");
//         // Replace this with navigation logic, e.g., window.location.href = '/';
//     };

//     const handleSearch = (event) => {
//         event.preventDefault();
//         const searchQuery = event.target.search.value;
//         alert(`Searching for: ${searchQuery}`);
//         // Replace this with your search logic
//     };

//     return (
//         <header className="bg-black p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
//             {/* Logo Section */}
//             <div onClick={handleLogoClick} className="cursor-pointer">
//                 <img
//                     src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
//                     alt="Logo"
//                     className="h-12 sm:h-10 md:h-8"
//                 />
//             </div>

//             {/* Search Bar Section */}
//             <form onSubmit={handleSearch} className="flex items-center space-x-2">
//                 <input
//                     type="text"
//                     name="search"
//                     placeholder="Search..."
//                     className="p-2 rounded-md text-black"
//                 />
//                 <button
//                     type="submit"
//                     className="bg-white text-blue-500 px-4 py-2 rounded-md font-bold hover:bg-gray-200"
//                 >
//                     Search
//                 </button>
//             </form>
//         </header>
//     );
// };

// export default Header;

import React from "react";

const Header = ({ setSearchQuery }) => {
    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.search.value;
        setSearchQuery(searchQuery); // Update the search query in the Main component
    };

    return (
        <header className="bg-black p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="cursor-pointer">
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="Logo"
                    className="h-12 sm:h-10 md:h-8"
                />
            </div>

            <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="p-2 rounded-md text-black"
                />
                <button
                    type="submit"
                    className="bg-white text-blue-500 px-4 py-2 rounded-md font-bold hover:bg-gray-200"
                >
                    Search
                </button>
            </form>
        </header>
    );
};

export default Header;

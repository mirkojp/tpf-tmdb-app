import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_APP_BASE_URL;

const fetchGenres = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
        );
        return response.data.genres || [];
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }

};

export default fetchGenres;
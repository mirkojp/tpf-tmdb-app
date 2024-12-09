import axios from "axios";

const API_KEY = "113e41e17e0b6bd1dcc6191a324046d5"
const BASE_URL = "https://api.themoviedb.org/3"
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
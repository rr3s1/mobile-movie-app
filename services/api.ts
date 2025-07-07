// Define and export a configuration object for the TMDB API
export const TMDB_CONFIG = {
    // The base URL for all TMDB API v3 requests
    BASE_URL: "https://api.themoviedb.org/3",
    // The API key retrieved from environment variables for authentication
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    // Standard headers required for all API requests
    headers: {
        accept: "application/json",
        // The Authorization header includes the API key as a Bearer token
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
};

// Define and export an asynchronous function to fetch movies
export const fetchMovies = async ({query}: { query: string }) => {
    // Determine the API endpoint based on whether a search query is provided
    const endpoint = query
        // If a query exists, construct a URL for the search endpoint
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        // Otherwise, construct a URL to discover the most popular movies
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    // Make the API request using the determined endpoint and configured headers
    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    // Check if the response was successful; if not, throw an error
    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
    // Return the array of movie results
    return data.results;
};
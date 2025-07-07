// Import necessary hooks from React
import { useState, useEffect } from "react";

// Define the custom hook 'useFetch' using a generic type 'T' for flexible data handling
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    // State to store the fetched data, typed as 'T' or null
    const [data, setData] = useState<T | null>(null);
    // State to manage the loading status of the API call
    const [loading, setLoading] = useState(false);
    // State to store any error that occurs during fetching
    const [error, setError] = useState<Error | null>(null);

    // Asynchronous function to perform the data fetching
    const fetchData = async () => {
        try {
            // Set loading to true before the request starts
            setLoading(true);
            // Clear any previous errors
            setError(null);

            // Await the result from the provided fetchFunction
            const result = await fetchFunction();
            // Set the fetched data to state
            setData(result);
        } catch (err) {
            // If an error occurs, set the error state
            setError(
                err instanceof Error ? err : new Error("An unknown error occurred")
            );
        } finally {
            // Set loading to false after the request is complete (whether success or failure)
            setLoading(false);
        }
    };

    // Function to reset all states to their initial values
    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    // useEffect hook to automatically fetch data on component mount if 'autoFetch' is true
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []); // The empty dependency array ensures this runs only once on mount

    // Return the state and control functions to the component using the hook
    return { data, loading, error, refetch: fetchData, reset };
};

// Export the custom hook as the default export
export default useFetch;
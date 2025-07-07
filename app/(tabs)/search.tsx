import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/interfaces/movie";

const Search = () => {
    // State to hold the user's search query
    const [searchQuery, setSearchQuery] = useState("");
    // Custom hook to fetch movies, with auto-fetching disabled
    const {
        data: movies,
        loading,
        error,
    } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    return (
        // Main container with a primary background color
        <View className="flex-1 bg-primary">
            {/* Background image for the screen */}
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />

            {/* FlatList to display search results in a scrollable grid */}
            <FlatList
                className="px-5"
                data={movies as Movie[]}
                keyExtractor={(item) => item.id.toString()}
                // Render a MovieCard for each item in the data array
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                // Style for the rows in the grid
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                // Component to render at the top of the list
                ListHeaderComponent={
                    <>
                        {/* Application logo */}
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        {/* Search bar component */}
                        <View className="my-5">
                            <SearchBar placeholder="Search for a movie" />
                        </View>

                        {/* Display a loading indicator when data is being fetched */}
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}

                        {/* Display an error message if the fetch fails */}
                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}

                        {/* Conditionally display the "Search Results" text */}
                        {!loading &&
                            !error &&
                            searchQuery.trim() &&
                            movies?.length > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for{" "}
                                    <Text className="text-accent">{searchQuery}</Text>
                                </Text>
                            )}
                    </>
                }
            />
        </View>
    );
};
export default Search;
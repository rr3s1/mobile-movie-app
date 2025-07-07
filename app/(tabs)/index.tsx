import {
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

export default function Index() {
    const router = useRouter();

    // Use the custom fetch hook to get movies, loading, and error states.
    // The data is renamed to 'movies' for clarity.
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "" }));

    return (
        <View className="flex-1 bg-primary">
            {/* Background image for styling */}
            <Image
                source={images.bg}
                className="absolute w-full z-0"
            />
            {/* Main scrollable container */}
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: "100%",
                    paddingBottom: 10,
                }}
            >
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

                {/* Conditional rendering based on loading and error states */}
                {moviesLoading ? (
                    // Display a loading indicator while fetching data
                    <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
                ) : moviesError ? (
                    // Display an error message if the fetch fails
                    <Text className="text-white text-center mt-10">
                        Error: {moviesError.message}
                    </Text>
                ) : (
                    // Render the main content when data is available
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => {
                                router.push("/search");
                            }}
                            placeholder="Search for a movie"
                        />
                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">
                                Latest Movies
                            </Text>

                            {/* FlatList to render the list of movies in a grid */}
                            <FlatList
                                data={movies}
                                // Defines how each item is rendered
                                renderItem={({ item }) => (
                                    <MovieCard
                                        {...item}
                                    />
                                )}
                                // Provides a unique key for each item
                                keyExtractor={(item) => item.id.toString()}
                                // Arranges items in a 3-column grid
                                numColumns={3}
                                // Styles the wrapper for each row in the grid
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                className="mt-2 pb-32"
                                // Disable scrolling within the FlatList as the parent ScrollView handles it
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
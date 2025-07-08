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
import TrendingCard from "@/components/TrendingCard";
import {getTrendingMovies} from "@/services/appwrite";

const Index = () => {
    const router = useRouter();

    // Fetch trending movies from Appwrite
    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    // Fetch latest movies from the API
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "" }));

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                {/* Display loading indicator if either fetch is in progress */}
                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
                ) : moviesError || trendingError ? (
                    <Text>Error: {moviesError?.message || trendingError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie"
                        />
                        {/* Conditionally render the trending movies section if data is available */}
                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                                <FlatList
                                    horizontal // Enables horizontal scrolling
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-4 mt-3"
                                    data={trendingMovies}
                                    renderItem={({ item, index }) => (
                                        // Renders the custom card for each trending movie
                                        <TrendingCard movie={item} index={index} />
                                    )}
                                    keyExtractor={(item) => item.movie_id.toString()}
                                />
                            </View>
                        )}
                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                            <FlatList
                                data={movies}
                                renderItem={({ item }) => <MovieCard {...item} />}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false} // Scrolling is handled by the parent ScrollView
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Index;
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import useFetch from "../../services/useFetch";
import { fetchMovieDetails } from "@/services/api";
// Defines the props for the reusable MovieInfo component.
interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

// A reusable component to display a label and its corresponding value.
const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);

const Details = () => {
    const router = useRouter();
    // Retrieves the dynamic 'id' parameter from the URL.
    const { id } = useLocalSearchParams();

    // Custom hook to fetch movie details using the ID.
    const { data: movie, loading } = useFetch(() =>
        fetchMovieDetails(id as string)
    );

    // Displays a loading indicator while data is being fetched.
    if (loading)
        return (
            <SafeAreaView className="bg-primary flex-1">
                <ActivityIndicator />
            </SafeAreaView>
        );

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                        }}
                        className="w-full h-[550px]"
                        resizeMode="stretch"
                    />
                </View>

                {/* Main content area for movie details */}
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie?.release_date?.split("-")[0]} •
                        </Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                    </View>

                    {/* Rating and vote count section */}
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>

                    {/* Using the reusable MovieInfo component for different details */}
                    <MovieInfo label="Overview" value={movie?.overview} />
                    <MovieInfo
                        label="Genres"
                        value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
                    />

                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo
                            label="Budget"
                            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
                        />
                        <MovieInfo
                            label="Revenue"
                            value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`}
                        />
                    </View>

                    <MovieInfo
                        label="Production Companies"
                        value={movie?.production_companies?.map((c) => c.name).join(" • ") || "N/A"}
                    />
                </View>
            </ScrollView>

            {/* "Go Back" button positioned at the bottom of the screen */}
            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Details;
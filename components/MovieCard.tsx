import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";
// Define the MovieCard component, accepting individual movie properties as props
const MovieCard = ({
                       id,
                       poster_path,
                       title,
                       vote_average,
                       release_date,
                   }: Movie) => {
    return (
        // Link component from Expo Router to handle navigation.
        // The 'asChild' prop passes the link's functionality to its direct child.
        <Link href={`/movies/${id}`} asChild>
            {/* TouchableOpacity makes the entire card pressable */}
            <TouchableOpacity className="w-[30%]">
                {/* Image component to display the movie poster */}
                <Image
                    source={{
                        uri: poster_path
                            // Construct the full image URL if a poster_path exists
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            // Use a placeholder image if no poster is available
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                {/* Text component to display the movie title, limited to one line */}
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {title}
                </Text>

                {/* View container for the star rating */}
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white font-bold uppercase">
                        {/* Display the movie rating, rounded and scaled to a 5-star system */}
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>

                {/* View container for the release year and media type */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {/* Display only the year from the release_date string */}
                        {release_date?.split("-")[0]}
                    </Text>
                    {/* Static text indicating the media type */}
                    <Text className="text-xs font-medium text-light-300 uppercase">
                        Movie
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};
export default MovieCard;
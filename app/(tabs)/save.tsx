import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
    return (
        // SafeAreaView provides a safe area for content rendering.
        <SafeAreaView className="bg-primary flex-1 px-10">
            {/* A simple placeholder layout to be expanded upon later. */}
            <View className="flex justify-center items-center flex-1 flex-col gap-5">
                <Image source={icons.save} className="size-10" tintColor="#fff" />
                <Text className="text-gray-500 text-base">Save</Text>
            </View>
        </SafeAreaView>
    );
};

export default Save;

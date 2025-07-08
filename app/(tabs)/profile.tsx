import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    return (
        // SafeAreaView ensures content is not obscured by system UI (like notches).
        <SafeAreaView className="bg-primary flex-1 px-10">
            {/* This View centers the content both horizontally and vertically. */}
            <View className="flex justify-center items-center flex-1 flex-col gap-5">
                <Image source={icons.person} className="size-10" tintColor="#fff" />
                <Text className="text-gray-500 text-base">Profile</Text>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
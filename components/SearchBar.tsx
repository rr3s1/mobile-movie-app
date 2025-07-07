import { View, TextInput, Image } from "react-native";
import { icons } from "@/constants/icons";

import React from 'react'
interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image
            source={icons.search}
            className="size-5"
            resizeMode="contain"
            tintColor="#ab8bff"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-white"
                placeholderTextColor="#A8B5DB"
            />


        </View>
    )
}
export default SearchBar

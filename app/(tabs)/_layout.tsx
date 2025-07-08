import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from  "expo-router";
import {ImageBackground, Image} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

// Define a reusable component for rendering tab icons
const TabIcon = ({focused, icon, title}: any) => {

    // Conditionally render the icon based on the 'focused' state
    if (focused) {
        // If the tab is active, show a highlighted background with the icon and title
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image
                    source={icon}
                    tintColor="#151312" // Set a dark color for the icon on a light background
                    className="size-5"
                />
                <Text className="text-secondary text-base font-semibold">{title}</Text>
            </ImageBackground>
        )
    }
    // If the tab is not active, show only the icon with a different tint color
    return (
        <View className="size-full justify-center">
            <Image
                source={icon}
                tintColor="#A8B5DB" // A lighter color for inactive icons
                className="size-5"
            />
        </View>
    )
}

// Define the main layout for the tab navigator
const TabsLayout = () => {
    return (
        <Tabs
            // Apply global styling options to the entire tab bar
            screenOptions={{
                tabBarShowLabel: false, // Hide the default text labels
                // Style for each individual tab item
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                // Style for the tab bar container
                tabBarStyle: {
                    backgroundColor: "#0F0D23", // Dark background color
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                },
            }}
        >
            {/* Define each screen within the tab navigator */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    // Use the custom TabIcon component for the tab bar icon
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="save"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}
export default TabsLayout

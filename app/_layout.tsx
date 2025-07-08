import { Stack } from "expo-router";
import './globals.css'
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
      // A React Fragment is used to wrap multiple components without adding an extra node to the DOM.
      <>
        {/* The StatusBar component from React Native controls the app's status bar. */}
        {/* The 'hidden' prop is set to true to completely hide the system status bar (time, battery, etc.). */}
        <StatusBar hidden={true} />

        {/* The Stack navigator defines the navigation structure for the app. */}
        <Stack>
          {/* Defines the main tab-based navigation group. 'headerShown: false' hides the default header. */}
          <Stack.Screen
              name="(tabs)"
              options={{headerShown: false}}
          />
          {/* Defines the screen for displaying individual movie details. The header is also hidden. */}
          <Stack.Screen
              name="movie/[id]"
              options={{headerShown: false}}
          />
        </Stack>
      </>
  );
}
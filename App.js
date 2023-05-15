import { StatusBar } from "expo-status-bar";
import globalStyles from "./utils/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import LandingScreen from "./src/screens/LandingScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "LabGrostesque-Regular": require("./assets/fonts/LabGrotesque-Regular.ttf"),
    "LabGrostesque-Bold": require("./assets/fonts/LabGrotesque-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider>
      <StatusBar
        backgroundColor={globalStyles.appBackgroundColor}
        style="light"
      />
      <SafeAreaView className="flex-1" onLayout={onLayoutRootView}>
        <LandingScreen />
      </SafeAreaView>
    </PaperProvider>
  );
}

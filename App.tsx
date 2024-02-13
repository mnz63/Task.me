import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import AppRoutes from "./app/routes/AppRoutes";
import { AuthProvider } from "./app/features/Auth/UserContext";

export default function App() {
  const [loaded, error] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

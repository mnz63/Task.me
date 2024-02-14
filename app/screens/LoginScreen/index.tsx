import { Image, KeyboardAvoidingView, Platform } from "react-native";
import { View } from "@gluestack-ui/themed";
import { useState } from "react";
import FlipCard from "react-native-flip-card";
import RegisterCard from "../../components/Cards/RegisterCard";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import LoginCard from "../../components/Cards/LoginCard";
import Layout from "../../components/AuthLayout";
import { useUserAuthContext } from "../../features/Auth/UserContext";
import useCreateUser from "../../features/User/hooks/useCreateUser";

export default function LoginScreen() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { createUser, loading } = useCreateUser();

  const handleRegisterSubmit = async (data) => {
    await createUser(data);
    setIsFlipped(false);
  };

  const { login, loginLoading } = useUserAuthContext();

  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
      <Layout hasBackButton={isFlipped} onPressBack={() => setIsFlipped(false)}>
        <View height={"25%"} justifyContent="flex-end" alignItems="center">
          <Image
            source={require("../../../assets/logo.png")}
            alt={"logo"}
            style={{
              width: 400,
              height: 200,
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={isFlipped}
            clickable={false}
          >
            <View
              style={{
                height: 300,
              }}
            >
              <LoginCard
                onFlipCardRegister={() => setIsFlipped(true)}
                onLoginSubmit={login}
                isLoading={loginLoading || loading}
              />
            </View>
            <View
              style={{
                height: 300,
              }}
            >
              <RegisterCard onRegisterSubmit={handleRegisterSubmit} />
            </View>
          </FlipCard>
        </KeyboardAvoidingView>
      </Layout>
    </Animated.View>
  );
}

import { Image, KeyboardAvoidingView, Platform } from "react-native";
import { View, useToast } from "@gluestack-ui/themed";
import { useState } from "react";
import FlipCard from "react-native-flip-card";
import RegisterCard from "../../components/Cards/RegisterCard";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import LoginCard from "../../components/Cards/LoginCard";
import Layout from "../../components/AuthLayout";
import { createUserWithEmailAndPassword } from "firebase/auth";

import CustomToast from "../../components/Toast";
import { auth } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useUserAuthContext } from "../../features/Auth/UserContext";

export default function LoginScreen() {
  const [isFlipped, setIsFlipped] = useState(false);
  const toast = useToast();

  const handleRegisterSubmit = async (data) => {
    await createUserWithEmailAndPassword(auth, data?.email, data?.password);
    await updateProfile(auth.currentUser, {
      displayName: data?.username,
    })
      .then(() => {
        console.log("Account created successfully!");
        toast.show({
          placement: "top",
          render: () =>
            CustomToast({
              title: "Conta criada com sucesso!",
              message: "Realize login.",
              type: "success",
            }),
        });
        setIsFlipped(false);
      })
      .catch((err) => {
        toast.show({
          placement: "top",
          render: () =>
            CustomToast({
              title: "Erro ao cadastrar conta!",
              message: err,
              type: "error",
            }),
        });
      });
  };

  const { login } = useUserAuthContext();

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

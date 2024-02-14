import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { View, Text } from "@gluestack-ui/themed";
import { StatusBar, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoutIcon, UserTabIcon } from "../../../assets/icons";
import ProfileCard from "../../components/Cards/ProfileCard";
import LogoutModal from "../../components/Modals/LogoutModal";
import { useEffect, useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useUserAuthContext } from "../../features/Auth/UserContext";

StatusBar.setBackgroundColor("#006EE9");

export default function ProfileScreen({ navigation }) {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { me } = useUserAuthContext();

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await me?.reload();
      console.log("reload");
    });
  }, [navigation]);

  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
      <SafeAreaView>
        <LogoutModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
        <View bgColor="#FFF" h={"100%"} position="relative">
          <View
            bgColor="#006EE9"
            h={"$1/5"}
            w={"100%"}
            borderBottomLeftRadius={50}
            borderBottomRightRadius={50}
          />

          <View
            position="absolute"
            w={"100%"}
            top={"$1/6"}
            paddingHorizontal={"$4"}
            h={"100%"}
          >
            <View
              bgColor="#FFF"
              borderRadius={20}
              h={150}
              shadowColor="#006EE9"
              shadowOpacity={"$100"}
              hardShadow="1"
            >
              <ProfileCard />

              <View mt={"$4"} gap={20}>
                <TouchableHighlight
                  style={{
                    flexDirection: "row",
                    gap: 35,
                    alignItems: "center",
                    height: 44,
                    paddingHorizontal: 40,
                  }}
                  underlayColor={"#F1F7FE"}
                  onPress={() => navigate("EditProfileScreen")}
                >
                  <>
                    <UserTabIcon color={"#006EE9"} />
                    <Text
                      fontFamily="Poppins_400Regular"
                      color={"#000"}
                      fontSize={15}
                    >
                      Meu Perfil
                    </Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    flexDirection: "row",
                    gap: 35,
                    alignItems: "center",
                    height: 44,
                    paddingHorizontal: 40,
                  }}
                  underlayColor={"#F1F7FE"}
                  onPress={() => setModalIsOpen(true)}
                >
                  <>
                    <LogoutIcon />
                    <Text
                      fontFamily="Poppins_400Regular"
                      color={"#000"}
                      fontSize={15}
                    >
                      Sair
                    </Text>
                  </>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

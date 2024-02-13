import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import { View, Text, FlatList } from "@gluestack-ui/themed";
import { truncate } from "../../common/utils/Truncate";
import { Dimensions, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import CreateToDoModal from "../../components/Modals/ToDoModal";
import { useState } from "react";
import ToDoList from "../../components/ToDoList";

export default function TaskDetailScreen() {
  const { width } = Dimensions.get("window");
  const { goBack }: NavigationProp<ParamListBase> = useNavigation();
  const calcPadding = (width / 100) * 8;

  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
      <SafeAreaView
        style={{
          height: "100%",
          backgroundColor: "#FFF",
        }}
      >
        <View mt={"$9"} px={"$4"} gap={20}>
          <View flexDirection="row" alignItems="center" gap={10}>
            <BackButton
              props={{
                onPress: () => goBack(),
              }}
            />
            <Text
              fontFamily="Poppins_700Bold"
              color={"#006EE9"}
              fontSize={32}
              lineHeight={40}
            >
              {truncate("Ir à academia academia", 15)}
            </Text>
          </View>
          <View flexDirection="row" justifyContent="space-between">
            <View>
              <Text
                fontFamily="Poppins_500Medium"
                color={"#4A4646"}
                fontSize={14}
              >
                Começa
              </Text>
              <Text
                fontFamily="Poppins_400Regular"
                color={"#4A4646"}
                fontSize={12}
              >
                21 Dez 2023
              </Text>
            </View>
            <View>
              <Text
                fontFamily="Poppins_500Medium"
                color={"#4A4646"}
                fontSize={14}
              >
                Termina
              </Text>
              <Text
                fontFamily="Poppins_400Regular"
                color={"#4A4646"}
                fontSize={12}
              >
                21 Dez 2023
              </Text>
            </View>
          </View>

          <View flexDirection="row" justifyContent="space-between">
            <View
              bgColor="#006EE9"
              alignItems="center"
              justifyContent="center"
              borderRadius={20}
              w={width / 3.5}
              h={width / 4}
            >
              <Text
                fontFamily="Poppins_700Bold"
                color={"#fff"}
                fontSize={40}
                lineHeight={45}
              >
                0
              </Text>
              <Text
                fontFamily="Poppins_400Regular"
                color={"#fff"}
                fontSize={14}
              >
                Meses
              </Text>
            </View>
            <View
              bgColor="#006EE9"
              alignItems="center"
              justifyContent="center"
              borderRadius={20}
              w={width / 3.5}
              h={width / 4}
            >
              <Text
                fontFamily="Poppins_700Bold"
                color={"#fff"}
                fontSize={40}
                lineHeight={45}
              >
                12
              </Text>
              <Text
                fontFamily="Poppins_400Regular"
                color={"#fff"}
                fontSize={14}
              >
                dias
              </Text>
            </View>
            <View
              bgColor="#006EE9"
              alignItems="center"
              justifyContent="center"
              borderRadius={20}
              w={width / 3.5}
              h={width / 4}
            >
              <Text
                fontFamily="Poppins_700Bold"
                color={"#fff"}
                fontSize={40}
                lineHeight={45}
              >
                3
              </Text>
              <Text
                fontFamily="Poppins_400Regular"
                color={"#fff"}
                fontSize={14}
              >
                horas
              </Text>
            </View>
          </View>

          <View gap={10}>
            <Text
              fontFamily="Poppins_500Medium"
              color={"#4A4646"}
              fontSize={14}
            >
              Descrição
            </Text>
            <Text
              fontFamily="Poppins_400Regular"
              color={"#4A4646"}
              fontSize={12}
              lineHeight={18}
            >
              {truncate(
                `User interface (UI) design is the process designers use to build interfaces in software or computerized devices, focusing on looks or style. Designers aim to create interfaces which users find easy to use and pleasurable. UI design refers to graphical user interfaces and other forms e.g., voice-controlled interfaces interfaces. interfaces. interfaces.`,
                345
              )}
            </Text>
          </View>

          <View width={"100%"} gap={5}>
            <Text
              fontFamily="Poppins_500Medium"
              color={"#4A4646"}
              fontSize={14}
            >
              Progresso
            </Text>
            <Progress.Bar
              progress={0.8}
              width={width - calcPadding}
              height={20}
              color={"#006EE9"}
              unfilledColor="#A9A2A2"
              borderWidth={0}
              borderRadius={20}
            >
              <View position="absolute" w={"100%"} alignItems="center">
                <Text
                  fontFamily="Poppins_500Medium"
                  color={"#FFF"}
                  fontSize={10}
                >
                  80%
                </Text>
              </View>
            </Progress.Bar>
          </View>
          <ToDoList />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

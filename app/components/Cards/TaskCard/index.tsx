import { ImageBackground, TouchableOpacity } from "react-native";
import { View, Text } from "@gluestack-ui/themed";
import { truncate } from "../../../common/utils/Truncate";
import * as Progress from "react-native-progress";
import { memo } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

type Props = {
  priority?: number;
};

export const TaskCard = memo(({ priority }: Props) => {
  const background =
    priority === 1 ? "#006EE9" : priority === 2 ? "#362075" : "#CD2C2C";

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  return (
    <TouchableOpacity
      style={{
        width: 129,
        height: 188,
        backgroundColor: background,
        borderRadius: 20,
        position: "relative",
      }}
      activeOpacity={0.7}
      onPress={() => navigate("TaskDetails")}
    >
      <View
        h={"100%"}
        borderRadius={20}
        position="absolute"
        right={0}
        left={0}
        zIndex={99}
        px={10}
        py={15}
        justifyContent="space-between"
      >
        <View
          w={48}
          h={20}
          bgColor="#FFF"
          borderRadius={10}
          alignItems="center"
          alignSelf="flex-end"
        >
          <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={10}>
            20 dias
          </Text>
        </View>
        <View>
          <Text fontFamily="Poppins_600SemiBold" color={"#FFF"} fontSize={16}>
            {truncate("Ir à academia academia academia", 23)}
          </Text>
        </View>
        <View gap={5}>
          <Progress.Bar
            progress={0.8}
            width={110}
            height={4}
            color={"#FFF"}
            unfilledColor="#0000003d"
            borderWidth={0}
          />
          <Text
            fontFamily="Poppins_400Regular"
            color={"#FFF"}
            fontSize={12}
            alignSelf="flex-end"
          >
            80%
          </Text>
        </View>
      </View>
      <ImageBackground
        source={require("../../../../assets/icons/TaskCardBg.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </TouchableOpacity>
  );
});

import { View, Text } from "@gluestack-ui/themed";
import { useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

type Props = {
  selectedTab?: number;
  handleTabPress?: (index: number) => void;
};

const windowWidth = Dimensions.get("window").width;

export default function TasksListNavBar({
  selectedTab,
  handleTabPress,
}: Props) {
  const translateX = useSharedValue(0);
  const tabPositions = [0, windowWidth / 2];

  useEffect(() => {
    translateX.value = withSpring(tabPositions[selectedTab]);
  }, [selectedTab, translateX, tabPositions]);
  const tab = (index, label) => {
    const isSelected = selectedTab === index;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handleTabPress(index);
        }}
      >
        <View alignItems="center" gap={3}>
          <Text
            fontFamily="Poppins_600SemiBold"
            color={isSelected ? "#006EE9" : "#000"}
            fontSize={16}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const animatedStyle = useAnimatedStyle(() => {
    const translateXInterpolated = interpolate(
      translateX.value,
      tabPositions,
      [-50, 140]
    );

    return {
      position: "absolute",
      bottom: 0,
      left: "32%",
      marginLeft: translateXInterpolated,
      backgroundColor: "#006EE9",
    };
  });

  return (
    <View mb={30}>
      <View w={"100%"} flexDirection="row" justifyContent="space-around" mb={5}>
        {tab(0, "Prioridades")}
        {tab(1, "Tarefas diárias")}
      </View>
      <Animated.View style={[{ width: 35, height: 3 }, animatedStyle]} />
    </View>
  );
}

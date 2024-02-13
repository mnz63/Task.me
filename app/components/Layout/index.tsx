import { View, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../BackButton";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";

type Props = {
  children?: any;
  onPressBack?: () => void;
  title?: string;
};

export default function Layout({ children, onPressBack, title }: Props) {
  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
      <SafeAreaView
        style={{
          height: "100%",
          backgroundColor: "#006EE9",
        }}
      >
        <View
          flexDirection="row"
          px={"$4"}
          alignItems="center"
          justifyContent="center"
          position="relative"
          h={"$1/6"}
        >
          <BackButton
            styleProps={{
              backgroundColor: "#FFF",
              position: "absolute",
              left: "4%",
            }}
            color="#006EE9"
            props={{
              onPress: () => onPressBack(),
            }}
          />
          <Text fontFamily="Poppins_600SemiBold" fontSize={16} color={"#fff"}>
            {title}
          </Text>
        </View>
        <View
          bgColor="#FFF"
          h={"100%"}
          borderTopLeftRadius={60}
          borderTopRightRadius={60}
          alignItems="center"
          padding={"$4"}
        >
          {children}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
  props?: TouchableOpacityProps;
  styleProps?: StyleProp<ViewStyle>;
  color?: string;
};
export default function BackButton({ props, styleProps, color }: Props) {
  return (
    <TouchableOpacity
      style={[
        {
          width: 40,
          height: 40,
          backgroundColor: "#006EE9",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        },
        styleProps,
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Ionicons name="arrow-back" size={20} color={color || "white"} />
    </TouchableOpacity>
  );
}

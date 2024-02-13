import { Text, StyleProp, TextStyle } from "react-native";

type Props = {
  styles?: StyleProp<TextStyle>;
  children?: any;
};

export default function CustomText({ children, styles }: Props) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins_500Medium",
        },
        styles,
      ]}
    >
      {children}
    </Text>
  );
}

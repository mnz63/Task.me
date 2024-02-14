import { TouchableOpacity } from "react-native";
import { Spinner, Text } from "@gluestack-ui/themed";

type Props = {
  label?: string;
  onPress?: () => void;
  isLoading?: boolean;
};

export default function CustomButton({
  label,
  onPress,
  isLoading,
}: Readonly<Props>) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#006EE9",
        height: 55,
        width: "100%",
        borderRadius: 15,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {isLoading ? (
        <Spinner size={"small"} color={"#FFF"} />
      ) : (
        <Text fontFamily="Poppins_400Regular" color={"#fff"}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

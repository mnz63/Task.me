import { TouchableOpacity } from "react-native";
import { Text } from "@gluestack-ui/themed";

export default function CustomButton({ label }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#006EE9",
        height: 50,
        width: "100%",
        borderRadius: 15,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={0.8}
    >
      <Text fontFamily="Poppins_400Regular" color={"#fff"}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

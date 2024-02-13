import { View, Text } from "@gluestack-ui/themed";
import moment from "moment";
import "moment/locale/pt-br";
import { TouchableOpacity } from "react-native";

export default function DateCard({ date, onSelectDate, selected }) {
  const day = moment(date).locale("pt-br").format("ddd");
  const dayNumber = moment(date).format("D");

  const fullDate = moment(date).format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");
  const isSelected = selected === fullDate;

  return (
    <TouchableOpacity onPress={() => onSelectDate(fullDate)}>
      <View
        bgColor={isSelected ? "#006EE9" : "#d2e0fa"}
        w={isSelected ? 65 : 50}
        h={isSelected ? 65 : 50}
        borderRadius={10}
        alignItems="center"
        justifyContent="center"
        ml={10}
      >
        <Text
          fontFamily="Poppins_400Regular"
          color={isSelected ? "#fff" : "#006EE9"}
          fontSize={10}
        >
          {day}
        </Text>
        <Text
          fontFamily="Poppins_600SemiBold"
          color={isSelected ? "#fff" : "#006EE9"}
          fontSize={isSelected ? 20 : 15}
        >
          {dayNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

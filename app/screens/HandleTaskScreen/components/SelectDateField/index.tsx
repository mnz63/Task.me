import { memo, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment";
import { Pressable, Text, View } from "@gluestack-ui/themed";
import { CalendarIcon } from "../../../../../assets/icons";

type Props = {
  isStart?: boolean;
};

export default function SelectDateField() {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(
    moment(today).format("YYYY/MM/DD")
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const DateInput = memo(({ isStart }: Props) => {
    const todayFormated = moment(today).format("DD-MMM-YYYY");
    const selectDateFormated = moment(selectedDate, "YYYY/MM/DD").format(
      "DD-MMM-YYYY"
    );

    return (
      <Pressable
        h={48}
        bgColor={isStart ? "#EEF5FD" : "#FFF"}
        borderRadius={10}
        alignItems="center"
        gap={10}
        px={15}
        flexDirection="row"
        borderWidth={1}
        borderColor="#006de922"
        onPress={() => !isStart && showDatePicker()}
      >
        <CalendarIcon color={isStart ? "#ABCEF5" : "#006EE9"} />
        <Text
          fontFamily="Poppins_400Regular"
          color={"#4A4646"}
          fontSize={13}
          mt={4}
        >
          {isStart ? todayFormated : selectDateFormated}
        </Text>
      </Pressable>
    );
  });
  return (
    <View w={"100%"} position="relative" zIndex={99}>
      <View flexDirection="row" justifyContent="space-around">
        <View w={"$40"} gap={5}>
          <Text fontFamily="Poppins_500Medium" color={"#006EE9"}>
            Começa
          </Text>
          <DateInput isStart={true} />
        </View>
        <View w={"$40"} gap={5}>
          <Text fontFamily="Poppins_500Medium" color={"#006EE9"}>
            Termina
          </Text>
          <DateInput isStart={false} />
        </View>
      </View>
      {datePickerVisible && (
        <View
          borderRadius={20}
          overflow="hidden"
          borderWidth={1}
          borderColor="#006de922"
          position="absolute"
          w={"100%"}
          top={98}
          zIndex={99}
          bgColor="#ffffff"
        >
          <DatePicker
            selected={selectedDate}
            onSelectedChange={(date) => setSelectedDate(date)}
            mode="calendar"
            minimumDate={today}
            options={{
              textHeaderColor: "#006EE9",
              mainColor: "#006EE9",
            }}
          />
          <View h={40} zIndex={99}>
            <Pressable
              h={40}
              w={"$1/3"}
              alignItems="center"
              justifyContent="flex-start"
              alignSelf="flex-end"
              onPress={hideDatePicker}
            >
              <Text fontFamily="Poppins_500Medium" color={"#006EE9"}>
                Selecionar
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

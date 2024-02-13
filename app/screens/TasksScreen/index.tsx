import { View, Text, ScrollView, FlatList } from "@gluestack-ui/themed";
import { TaskTabIcon } from "../../../assets/icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dimensions, TouchableOpacity } from "react-native";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import TasksList from "../../components/TasksList";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import DateCard from "../../components/Cards/DateCard";

export default function TasksScreen() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const now = new Date();
  const todayFormated = format(now, "d, MMM", { locale: ptBR });
  const [dates, setDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const width = Dimensions.get("window").width / 146;

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const daysOfMonth = moment().daysInMonth();
  const flatListRef = useRef(null);

  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < daysOfMonth; i++) {
      const date = moment()
        .startOf("month")
        .add(i, "days")
        .format("YYYY-MM-DD");
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex <= 3 ? 0 : selectedIndex - width,
        animated: true,
      });
    }
  }, [selectedIndex]);

  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      style={{
        backgroundColor: "#FFF",
      }}
    >
      <View mt={40}>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          px={"$4"}
        >
          <View flexDirection="row" alignItems="center" gap={5}>
            <TaskTabIcon color={"#006EE9"} />
            <Text
              fontFamily="Poppins_600SemiBold"
              color={"#000"}
              fontSize={25}
              lineHeight={35}
            >
              {todayFormated}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#006EE9",
              height: 40,
              width: 100,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
            onPress={() =>
              navigate("HandleTaskScreen", {
                isEdit: false,
              })
            }
          >
            <Text fontFamily="Poppins_400Regular" color={"#fff"} fontSize={12}>
              + Nova Tarefa
            </Text>
          </TouchableOpacity>
        </View>
        <View mt={40}>
          <FlatList
            ref={flatListRef}
            data={dates}
            renderItem={({ item, index }) => (
              <DateCard
                key={index}
                date={item}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setSelectedIndex(index);
                }}
                selected={selectedDate}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          />
        </View>
        <TasksList />
      </View>
    </Animated.View>
  );
}

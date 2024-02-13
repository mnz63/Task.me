import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import Layout from "../../components/AuthLayout";
import { View, Text } from "@gluestack-ui/themed";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NotificationIcon } from "../../../assets/icons";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import NotTasksFound from "../../components/NotTasksFound";
import { TaskCard } from "../../components/Cards/TaskCard";
import { DailyTask } from "../../components/DailyTask";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const now = new Date();
  const todayFormated = format(now, "EEEE, d, MMM", { locale: ptBR });
  const capitalized =
    todayFormated?.charAt(0).toUpperCase() + todayFormated?.slice(1);

  const data = [
    { priority: 1, completed: true },
    { priority: 2, completed: true },
    { priority: 3, completed: false },
    { priority: 1, completed: false },
    { priority: 2, completed: false },
    { priority: 3, completed: true },
  ];

  const height = Dimensions.get("window").height;

  const authCheck = async () => {
    const value = await AsyncStorage.getItem("user-token");
    if (value === null) {
      navigation.replace("Login");
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
      <Layout>
        <View flexDirection="row" justifyContent="space-between">
          <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={13}>
            {capitalized}
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <NotificationIcon color={"#006EE9"} />
          </TouchableOpacity>
        </View>
        <View mt={25}>
          <Text
            fontFamily="Poppins_700Bold"
            color={"#000"}
            fontSize={23}
            lineHeight={29}
          >
            Bem vindo, Danilo
          </Text>
          <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={16}>
            Tenha um bom dia!
          </Text>
        </View>

        <View mt={30} gap={15}>
          <Text
            fontFamily="Poppins_600SemiBold"
            color={"#000"}
            fontSize={20}
            lineHeight={25}
          >
            Tarefas com prioridade
          </Text>
          <FlatList
            data={data}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            ListEmptyComponent={() => <NotTasksFound />}
            renderItem={({ item }) => <TaskCard priority={item.priority} />}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={3}
          />
        </View>

        <View mt={30} gap={15}>
          <Text
            fontFamily="Poppins_600SemiBold"
            color={"#000"}
            fontSize={20}
            lineHeight={25}
          >
            Tarefas diárias
          </Text>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={() => <NotTasksFound />}
            renderItem={({ item }) => <DailyTask completed={item.completed} />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={3}
            style={{
              maxHeight: height / 3,
            }}
          />
        </View>
      </Layout>
    </Animated.View>
  );
}

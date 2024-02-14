import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import Layout from "../../components/AuthLayout";
import { View, Text } from "@gluestack-ui/themed";
import { format, getHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NotificationIcon } from "../../../assets/icons";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import NotTasksFound from "../../components/NotTasksFound";
import { TaskCard } from "../../components/Cards/TaskCard";
import { DailyTask } from "../../components/DailyTask";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserAuthContext } from "../../features/Auth/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import useCreateOneTask, {
  TaskDataType,
} from "../../features/Tasks/hooks/useCreateOneTask";

export default function HomeScreen({ navigation }) {
  const now = new Date();
  const todayFormated = format(now, "EEEE, d, MMM", { locale: ptBR });
  const hours = getHours(now);
  const capitalized =
    todayFormated?.charAt(0).toUpperCase() + todayFormated?.slice(1);

  const [data, setData] = useState<Array<TaskDataType>>([]);
  const { me } = useUserAuthContext();
  const docRef = doc(db, "users", me?.uid);

  useMemo(() => {
    onSnapshot(docRef, (doc) => {
      setData(doc.data().tasks);
    });
  }, [onSnapshot, setData]);

  const height = Dimensions.get("window").height;

  const { createTask } = useCreateOneTask();
  const userFirstName = me?.displayName?.split(" ")?.[0];

  const authCheck = async () => {
    const value = await AsyncStorage.getItem("user-token");
    if (value === null) {
      navigation.replace("Login");
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  function getTimeofDay() {
    if (hours >= 6 && hours < 12) {
      return "Tenha um bom dia!";
    } else if (hours >= 12 && hours < 18) {
      return "Tenha uma boa tarde!";
    } else {
      return "Tenha uma boa noite!";
    }
  }

  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
      <Layout>
        <View flexDirection="row" justifyContent="space-between">
          <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={13}>
            {capitalized}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              createTask({
                title: "UI Design",
                category: "Priority",
                description: "UI Mobile Development",
                startDate: new Date(),
                endDate: new Date(),
                userId: me?.uid,
              });
            }}
          >
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
            {`Bem vindo, ${userFirstName}`}
          </Text>
          <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={16}>
            {getTimeofDay()}
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
            renderItem={({ item }) => (
              <TaskCard title={item?.title} priority={1} />
            )}
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
            renderItem={({ item }) => <DailyTask completed={false} />}
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

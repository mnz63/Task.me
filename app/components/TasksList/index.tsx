import { View, Text, FlatList } from "@gluestack-ui/themed";
import TasksListCard from "../Cards/TasksListCard";
import { Dimensions } from "react-native";
import { useState } from "react";
import TasksListNavBar from "../TasksListNavBar";
import { DailyTask } from "../DailyTask";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import NotTasksFound from "../NotTasksFound";
import HandleTaskModal from "../Modals/HandleTaskModal";

export default function TasksList() {
  const data = [1, 2, 3, 4, 5, 6];
  const { width, height } = Dimensions.get("window");
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);

  const handleTabPress = (index) => {
    if (selectedTab !== index) {
      translateX.value = withSpring(index * width);
      setSelectedTab(index);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value }],
    };
  });

  const TaskList = ({ selectedTab }) => {
    return (
      <FlatList
        data={data}
        height={height - 200}
        minWidth={"100%"}
        renderItem={({ item }) => <TasksListCard />}
        ItemSeparatorComponent={() => <View height={10} />}
        ListEmptyComponent={() => <NotTasksFound />}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={50}
        mr={"$8"}
      />
    );
  };

  const DailyTasks = ({ selectedTab }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    if (selectedTab === 1) {
      return (
        <>
          <HandleTaskModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
          />
          <FlatList
            data={data}
            height={height - 200}
            minWidth={"100%"}
            renderItem={({ item }) => (
              <DailyTask disableRadio onPress={() => setModalIsOpen(true)} />
            )}
            ItemSeparatorComponent={() => <View height={10} />}
            ListEmptyComponent={() => <NotTasksFound />}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={50}
          />
        </>
      );
    }
    return null;
  };

  return (
    <View mt={40} px={"$4"}>
      <TasksListNavBar
        handleTabPress={handleTabPress}
        selectedTab={selectedTab}
      />
      <Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
        <TaskList selectedTab={selectedTab} />
        <DailyTasks selectedTab={selectedTab} />
      </Animated.View>
    </View>
  );
}

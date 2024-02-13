import { useState } from "react";
import { DailyTask } from "../../components/DailyTask";
import NotTasksFound from "../../components/NotTasksFound";
import { View, Text, FlatList } from "@gluestack-ui/themed";
import { Dimensions, TouchableOpacity, ScrollView } from "react-native";
import CreateToDoModal from "../Modals/ToDoModal";

export default function ToDoList() {
  const { height } = Dimensions.get("window");
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 7];
  const [modalOptions, setModalOptions] = useState({
    isOpen: false,
    isEdit: false,
  });

  return (
    <View gap={10}>
      <CreateToDoModal
        isOpen={modalOptions.isOpen}
        isEdit={modalOptions.isEdit}
        onClose={() => setModalOptions({ isOpen: false, isEdit: false })}
      />
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontFamily="Poppins_500Medium" color={"#006EE9"} fontSize={14}>
          To do list
        </Text>
        <TouchableOpacity
          onPress={() => setModalOptions({ isOpen: true, isEdit: false })}
        >
          <Text fontSize={20} mr={20}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled
        style={{
          maxHeight: 500,
          zIndex: 99,
        }}
      >
        {data?.map((item, index) => {
          return (
            <>
              <DailyTask
                key={`${index}${item}`}
                onPress={() => setModalOptions({ isOpen: true, isEdit: true })}
              />
              <View style={{ height: 10 }} key={index} />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}

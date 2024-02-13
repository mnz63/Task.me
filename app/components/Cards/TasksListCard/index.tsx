import { Text, View } from "@gluestack-ui/themed";
import { MenuIcon } from "../../../../assets/icons";
import { truncate } from "../../../common/utils/Truncate";
import { TouchableOpacity } from "react-native";
import HandleTaskModal from "../../Modals/HandleTaskModal";
import { useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

export default function TasksListCard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 165,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#006de926",
        borderRadius: 20,
        padding: 20,
        position: "relative",
        justifyContent: "center",
      }}
      activeOpacity={0.6}
      onPress={() => navigate("TaskDetails")}
    >
      <HandleTaskModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <View
        backgroundColor="#006EE9"
        h={"$2/3"}
        w={3}
        borderRadius={20}
        position="absolute"
      />
      <View w={"100%"} h={"100%"} gap={5}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontFamily="Poppins_600SemiBold"
            color={"#006EE9"}
            fontSize={15}
          >
            {truncate("Ir à academiaa", 25)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setModalIsOpen(true)}
          >
            <MenuIcon />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            fontFamily="Poppins_400Regular"
            color={"#000"}
            fontSize={11}
            lineHeight={14}
          >
            {truncate(
              ` User interface (UI) design is the process designers use to build interfaces in software or computerized devices, focusing on looks or style. Designers aim to create interfaces which users find easy to use and pleasurable. UI design refers to graphical user interfaces and other forms e.g., voice-controlled interfaces interfaces. interfaces. interfaces.`,
              345
            )}
          </Text>
        </View>
        <View alignSelf="flex-end">
          <Text
            fontFamily="Poppins_400Regular"
            color={"#006EE9"}
            fontSize={11}
            lineHeight={15}
          >
            Feb, 21 - Mar, 12
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

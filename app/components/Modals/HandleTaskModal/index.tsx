import { Modal, ModalBackdrop, ModalContent, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function HandleTaskModal({ isOpen, onClose }: Props) {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop opacity={0.1} />
      <ModalContent borderRadius={20} px={20} py={40} alignItems="center">
        <TouchableOpacity
          style={{
            backgroundColor: "#006EE9",
            height: 48,
            width: "100%",
            borderRadius: 10,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={() => {
            onClose();
            navigate("HandleTaskScreen", {
              isEdit: true,
            });
          }}
        >
          <Text fontFamily="Poppins_600SemiBold" fontSize={14} color={"#fff"}>
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#006EE9",
            height: 48,
            width: "100%",
            borderRadius: 10,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={onClose}
        >
          <Text fontFamily="Poppins_600SemiBold" fontSize={14} color={"#fff"}>
            Deletar
          </Text>
        </TouchableOpacity>
      </ModalContent>
    </Modal>
  );
}

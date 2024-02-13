import {
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalContent,
  Text,
  View,
} from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  isEdit?: boolean;
};

export default function CreateToDoModal({ isOpen, onClose, isEdit }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent borderRadius={20} px={20} py={40} alignItems="center">
        <Input
          h={48}
          borderRadius={15}
          borderColor={"#006EE9"}
          size="md"
          isDisabled={false}
          alignItems="center"
        >
          <InputField
            placeholder={"Nova tarefa"}
            color={"#000"}
            fontSize={13}
          />
        </Input>
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
        >
          <Text fontFamily="Poppins_600SemiBold" fontSize={14} color={"#fff"}>
            {isEdit ? "Editar" : "Adicionar"} tarefa
          </Text>
        </TouchableOpacity>
        {isEdit && (
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
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "#006EE9",
            height: 48,
            width: "100%",
            borderRadius: 10,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={onClose}
        >
          <Text fontFamily="Poppins_600SemiBold" fontSize={14} color={"#fff"}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </ModalContent>
    </Modal>
  );
}

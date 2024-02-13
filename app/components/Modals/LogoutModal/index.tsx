import { Modal, ModalContent, Text } from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native";
import { useUserAuthContext } from "../../../features/Auth/UserContext";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function LogoutModal({ isOpen, onClose }: Props) {
  const { logout } = useUserAuthContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BlurView
        tint="light"
        intensity={20}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      />
      <ModalContent
        borderWidth={1}
        borderRadius={20}
        borderColor="#006de976"
        padding={20}
        alignItems="center"
      >
        <Text
          fontFamily="Poppins_600SemiBold"
          color={"#006EE9"}
          fontSize={16}
          textAlign="center"
        >
          {`Deseja sair\n da sua conta?`}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#006EE9",
            height: 40,
            width: "100%",
            borderRadius: 15,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={logout}
        >
          <Text fontFamily="Poppins_400Regular" color={"#fff"}>
            Confirmar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            width: "100%",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.8}
          onPress={onClose}
        >
          <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={12}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </ModalContent>
    </Modal>
  );
}

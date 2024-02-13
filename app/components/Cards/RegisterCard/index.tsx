import { TouchableOpacity } from "react-native";
import CustomText from "../../CustomText";
import { VStack, FormControl, Text } from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../common/utils/SchemaForm";
import InputTextField from "../../Fields/InputTextField";
import { EmailIcon, PasswordIcon, UserIcon } from "../../../../assets/icons";

type Props = {
  onFlipCardLogin?: () => void;
  onRegisterSubmit?: (data) => void;
};

export default function RegisterCard({
  onFlipCardLogin,
  onRegisterSubmit,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  return (
    <VStack alignItems="center">
      <CustomText
        styles={{
          fontWeight: "normal",
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        Crie sua conta
      </CustomText>
      <FormControl width={"100%"}>
        <InputTextField
          name="username"
          control={control}
          icon={<UserIcon />}
          errorMessage={errors?.username?.message}
          placeholder="Nome de usuário"
        />
        <InputTextField
          name="email"
          control={control}
          icon={<EmailIcon />}
          errorMessage={errors?.email?.message}
          placeholder="E-mail"
        />
        <InputTextField
          name="password"
          control={control}
          icon={<PasswordIcon />}
          errorMessage={errors?.password?.message}
          placeholder="Senha"
        />
        <InputTextField
          name="confirmPassword"
          control={control}
          icon={<PasswordIcon />}
          errorMessage={errors?.confirmPassword?.message}
          placeholder="Confirmar senha"
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#006EE9",
            height: 55,
            borderRadius: 15,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleSubmit(onRegisterSubmit)}
          activeOpacity={0.8}
        >
          <Text fontFamily="Poppins_400Regular" color={"#fff"}>
            Registrar
          </Text>
        </TouchableOpacity>
      </FormControl>
    </VStack>
  );
}

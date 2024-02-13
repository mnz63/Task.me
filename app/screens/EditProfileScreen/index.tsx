import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Spinner,
  Text,
  View,
  useToast,
} from "@gluestack-ui/themed";
import Layout from "../../components/Layout";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import InputTextField from "../../components/Fields/InputTextField";
import { useForm } from "react-hook-form";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { storage, useAuth } from "../../../firebaseConfig";
import { User, updateProfile, updatePassword } from "firebase/auth";
import CustomToast from "../../components/Toast";

export default function EditProfileScreen() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const currentUser: User = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (previewImage) {
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const imageRef = ref(storage, currentUser.uid + ".png");
      await uploadBytes(imageRef, blob);
      const photoURL = await getDownloadURL(imageRef);
      updateProfile(currentUser, { photoURL })
        .then(() => {
          toast.show({
            placement: "top",
            render: () =>
              CustomToast({
                title: "Perfil atualizado com sucesso!",
                message: "Informações atualizadas.",
                type: "success",
              }),
          });
        })
        .catch((err) => {
          console.log(err);
          toast.show({
            placement: "top",
            render: () =>
              CustomToast({
                title: "Erro ao atualizar perfil!",
                message: "Erro ao atualizar perfil.",
                type: "success",
              }),
          });
        });
      setPreviewImage(null);
    }
    try {
      if (data?.newPassword) {
        await updatePassword(currentUser, data.newPassword);
      }

      if (data?.username) {
        await updateProfile(currentUser, {
          displayName: data?.username,
        });
      }

      toast.show({
        placement: "top",
        render: () =>
          CustomToast({
            title: "Perfil atualizado com sucesso!",
            message: "Perfil atualizado com sucesso.",
            type: "success",
          }),
      });
    } catch (e) {
      toast.show({
        placement: "top",
        render: () =>
          CustomToast({
            title: "Erro ao atualizar perfil!",
            message: "Erro ao atualizar perfil.",
            type: "error",
          }),
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (previewImage) {
      setImage(previewImage);
    } else {
      setImage(currentUser?.photoURL);
    }
  }, [currentUser, previewImage]);

  useEffect(() => {
    if (currentUser) {
      setValue("username", currentUser?.displayName);
      setValue("email", currentUser?.email);
    }
  }, [currentUser]);

  return (
    <Layout onPressBack={() => navigate("Profile")} title="Meu Perfil">
      <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
        <Avatar
          bgColor="$amber600"
          size="xl"
          borderRadius="$full"
          mb={20}
          justifyContent="flex-end"
        >
          <AvatarFallbackText>Danilo Henrique</AvatarFallbackText>
          <AvatarImage
            source={{
              uri:
                image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
            alt="Profile_Image"
          />
          <Feather
            name="edit"
            size={24}
            color="#006EE9"
            style={{ alignSelf: "flex-end" }}
          />
        </Avatar>
      </TouchableOpacity>
      <View w={"100%"}>
        <InputTextField
          control={control}
          name="username"
          placeholder="Nome de usuário"
          label="Nome"
        />
        <InputTextField
          control={control}
          name="email"
          placeholder="E-mail"
          label="E-mail"
        />
        <InputTextField
          control={control}
          name="currentPassword"
          placeholder="Senha atual"
          label="Senha atual"
        />
        <InputTextField
          control={control}
          name="newPassword"
          placeholder="Nova senha"
          label="Nova senha"
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
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <Spinner size={"small"} color={"#FFF"} />
          ) : (
            <Text fontFamily="Poppins_400Regular" color={"#fff"}>
              Salvar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

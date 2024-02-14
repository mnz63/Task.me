import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
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
import CustomButton from "../../components/Buttons/CustomButton";
import useEditProfile from "../../features/User/hooks/useEditProfile";

export default function EditProfileScreen() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const currentUser: User = useAuth();

  const { control, handleSubmit, setValue } = useForm({});
  const { updateUser, updateUserProfileImage, loading } = useEditProfile();

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
    if (previewImage) {
      await updateUserProfileImage({
        currentUser,
        profileImg: previewImage,
      });
      setPreviewImage(null);
    }

    await updateUser({ ...data, currentUser });
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
        <CustomButton
          isLoading={loading}
          label="Salvar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Layout>
  );
}

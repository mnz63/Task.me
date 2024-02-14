import { useToast } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import {
  User,
  updateProfile,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import CustomToast from "../../../components/Toast";

type dataValues = {
  email?: string;
  newPassword: string;
  password?: string;
  username?: string;
  currentUser?: User;
};

export default function useEditProfile() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const updateUserProfileImage = useCallback(
    async ({
      profileImg,
      currentUser,
    }: {
      profileImg: string;
      currentUser: User;
    }) => {
      if (profileImg) {
        setLoading(true);
        const response = await fetch(profileImg);
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
                  title: "Foto de perfil atualizada!",
                  message: "Sua foto de perfil foi atualizada.",
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
                  title: "Erro ao atualizar foto de perfil!",
                  message: "Erro ao atualizar foto de perfil.",
                  type: "success",
                }),
            });
          });
        setLoading(false);
      }
    },
    [updateProfile, getDownloadURL]
  );

  const updateUser = useCallback(
    async ({ email, newPassword, username, currentUser }: dataValues) => {
      setLoading(true);

      try {
        if (newPassword) {
          await updatePassword(currentUser, newPassword);
        }

        if (username) {
          await updateProfile(currentUser, {
            displayName: username,
          });
        }

        if (email) {
          await updateEmail(currentUser, email);
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
      setLoading(false);
    },
    [updatePassword, updateEmail, updateProfile]
  );

  return {
    loading,
    updateUser,
    updateUserProfileImage,
  };
}

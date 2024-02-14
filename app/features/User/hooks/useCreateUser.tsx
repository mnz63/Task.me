import { useToast } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CustomToast from "../../../components/Toast";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebaseConfig";

type dataValues = {
  email?: string;
  password?: string;
  username?: string;
};

export default function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const createUser = useCallback(
    async ({ email, password, username }: dataValues) => {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
          username: username,
          email: auth.currentUser.email,
          tasks: [],
        });

        await updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            console.log("Account created successfully!");
            toast.show({
              placement: "top",
              render: () =>
                CustomToast({
                  title: "Conta criada com sucesso!",
                  message: "Realize login.",
                  type: "success",
                }),
            });
          })
          .catch((err) => {
            toast.show({
              placement: "top",
              render: () =>
                CustomToast({
                  title: "Erro ao cadastrar conta!",
                  message: err,
                  type: "error",
                }),
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    [createUserWithEmailAndPassword, updateProfile]
  );

  return {
    loading,
    createUser,
  };
}

import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, useAuth } from "../../../firebaseConfig";
import { createContext, useCallback, useContext, useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useToast } from "@gluestack-ui/themed";
import CustomToast from "../../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthContextProps = {
  login({ email, password }): Promise<any>;
  logout(): Promise<void>;
  me: Partial<User>;
  loginLoading: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  async login() {
    return {};
  },
  async logout() {
    return;
  },
  me: null,
  loginLoading: false,
});

export function AuthProvider({ children }) {
  const { navigate, reset }: NavigationProp<ParamListBase> = useNavigation();
  const toast = useToast();
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("user-token", value);
    } catch (e) {
      console.log(e);
    }
  };

  const [loginLoading, setLoginLoading] = useState(false);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoginLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            res?.user?.getIdToken().then((token) => storeToken(token));

            toast.show({
              placement: "top",
              render: () =>
                CustomToast({
                  title: "Login realizado com sucesso!",
                  message: "Bem vindo.",
                  type: "success",
                }),
            });
            navigate("Home");
          })
          .catch(() => {
            toast.show({
              placement: "top",
              render: () =>
                CustomToast({
                  title: "Erro ao realizar login!",
                  message: "Credênciais incorretas.",
                  type: "error",
                }),
            });
          });
      } catch (error) {
        console.log(error);
      }
      setLoginLoading(false);
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("user-token");
      await signOut(auth)
        .then(() => {
          reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const me = useAuth();

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        me,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useUserAuthContext() {
  return useContext(AuthContext);
}

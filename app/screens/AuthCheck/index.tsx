import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Spinner } from "@gluestack-ui/themed";

const AuthCheck = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("user-token");
      if (value !== null) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(false);
    getToken();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner size={"large"} />
      </View>
    );
  }
};

export default AuthCheck;

import {
  View,
  Text,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { BagIcon } from "../../../../assets/icons";
import { useEffect, useState } from "react";
import { useUserAuthContext } from "../../../features/Auth/UserContext";

export default function ProfileCard() {
  const { me } = useUserAuthContext();
  const [image, setImage] = useState(null);

  const imgURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    if (me?.photoURL) {
      setImage(me.photoURL);
    }
  }, [me]);

  return (
    <View alignItems="center" top={"-$1/3"}>
      <Avatar bgColor="$amber600" size="xl" borderRadius="$full" mb={20}>
        <AvatarFallbackText>{me?.displayName}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: image || imgURL,
          }}
          alt="Profile_Image"
        />
      </Avatar>
      <Text
        fontFamily="Poppins_600SemiBold"
        color={"#006EE9"}
        fontSize={20}
        lineHeight={25}
      >
        {me?.displayName || "Anonymous"}
      </Text>
      <View flexDirection="row" gap={5} alignItems="center">
        <BagIcon />
        <Text fontFamily="Poppins_400Regular" color={"#000"} fontSize={10}>
          2653 tarefas concluídas
        </Text>
      </View>
    </View>
  );
}

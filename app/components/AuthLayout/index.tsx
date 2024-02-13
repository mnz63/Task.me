import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, View } from "@gluestack-ui/themed";
import BackButton from "../BackButton";
import { StyleProp, ViewProps, ViewStyle } from "react-native";

type Props = {
  children?: any;
  hasBackButton?: boolean;
  onPressBack?: () => void;
  props?: ViewProps;
};

export default function AuthLayout({
  children,
  hasBackButton,
  onPressBack,
  props,
}: Props) {
  return (
    <SafeAreaView>
      <VStack
        height={"100%"}
        {...props}
        paddingHorizontal={"$4"}
        bgColor="#FFF"
      >
        <View mt={"$5"} w={"100%"} h={40}>
          {hasBackButton && (
            <BackButton
              props={{
                onPress: () => onPressBack(),
              }}
            />
          )}
        </View>
        {children}
      </VStack>
    </SafeAreaView>
  );
}

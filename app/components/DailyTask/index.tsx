import { memo, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  CircleIcon,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  Text,
  View,
} from "@gluestack-ui/themed";

type Props = {
  completed?: boolean;
  taskName?: string;
  disableRadio?: boolean;
  onPress?: () => void;
};

export const DailyTask = memo(
  ({ completed, taskName, disableRadio, onPress }: Props) => {
    const [value, setValue] = useState("completed");

    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#006de922",
        }}
        onPress={onPress}
      >
        <View
          h={"100%"}
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          py={10}
          px={15}
        >
          <Text
            fontFamily="Poppins_500Medium"
            color={completed ? "#006EE9" : "#4A4646"}
            fontSize={14}
          >
            Ir à academia
          </Text>
          {!disableRadio && (
            <RadioGroup>
              <Radio
                value="completed"
                size="md"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} size="xs" />
                </RadioIndicator>
              </Radio>
            </RadioGroup>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

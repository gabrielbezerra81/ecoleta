import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface ArrowProps {
  color?: string;
  size?: number;
}

const GoBackArrow = (props: ArrowProps) => {
  const navigation = useNavigation();

  let { color, size } = props;
  color ? color : "#000";
  size ? size : 20;

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={handleNavigateBack}>
      <Icon name="arrow-left" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default GoBackArrow;

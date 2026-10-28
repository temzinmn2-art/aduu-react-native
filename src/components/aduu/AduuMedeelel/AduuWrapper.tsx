import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface AduuWrapperProps {
  initialX: number;
  initialY: number;
  children: React.ReactNode;
}

export default function AduuWrapper({
  initialX,
  initialY,
  children,
}: AduuWrapperProps) {
  return(
    <Animated.View
        style={[styles.wrapper,
            {left: initialX, top: initialY}
        ]}
    >
        {children}
    </Animated.View>
  );
}

const styles= StyleSheet.create({
    wrapper:{
        position: "absolute",
    },
});
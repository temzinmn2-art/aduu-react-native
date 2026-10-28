import AduuWrapper from "@/components/aduu/AduuMedeelel/AduuWrapper";
import Header from "@/components/aduu/Header";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import AduuMedeelelCard from "../components/aduu/AduuMedeelel/AduuMedeelelCard";
import { Colors } from "../constants/theme";

const ADUU_DATA = [
  { id: 101, zus: "Хөх", nas: "Даага", ezen: "Дорж", azargaId: 1, image: null, x: 150, y: 200 },
  { id: 102, zus: "Зээрд", nas: "Шүдлэн", ezen: "Бат", azargaId: 1, image: null, x: 700, y: 350 },
  { id: 103, zus: "Хүрнен", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 350, y: 800 },
  { id: 104, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 1100, y: 500 },
  { id: 105, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 200, y: 1300 },
  { id: 106, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 850, y: 1050 },
];

export default function AduuMedeelelHuudas() {
  const { id } = useLocalSearchParams();
  const shuugdsenAduu = ADUU_DATA.filter((item) => item.azargaId === Number(id));

  // Хуруугаараа чирж хөдөлгөх координат хадгалах утгууд
  //Одоогийн байрлал
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // Хуучин байрлал
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  // Zoom (Томролт)-ын хэмжээ хадгалах утга
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // 1. Чирч хөдөлгөх хөдөлгөөн (Pan)
  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = contextX.value + event.translationX;
      translateY.value = contextY.value + event.translationY;
    });

  // 2. Чимхэж томруулж, жижигсгэх хөдөлгөөн (Pinch)
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      // Хэтэрхий жижиг эсвэл хэтэрхий том болгохгүй байх хязгаар (0.4-өөс 3 дахин томруулах)
      const nextScale = savedScale.value * event.scale;
      if (nextScale >= 0.4 && nextScale <= 3) {
        scale.value = nextScale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // Хоёр хөдөлгөөнийг зэрэг ажиллуулахаар нэгтгэнэ
  const combinedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  // Бүхэл талбарыг (Canvas) хөдөлгөх стил
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.outerContainer}>
        <Header />
        
        {/* Хөдөлгөөнүүдийг мэдрэгч хайрцаг */}
        <GestureDetector gesture={combinedGesture}>
          <View style={styles.viewPort}>
            {/* Хөдөлж буй үндсэн Canvas */}
            <Animated.View style={[styles.canvas, animatedStyle]}>
              {shuugdsenAduu.map((item) => (
                <AduuWrapper key={item.id} initialX={item.x} initialY={item.y}>
                  <AduuMedeelelCard
                    id={item.id}
                    zus={item.zus}
                    nas={item.nas}
                    nasniitoo={null}
                    tailbar={null}
                    ezen={item.ezen}
                    imageUri={item.image}
                    azargaId={item.azargaId}
                  />
                </AduuWrapper>
              ))}
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.aduuColor.background,
  },
  viewPort: {
    flex: 1,
    overflow: "hidden", // Хальсан картуудыг дэлгэцнээс гадуур нуух
  },
  canvas: {
    width: 3000,
    height: 3000,
    backgroundColor: "rgba(0,0,0,0.02)", // Талбарын хэмжээг харахын тулд бага зэрэг сүүдэр өгөв
    position: "relative",
  },
});




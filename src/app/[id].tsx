import AduuWrapper from "@/components/aduu/AduuMedeelel/AduuWrapper";
import Header from "@/components/aduu/Header";
import { useLocalSearchParams } from "expo-router";
import { memo, useRef } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AduuMedeelelCard from "../components/aduu/AduuMedeelel/AduuMedeelelCard";

const CANVAS_SIZE = 3000;
const MAX_ZOOM = 3;
const GRID_STEP = 100; // жижиг зураасны зай
const GRID_MAJOR = 500; // тодорхой зураасны зай

const clamp = (val: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(val, min), max);
};

// Координатын тор. memo тул zoom/pan үед дахин зурагдахгүй.
const Grid = memo(function Grid() {
  const lines = [];
  for (let p = 0; p <= CANVAS_SIZE; p += GRID_STEP) {
    const major = p % GRID_MAJOR === 0;
    const style = major ? styles.gridMajor : styles.gridMinor;
    lines.push(
      <View key={`v${p}`} style={[styles.vLine, style, { left: p }]} />,
      <View key={`h${p}`} style={[styles.hLine, style, { top: p }]} />,
    );
  }
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {lines}
    </View>
  );
});

const ADUU_DATA = [
  {
    id: 101,
    zus: "Хөх",
    nas: "Даага",
    ezen: "Дорж",
    azargaId: 1,
    image: null,
    x: 150,
    y: 200,
  },
  {
    id: 102,
    zus: "Зээрд",
    nas: "Шүдлэн",
    ezen: "Бат",
    azargaId: 1,
    image: null,
    x: 700,
    y: 350,
  },
  {
    id: 103,
    zus: "Хүрнен",
    nas: "Азарга",
    ezen: "Дорж",
    azargaId: 1,
    image: null,
    x: 350,
    y: 800,
  },
  {
    id: 104,
    zus: "Хүрэн",
    nas: "Азарга",
    ezen: "Дорж",
    azargaId: 1,
    image: null,
    x: 1100,
    y: 500,
  },
  {
    id: 105,
    zus: "Хүрэн",
    nas: "Азарга",
    ezen: "Дорж",
    azargaId: 1,
    image: null,
    x: 200,
    y: 1300,
  },
  {
    id: 106,
    zus: "Хүрэн",
    nas: "Азарга",
    ezen: "Дорж",
    azargaId: 1,
    image: null,
    x: 850,
    y: 1050,
  },
];

export default function AduuMedeelelHuudas() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = insets.top + 51; // 50 өндөр + 1 border

  const shuugdsenAduu = ADUU_DATA.filter(
    (item) => item.azargaId === Number(id),
  );

  // Харагдах талбарын бодит хэмжээ
  const viewW = useSharedValue(0);
  const viewH = useSharedValue(0);
  const minScale = useSharedValue(0.1);

  // Canvas-ийн байдал
  const scale = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  // Чирэх: өмнөх translation-ий утга
  const lastPanX = useSharedValue(0);
  const lastPanY = useSharedValue(0);

  // Томруулах эхлэл
  const isPinching = useSharedValue(false);
  const pinchStartScale = useSharedValue(1);
  const pinchStartX = useSharedValue(0);
  const pinchStartY = useSharedValue(0);
  const focalStartX = useSharedValue(0);
  const focalStartY = useSharedValue(0);

  const initialized = useRef(false);

  const onViewLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    viewW.value = width;
    viewH.value = height;

    const min = Math.max(width, height) / CANVAS_SIZE;
    minScale.value = min;

    const s = initialized.current
      ? clamp(scale.value, min, Math.max(MAX_ZOOM, min))
      : min;
    initialized.current = true;

    scale.value = s;
    tx.value = clamp(tx.value, width - CANVAS_SIZE * s, 0);
    ty.value = clamp(ty.value, height - CANVAS_SIZE * s, 0);
  };

  // Нэг хуруугаар чирэх: өмнөх шинэчлэлээс хойших зөрүүгээр хөдөлнө
  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      lastPanX.value = 0;
      lastPanY.value = 0;
    })
    .onUpdate((e) => {
      const dx = e.translationX - lastPanX.value;
      const dy = e.translationY - lastPanY.value;
      lastPanX.value = e.translationX;
      lastPanY.value = e.translationY;

      if (isPinching.value) return;

      const s = scale.value;
      tx.value = clamp(tx.value + dx, viewW.value - CANVAS_SIZE * s, 0);
      ty.value = clamp(ty.value + dy, viewH.value - CANVAS_SIZE * s, 0);
    });

  // Хоёр хуруугаар томруулах
  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      isPinching.value = true;
      pinchStartScale.value = scale.value;
      pinchStartX.value = tx.value;
      pinchStartY.value = ty.value;
      focalStartX.value = e.focalX;
      focalStartY.value = e.focalY;
    })
    .onUpdate((e) => {
      // Нэг хуруу үлдсэн бол төв цэг үсэрдэг тул алгасна
      if (e.numberOfPointers < 2) return;

      const s = clamp(
        pinchStartScale.value * e.scale,
        minScale.value,
        Math.max(MAX_ZOOM, minScale.value),
      );
      const ratio = s / pinchStartScale.value;

      // Хуруунуудын доорх цэг байрандаа үлдэнэ
      const nx = e.focalX - (focalStartX.value - pinchStartX.value) * ratio;
      const ny = e.focalY - (focalStartY.value - pinchStartY.value) * ratio;

      scale.value = s;
      tx.value = clamp(nx, viewW.value - CANVAS_SIZE * s, 0);
      ty.value = clamp(ny, viewH.value - CANVAS_SIZE * s, 0);
    })
    .onFinalize(() => {
      isPinching.value = false;
    });

  const combinedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.outerContainer}>
        <Header />

        <GestureDetector gesture={combinedGesture}>
          <View
            style={[styles.viewPort, { marginTop: HEADER_HEIGHT }]}
            onLayout={onViewLayout}
          >
            <Animated.View style={[styles.canvas, animatedStyle]}>
              <Grid />
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
  outerContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  viewPort: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#F0F2F5",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: "#FFFFFF",
    transformOrigin: "top left",
    borderWidth: 5,
    borderColor: "#007AFF",
  },
  // Торны зураас
  vLine: { position: "absolute", top: 0, width: 1, height: CANVAS_SIZE },
  hLine: { position: "absolute", left: 0, height: 1, width: CANVAS_SIZE },
  gridMinor: { backgroundColor: "#E6E8EB" },
  gridMajor: { backgroundColor: "#C3C8CF" },
});

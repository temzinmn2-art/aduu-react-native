import Header from "@/components/aduu/Header";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import AduuMedeelel from "../components/aduu/AduuMedeelel";
import { Colors } from "../constants/theme";

const ADUU_DATA = [
  // 1. Бүх адууны azargaId-ийг туршиж үзэхийн тулд 1 болгов (Хэрэв өмнөх хуудаснаас id: 1-ийг дарж орж ирвэл эдгээр адуунууд талбар дээр тархаж харагдана)
  // 2. Объект болгонд x болон y координатыг хатуу тоогоор зааж өглөө.
  { id: 101, zus: "Хөх", nas: "Даага", ezen: "Дорж", azargaId: 1, image: null, x: 150, y: 200 },
  { id: 102, zus: "Зээрд", nas: "Шүдлэн", ezen: "Бат", azargaId: 1, image: null, x: 700, y: 350 },
  { id: 103, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 350, y: 800 },
  { id: 104, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 1100, y: 500 },
  { id: 105, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 200, y: 1300 },
  { id: 106, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 1, image: null, x: 850, y: 1050 },
];


export default function AduuMedeelelHuudas() {
  const { id } = useLocalSearchParams();
  const shuugdsenAduu = ADUU_DATA.filter(
    (item) => item.azargaId === Number(id),
  );
  return (
    <View style={styles.outerScroll}>
      <Header />
      <ScrollView
        maximumZoomScale={3}
        minimumZoomScale={0.5}
        style={styles.innerScroll}
      >
        <ScrollView horizontal={true} style={styles.innerScroll}>
          <View style={styles.canvas}>
            {shuugdsenAduu.map((item) => (
                <View 
                key={item.id}
                style = {[styles.absoluteCardWrapper, { left: item.x, top: item.y } ]}>
                <AduuMedeelel
                    id={item.id}
                    zus={item.zus}
                    nas={item.nas}
                    nasniitoo={null}
                    tailbar={null}
                    ezen={item.ezen}
                    imageUri={item.image}
                    azargaId={item.azargaId}
                />
                </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: 3000,
    height: 3000,
    position: "relative",
    paddingVertical: 110, 
    paddingHorizontal: 50,
  },
  outerScroll: {
    flex: 1,
    backgroundColor: Colors.aduuColor.background,
    position: "relative",
  },
  innerScroll: {
    flex: 1,
  },
  absoluteCardWrapper:{
    position: "absolute"
  },
});

import AzargaCard from "@/components/aduu/AzargaCard";
import Header from "@/components/aduu/Header";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "../constants/theme";

const JISHIEE_DATA = [
  { id: 1, zus: " Хөх азарганы сүрэг", image: null },
  { id: 2, zus: " Зээрд азарганы сүрэг", image: null },
  { id: 3, zus: " Хүрэн азарганы сүрэг", image: null },
  { id: 4, zus: " Хүрэн азарганы сүрэг", image: null },
  { id: 5, zus: " Хүрэн азарганы сүрэг", image: null },
  { id: 6, zus: " Хүрэн азарганы сүрэг", image: null },
  { id: 7, zus: " Хүрэн азарганы сүрэг", image: null },
];

export default function Homescreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        contentContainerStyle={styles.scrollContainer} 
        style={styles.flatListStyle} 
        data={JISHIEE_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AzargaCard
            id={item.id}
            zus={item.zus}
            imageUri={item.image}
            onPress={(clickedId) => router.push(`/${clickedId}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.aduuColor.background,
  },
  flatListStyle: {
    flex: 1, 
  },
  scrollContainer: {
    paddingTop: 90,
    paddingBottom: 60,
  },
});

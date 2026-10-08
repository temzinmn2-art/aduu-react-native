import AzargaCard from "@/components/aduu/AzargaCard";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Малын мэдээлэл</Text>
      </View>

      <FlatList
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
    marginTop: "8%",
    flex: 1,
    backgroundColor: "rgb(244, 241, 222)",
  },
  headerTitle: {
    backgroundColor: "rgb(212, 163, 115)",
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: "8%",
    marginBottom: "2%",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: "5%",
  },
});

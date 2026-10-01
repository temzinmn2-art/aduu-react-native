import AzargaCard from "@/components/aduu/AzargaCard";
import { FlatList, StyleSheet, Text, View } from "react-native";

const JISHIEE_DATA = [
  { id: "1", ner: " Хөх азарганы сүрэг", image: null },
  { id: "2", ner: " Зээрд азарганы сүрэг", image: null },
  { id: "3", ner: " Хүрэн азарганы сүрэг", image: null },
  { id: "4", ner: " Хүрэн азарганы сүрэг", image: null },
  { id: "5", ner: " Хүрэн азарганы сүрэг", image: null },
  { id: "6", ner: " Хүрэн азарганы сүрэг", image: null },
  { id: "7", ner: " Хүрэн азарганы сүрэг", image: null },
];
export default function Homescreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Малын мэдээлэл</Text>
      </View>

      <FlatList
        data={JISHIEE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AzargaCard
            ner={item.ner}
            imageUri={item.image}
            onPress={() => console.log(item.ner + " Дарагдлаа")}
          />
        )}
        style={{ flex: 1 }}
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

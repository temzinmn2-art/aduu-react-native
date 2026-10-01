import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import AzargaCard  from "@/components/aduu/AzargaCard";


const JISHIEE_DATA = [
  { id: "1", ner: " Хөх азарганы сүрэг", image: null },
  { id: "2", ner: " Зээрд азарганы сүрэг", image: null },
  { id: "3", ner: " Хүрэн азарганы сүрэг", image: null },
];
export default function Homescreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Малын мэдээлэл</Text>

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
        style = {{flex: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  headerTitle: {
    backgroundColor:"yellow",
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingTop: 60,
    marginBottom : "2%",
  },

});

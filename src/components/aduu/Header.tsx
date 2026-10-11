import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Малын мэдээлэл</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.aduuColor.headerbackground,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0, 
    zIndex: 10,
  },
  headerTitle: {
    height: 50,
    justifyContent: "center",
    padding: 0,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: "5%",
  },
});

import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  // Адууны мэдээллийн жишээ өгөгдөл (State)
  const [selectedAduu, setSelectedAduu] = useState("Хурдан Хээр");

  const aduuList = [
    {
      id: 1,
      name: "Хурдан Хээр",
      age: "Соёолон",
      zus: "Хээр",
      tamga: "👑 Тэнгэр тамга",
    },
    {
      id: 2,
      name: "Жороо Цагаан",
      age: "Хавчиг",
      zus: "Цагаан",
      tamga: "🌙 Сар тамга",
    },
    {
      id: 3,
      name: "Догшин Хар",
      age: "Хязаалан",
      zus: "Хар",
      tamga: "⚡ Цахилгаан тамга",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Толгой хэсэг */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/aduu.png")}
          style={{ width: 50, height: 50, marginBottom: 10 }}
        />
        <Text style={styles.headerTitle}>🐎 АДУУ МАЛЫН БҮРТГЭЛ</Text>
        <Text style={styles.headerSubtitle}>Миний Хувийн Сүрэг</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Жишээ Адууны Зураг харуулах хэсэг */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: "https://unsplash.com" }}
            style={styles.aduuImage}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedAduu}</Text>
          </View>
        </View>

        {/* Сүргийн жагсаалт */}
        <Text style={styles.sectionTitle}>Бүртгэлтэй адуунууд:</Text>

        {aduuList.map((aduu) => (
          <TouchableOpacity
            key={aduu.id}
            style={[
              styles.aduuCard,
              selectedAduu === aduu.name && styles.selectedCard,
            ]}
            onPress={() => setSelectedAduu(aduu.name)}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.aduuName}>
                {aduu.name} ({aduu.age})
              </Text>
              <Text style={styles.aduuDetails}>
                Зүс: {aduu.zus} | Тамга: {aduu.tamga}
              </Text>
            </View>
            <Text style={styles.arrow}>❯</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Доод хэсэг */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Aduu React Native Project</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#1a2a3a",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#a0aec0",
    marginTop: 5,
  },
  content: {
    padding: 15,
  },
  imageCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 20,
  },
  aduuImage: {
    width: "100%",
    height: 200,
  },
  badge: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: "rgba(26, 42, 58, 0.85)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 10,
    paddingLeft: 5,
  },
  aduuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 1,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#3182ce",
    backgroundColor: "#ebf8ff",
  },
  cardInfo: {
    flex: 1,
  },
  aduuName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3748",
  },
  aduuDetails: {
    fontSize: 13,
    color: "#718096",
    marginTop: 4,
  },
  arrow: {
    fontSize: 16,
    color: "#cbd5e0",
    paddingLeft: 10,
  },
  footer: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#edf2f7",
  },
  footerText: {
    fontSize: 12,
    color: "#a0aec0",
  },
});

import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/theme";

interface AduuMedeelelCardProps {
  id: number;
  zus: string;
  nas: string;
  nasniitoo: number | null;
  tailbar: string | null;
  ezen: string;
  azargaId: number | null;
  imageUri: string | null;
}

export default function AduuMedeelelCard({
  id,
  zus,
  nas,
  nasniitoo,
  tailbar,
  ezen,
  azargaId,
  imageUri,
}: AduuMedeelelCardProps) {
  return (
    <View style={styles.container}>
      <View>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <>
            <View style={[styles.image, styles.placeholder]}>
              <Text style={styles.hoosontext}>Зураг байхгүй байна</Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Зүс:</Text>
          <Text style={styles.value}>{zus}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Нас:</Text>
          <Text style={styles.value}>{nas}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Насны тоо:</Text>
          <Text style={styles.value}>{nasniitoo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Эзэн:</Text>
          <Text style={styles.value}>{ezen}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Тайлбар:</Text>
          <Text style={[styles.value, styles.valueTailbar]}>{tailbar}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 350,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "rgba(148, 166, 132, 0.57)",
    padding: 10,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 1)",
  },

  image: {},

  placeholder: {},

  hoosontext: {},

  innerContainer: {
    flex: 1,
  },

  infoRow: {
    flexDirection: "row",
  },

  label: {
    fontWeight: "bold",
  },

  value: {
    borderWidth: 1,
    padding: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 3,
    marginTop: 3,
    fontSize: 12,
    backgroundColor: Colors.aduuColor.background,
    borderRadius: 8,
  },
  valueTailbar: {
    borderWidth: 1,
    width: 115,
    height: 45,
    marginLeft: 5,
  },
});

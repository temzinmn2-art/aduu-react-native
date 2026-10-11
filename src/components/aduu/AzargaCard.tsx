import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useRouter} from 'expo-router';
import { Colors } from "../../constants/theme";

// Үндсэн дэлгэц дээрх азарганы мэдээллийг харуулах component. Component дээр дарахад тухайн азарганы сүргийн мэдээллийг харуулах хуудас руу шилжинэ.

interface AzargaCardProps {
  id: number,
  zus: string;
  imageUri: string | null; // зургийн зам Uri
  onPress: (id: number) => void; // карт дээр дарахад ажиллах функц
}

export default function AzargaCard({
  id,
  zus,
  imageUri,
  onPress,
}: AzargaCardProps) {

  return (
    <TouchableOpacity style={styles.cardContainer} 
    onPress={() => onPress(id)}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <>
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.hoosontext}>Зураг байхгүй байна</Text>
          </View>
        </>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{zus}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.aduuColor.cardBg,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    width: "88%",
    marginTop: 10,
    marginLeft: "3%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: Colors.aduuColor.imgBg,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  hoosontext: {
    fontWeight: "bold",
    fontSize: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 15,
    flexShrink: 1,
  },
});

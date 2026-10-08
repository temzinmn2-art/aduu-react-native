import {View, Text, StyleSheet, FlatList, ScrollView} from "react-native";
import AduuMedeelel from "../components/aduu/AduuMedeelel";
import { useLocalSearchParams} from "expo-router";


const ADUU_DATA = [
  { id: 101,  zus: "Хөх", nas: "Даага", ezen: "Дорж", azargaId: 1 },
  { id: 102,  zus: "Зээрд", nas: "Шүдлэн", ezen: "Бат", azargaId: 2 },
  { id: 103, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 3 },
  { id: 104, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 3 },
  { id: 105, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 3 },
  { id: 106, zus: "Хүрэн", nas: "Азарга", ezen: "Дорж", azargaId: 3 },
];

export default function AduuMedeelelHuudas () {
    const {id} = useLocalSearchParams();
    const shuugdsenAduu = ADUU_DATA.filter(item =>item.azargaId === Number(id));
    return(
        <ScrollView maximumZoomScale={3} minimumZoomScale={0.5} style = {styles.outerScroll}>
            <ScrollView horizontal={true} style = {styles.innerScroll}>
                <View style = {styles.canvas}>
                    {shuugdsenAduu.map ((item, index) =>(
                        <AduuMedeelel
                            key = {item.id}
                            id = {item.id}
                            zus = {item.zus}
                            nas = {item.nas}
                            nasniitoo={null}
                            tailbar={null}
                            ezen = {item.ezen}
                            azargaId = {item.azargaId}
                        />
                    )
                    )} 
                </View>
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    canvas: {
        width: 2000,
        height: 2000,
        position: "relative",
    },
    outerScroll: {
        flex: 1,
        backgroundColor: "rgba(200,200,200, 1)",
    },
    innerScroll: {
        flex: 1,
    }
})
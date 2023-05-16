import { View, Text, Image, StyleSheet,ScrollView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from "react";
import globalStyles from "../../utils/globalStyles";

export default function CardProfilContainer (props) {

return(
<View  style={styles.container} > 
    <View style={styles.content}>
        <Image source={{ uri: props.data }} style={styles.image} />
    </View>
    <View style={styles.cardText}>
        <View style={styles.iconContainer}>
            <FontAwesome name='user' size={20} color='#ffffff' />
            <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>Jane</Text>
        </View>
        <View style={styles.iconContainer}>
            <FontAwesome name='map-marker' size={20} color='#ffffff' />
            <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>Paris</Text>
        </View>
        <View style={styles.iconContainer}>
            <FontAwesome name='id-card' size={20} color='#ffffff' />
            <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>25 Woman </Text>
        </View>
    </View>
</View>
)

    
};

const styles = StyleSheet.create({
      
      container: {
        width:'50%',
        // alignContent: "center",
        padding:5,

      },
    content:{
        justifyContent:'space-around'
    },

    image:{
        width: '100%',
        aspectRatio: 1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
    },
   
    cardText: {
        backgroundColor: '#3B485E',
        width: '100%',
        height: '17%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
      
    },
    iconContainer: {
      flexDirection: 'row',
    },
})
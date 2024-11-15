import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '@/constants/Colors';
import { plateformMobile } from '@/constants/Helper';

const TranscriptView = ({ item, highlightPhrase }: TranscriptProp) => {
    const isHighlight = highlightPhrase?.phrase?.words == item?.phrase?.words

    return (
        <View style={[styles.container, plateformMobile && styles.shadow,]}>
            <View style={[styles.view, isHighlight && styles.viewHighlight]}>
                <Text style={[styles.header, isHighlight && styles.highlight]}>{item.name}</Text>
                <View style={styles.row}>
                    <Text style={isHighlight ? styles.highlight : styles.normal}>{item.phrase?.words}</Text>
                </View>
            </View>
        </View>
    )
}

export default TranscriptView

const styles = StyleSheet.create({
    container: {
        width: "100%", alignItems: "center"
    },
    viewHighlight: { backgroundColor: Colors.primary, elevation: 2 },
    shadow: { shadowColor: Colors.primary, shadowOpacity: 0.3, shadowRadius: 2.0, shadowOffset: { width: 0.5, height: 0.5 } },
    view: { width: "90%", backgroundColor: "white", padding: 10, paddingLeft: plateformMobile ? 15 : 20, borderRadius: 10 },
    row: { alignItems: "center", justifyContent: "space-between", flexDirection: "row" },
    header: { fontWeight: "600", fontSize: 14 },
    normal: { color: Colors.secondory, fontWeight: "400", fontSize: 14 },
    highlight: { color: Colors.textLight, fontWeight: "600" }
});
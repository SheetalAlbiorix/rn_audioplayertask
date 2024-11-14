import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { formatTime, plateformMobile } from '@/constants/Helper';

const TranscriptView = ({ item, highlightPhrase }: any) => {
    const isHighlight = highlightPhrase?.phrase?.words == item?.phrase?.words

    return (
        <View style={[styles.container, plateformMobile && styles.shadow]}>
            <View style={styles.view}>
                <Text style={styles.header}>{item.name}</Text>
                <View style={styles.row}>
                    <Text style={isHighlight ? styles.highlight : styles.normal}>{item.phrase?.words}</Text>
                    <Text style={isHighlight ? styles.highlight : styles.normal}>{formatTime(item.end_time)}</Text>
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
    shadow: { shadowColor: Colors.primary, shadowOpacity: 0.3, shadowRadius: 2.0, shadowOffset: { width: 0.5, height: 0.5 } },
    view: { width: "90%", backgroundColor: "white", marginBottom: 10, padding: 10, borderRadius: 10 },
    row: { alignItems: "center", justifyContent: "space-between", flexDirection: "row" },
    header: { fontWeight: "600" },
    normal: { color: Colors.secondory, fontWeight: "400" },
    highlight: { color: Colors.primary, fontWeight: "600" }
});
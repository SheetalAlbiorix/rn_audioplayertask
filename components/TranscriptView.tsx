import { View, Text } from 'react-native'
import React from 'react'

const TranscriptView = (item: any) => {
    console.log("data: ", item.item);

    return (
        <View style={{ width: "100%", alignItems: "center", shadowColor: "grey", shadowOpacity: 1.0, shadowRadius: 5.0, shadowOffset: { width: 2, height: 2 } }}>
            {item.item?.phrases?.length > 0 && item.item.phrases.map((element: any) => {
                return (
                    <View style={{ width: "90%", backgroundColor: "white", marginBottom: 10, padding: 10, borderRadius: 10 }}>
                        <Text>{item.item?.name}</Text>
                        <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                            <Text>{element?.words}</Text>
                            <Text>{element?.time}</Text>
                        </View>

                    </View>
                )
            })}
        </View>

    )
}

export default TranscriptView
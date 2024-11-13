import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import TranscriptView from '@/components/TranscriptView'
import { transcriptdata } from '@/constants/TranscriptJson'
import { Stack } from 'expo-router'
import AudioPlayerView from '@/components/AudioPlayerView'

const items = ["", "", "", "", "", ""]
const _layout = () => {
    const renderitem = (item: any) => {
        return <TranscriptView item={item.item} />
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Player' }} />

            <FlatList
                data={transcriptdata.speakers}
                style={{ flex: 1, marginTop: 10, paddingTop: 10 }}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}
                renderItem={renderitem}
            />
            <AudioPlayerView />
        </SafeAreaView>
    )
}

export default _layout
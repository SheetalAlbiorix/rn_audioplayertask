import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import TranscriptView from '@/components/TranscriptView'
import { currentTranscriptPhrase, transcriptArry } from '@/constants/TranscriptJson'
import { Stack } from 'expo-router'
import AudioPlayerView from '@/components/AudioPlayerView'

const _layout = () => {
    const [currentPhrase, setCurrentPhrase] = useState<any>(null);
    const [audioTotalTime, setAudioTotalTime] = useState(0);

    useEffect(() => {
        console.log("current phrase: ", currentPhrase);
    }, [currentPhrase])

    const renderitem = (item: any) => {
        return <TranscriptView item={item.item} highlightPhrase={currentPhrase} />
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'Player' }} />

            <FlatList
                data={transcriptArry()}
                style={styles.flatlist}
                showsVerticalScrollIndicator={false}
                renderItem={renderitem}
            />
            <AudioPlayerView
                setCurrentTime={(time: any) => {
                    const phrase = currentTranscriptPhrase(time)
                    setCurrentPhrase(phrase)
                }}
                setTotalTime={(time: any) => {
                    if (time != audioTotalTime) {
                        setAudioTotalTime(time)
                    }
                }}
                currentPhrase={currentPhrase}
            />
        </SafeAreaView>
    )
}

export default _layout

const styles = StyleSheet.create({
    flatlist: { flex: 1, marginTop: 10, paddingTop: 10 },
});
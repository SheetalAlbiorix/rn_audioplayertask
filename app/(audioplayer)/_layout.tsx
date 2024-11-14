import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import TranscriptView from '@/components/TranscriptView'
import { Stack } from 'expo-router'
import AudioPlayerView from '@/components/AudioPlayerView'
import { currentTranscriptPhrase, transcriptArry } from '@/constants/Common'

const _layout = () => {
    const [currentPhrase, setCurrentPhrase] = useState<any>(null);
    const [audioTotalTime, setAudioTotalTime] = useState(0);

    useEffect(() => {
        console.log("current phrase: ");
    }, [currentPhrase])

    /**
     * Speaker Text List item
     * @param item 
     * @returns 
     */
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
                contentContainerStyle={{ rowGap: 16 }}
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
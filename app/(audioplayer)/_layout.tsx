import React, { useState } from 'react'
import AudioPlayerView from '@/components/AudioPlayerView'
import TranscriptView from '@/components/TranscriptView'
import { currentTranscriptPhrase, transcriptArry } from '@/constants/Common'
import { Stack } from 'expo-router'
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet } from 'react-native'

const _layout = () => {
    const [currentPhrase, setCurrentPhrase] = useState<TranscriptPhrase>();
    const [audioTotalTime, setAudioTotalTime] = useState<number>(0);

    /**
     * Speaker Text List item
     * @param item 
     * @returns 
     */

    const renderitem = ({ item }: ListRenderItemInfo<TranscriptPhrase>) => {
        return <TranscriptView item={item} highlightPhrase={currentPhrase} />
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
                setCurrentTime={(time: number | undefined) => {
                    if (time != undefined) {
                        const phrase = currentTranscriptPhrase(time)
                        setCurrentPhrase(phrase)
                    }
                }}
                setTotalTime={(time: number | undefined) => {
                    if (time != undefined && time != audioTotalTime) {
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
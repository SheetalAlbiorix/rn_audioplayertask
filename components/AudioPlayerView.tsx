import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { nextTranscriptPhrase, preTranscriptPhrase, transcriptArry } from '@/constants/Common';
import { formatTime } from '@/constants/Helper';

type audioPlayerView = {
    setCurrentTime: (time: number | undefined) => void,
    setTotalTime: (time: number | undefined) => void,
    currentPhrase: TranscriptPhrase | undefined
}

export default function AudioPlayerView({ setCurrentTime, setTotalTime, currentPhrase }: audioPlayerView) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number | undefined>(0);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const loadAudio = useCallback(async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/audio/example_audio.mp3'),
            { shouldPlay: true }
        );

        setSound(sound);
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                setTotalTime(status.durationMillis);
                setCurrentTime(status.positionMillis);
                setPosition(status.positionMillis);
                setDuration(status.durationMillis);
                setIsPlaying(status.isPlaying);
            }
        });
    }, [setSound, setIsPlaying, setTotalTime, setCurrentTime, setPosition, setDuration]);

    const playPauseAudio = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        } else {
            loadAudio();
        }
    };

    const skipForward = async () => {
        let phrase
        if (currentPhrase !== null && currentPhrase !== undefined) {
            phrase = nextTranscriptPhrase(currentPhrase.index)
        } else if (position == 0 && transcriptArry().length > 0) {
            phrase = nextTranscriptPhrase(transcriptArry()[0].index)
        }

        if (phrase?.end_time != null) {
            await sound?.setPositionAsync(phrase.end_time - phrase.phrase.time);
        } else if (phrase == undefined && currentPhrase?.index != null) {
            let isLastPhrase = transcriptArry()[transcriptArry().length - 1].index == currentPhrase?.index
            await sound?.setPositionAsync(isLastPhrase ? duration ?? 0 : position)
        }
    };

    const rewind = async () => {
        let phrase
        if (currentPhrase !== null && currentPhrase !== undefined) {
            phrase = preTranscriptPhrase(currentPhrase.index)

        } else if (position == duration && transcriptArry().length > 0) {
            phrase = preTranscriptPhrase(transcriptArry()[transcriptArry().length - 1].index)
        }

        if (phrase?.end_time != null) {
            await sound?.setPositionAsync(phrase?.index == 1 ? 0 : phrase.end_time - phrase.phrase.time);
        }
    };

    const onSliderValueChange = async (value: number) => {
        if (sound) {
            const newPosition = value * (duration ?? 0);
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                value={position / (duration ?? 0)}
                onValueChange={onSliderValueChange}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.secondory}
                thumbTintColor={Colors.primary}
            />
            <View style={styles.sliderContainer}>
                <Text>{formatTime(position)}</Text>
                <Text>{formatTime(duration ?? 0)}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={rewind} disabled={position < 0.5}>
                    <Ionicons name="play-back-outline" size={36} color={position < 0.5 ? Colors.gray : Colors.black} />
                </TouchableOpacity>

                <TouchableOpacity onPress={playPauseAudio}>
                    <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={48} color={Colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipForward} disabled={position == duration}>
                    <Ionicons name="play-forward-outline" size={36} color={position == duration ? Colors.gray : Colors.black} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
    },
    sliderContainer: { width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    slider: {
        width: '100%',
        height: 40,
        marginVertical: 10,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 20,
    },

});

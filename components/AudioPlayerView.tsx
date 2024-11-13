// AudioPlayerView.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function AudioPlayerView() {
    const [sound, setSound] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    useEffect(() => {
        loadAudio()
    }, [])

    const loadAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/audio/example_audio.mp3'),
            { shouldPlay: true }
        );
        setSound(sound);
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis);
                setIsPlaying(status.isPlaying);
            }
        });
    };

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
        if (sound) {
            const status = await sound.getStatusAsync();
            const nextPosition = status.positionMillis + 10000;
            await sound.setPositionAsync(nextPosition);
        }
    };

    const rewind = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            const prevPosition = Math.max(0, status.positionMillis - 10000);
            await sound.setPositionAsync(prevPosition);
        }
    };

    const onSliderValueChange = async (value) => {
        if (sound) {
            const newPosition = value * duration;
            await sound.setPositionAsync(newPosition);
            setPosition(newPosition);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Audio Player</Text>
            <Slider
                style={styles.slider}
                value={position / duration}
                onValueChange={onSliderValueChange}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor="#8B8B8B"
                thumbTintColor={Colors.primary}
            />
            <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{formatTime(position)}</Text>
                <Text>{formatTime(duration)}</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={rewind}>
                    <Ionicons name="play-back-outline" size={36} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={playPauseAudio}>
                    <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={48} color={Colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipForward}>
                    <Ionicons name="play-forward-outline" size={36} color="black" />
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

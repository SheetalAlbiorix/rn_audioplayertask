import { Platform } from "react-native";

/**
 * Time format from miliseconds to minutes and seconds
 * @param millis 
 * @returns 
 */
export const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

/**
 * Platform Type
 */
export const plateformMobile = (Platform.OS == "android" || Platform.OS == "ios")
export const plateformiOS = Platform.OS == "ios"
export const plateformAndroid = Platform.OS == "android"
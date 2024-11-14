import { transcriptdata } from "./TranscriptJson";

/**
 * Get max index of speaker object
 */
const maxPhrases = Math.max(...transcriptdata.speakers.map(speaker => speaker.phrases.length));

/**
 * Prepare Transcript Array
 * @returns 
 */
export const transcriptArry = () => {
    let groupedPhrases: TranscriptPhrase[] = [];
    let time = 0
    let index = 1
    for (let i = 0; i < maxPhrases; i++) {
        transcriptdata.speakers.forEach(speaker => {
            if (speaker.phrases[i]) {
                groupedPhrases.push({
                    name: speaker.name,
                    phrase: speaker.phrases[i],
                    end_time: time + speaker.phrases[i].time + transcriptdata.pause,
                    index: index
                });
                index++;
                time = time + speaker.phrases[i].time + transcriptdata.pause
            }
        });
    }

    return groupedPhrases
}

/**
 * Current Transcript Phrase
 * @param time 
 * @returns 
 */
export const currentTranscriptPhrase = (time: number) => {
    return transcriptArry().find(
        (item) => {
            return time >= (item?.end_time - item?.phrase?.time) && time < (item?.end_time)
        });
}

/**
 * Previous Transcript Phrase
 * @param index 
 * @returns 
 */
export const preTranscriptPhrase = (index: number) => {
    return transcriptArry().find(
        (item) => {
            return item.index == index - 1
        });
}

/**
 * Next Transcript Phrase
 * @param index 
 * @returns 
 */
export const nextTranscriptPhrase = (index: number) => {
    return transcriptArry().find(
        (item) => {
            return item.index == index + 1
        });
}
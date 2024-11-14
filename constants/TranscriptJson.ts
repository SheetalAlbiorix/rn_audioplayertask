export const transcriptdata = {
    "pause": 250,
    "speakers": [
        {
            "name": "John",
            "phrases": [
                {
                    "words": "this is one phrase.",
                    "time": 1474
                },
                {
                    "words": "now the second phrase.",
                    "time": 1667
                },
                {
                    "words": "end with last phrase.",
                    "time": 1214
                }
            ]
        },
        {
            "name": "Jack",
            "phrases": [
                {
                    "words": "another speaker here.",
                    "time": 1570
                },
                {
                    "words": "saying her second phrase.",
                    "time": 1989
                },
                {
                    "words": "and eventually finishing up.",
                    "time": 1486
                }
            ]
        }
    ]
}

// Determine the maximum number of phrases for any speaker
const maxPhrases = Math.max(...transcriptdata.speakers.map(speaker => speaker.phrases.length));
export const transcriptArry = () => {
    let groupedPhrases: { name: string; phrase: { words: string; time: number; }; end_time: number; index: number; }[] = [];

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

export const currentTranscriptPhrase = (time: any) => {
    return transcriptArry().find(
        (item) => {
            return time >= (item.end_time - item.phrase.time) && time < (item.end_time)
        });
}

export const preTranscriptPhrase = (phrase: any) => {
    return transcriptArry().find(
        (item) => {
            return item.index == phrase.index - 1
        });
}

export const nextTranscriptPhrase = (phrase: any) => {
    return transcriptArry().find(
        (item) => {
            return item.index == phrase.index + 1
        });
}


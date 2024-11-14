type Phrase = {
    time: number;
    words: string;
};

type TranscriptPhrase = {
    name: string,
    phrase: Phrase,
    end_time: number,
    index: number
};

type TranscriptProp = {
    item: TranscriptPhrase;
    highlightPhrase: TranscriptPhrase | undefined;
};
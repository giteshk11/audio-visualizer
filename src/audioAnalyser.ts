import excuses from '../assets/input.mp3';
import { AnalyserParams } from './types';

export function loadSong() {
    const audio = new Audio(excuses);
    return audio;
}

export function loadAudioContext(audio: HTMLAudioElement): AnalyserParams {
    const audioCtx = new AudioContext();

    const source = audioCtx.createMediaElementSource(audio);
    return { audioCtx, source };
}

export function setupAnalyser(params: AnalyserParams) {
    const { audioCtx, source } = params;
    const analyser = audioCtx.createAnalyser();
    analyser.connect(audioCtx.destination);
    source.connect(analyser);
    analyser.fftSize = 512;
    return analyser;
}

export function analyseAudio(analyser: AnalyserNode) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray[0]);
}

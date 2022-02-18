import excuses from '../assets/input.mp3';

export function loadSong() {
    const audio = new Audio(excuses);
    audio.autoplay = true;
    return audio;
}

const audio = loadSong();

const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 512;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

console.log(analyser.getByteFrequencyData(dataArray));

console.log(dataArray);

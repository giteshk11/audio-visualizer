import excuses from '../assets/input.mp3';

export function loadSong() {
    const audio = new Audio(excuses);
    audio.autoplay = true;
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();

    analyser.connect(audioCtx.destination);

    const source = audioCtx.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.fftSize = 512;

    return { audio, analyser };
}

export function analyseAudio(analyser: AnalyserNode) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    // const analyserFrequencyData = analyser.getByteFrequencyData(dataArray);
    console.log(dataArray);
}

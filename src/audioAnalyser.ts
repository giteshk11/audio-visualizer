import { AnalyserParams } from "./types";

export default class AudioAnalyser {
  private _audio;
  private _audioCtx!: AudioContext;
  private _source!: MediaElementAudioSourceNode;
  constructor(song: string) {
    this._audio = new Audio(song);
    this.loadAudioContext();
  }

  get audioCtx() {
    return this._audioCtx;
  }

  get audio() {
    return this._audio;
  }

  loadAudioContext() {
    if (this.audio) {
      this._audioCtx = new AudioContext();
      this._source = this.audioCtx.createMediaElementSource(this.audio);
    }
  }
  setupAnalyser(): AnalyserNode {
    let analyser!: AnalyserNode;
    if (this._audioCtx && this._source) {
      analyser = this.audioCtx.createAnalyser();
      analyser.connect(this.audioCtx.destination);
      this._source.connect(analyser);
      return analyser;
    }
    return analyser;
  }
  analyseAudio(analyser: AnalyserNode): Uint8Array {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

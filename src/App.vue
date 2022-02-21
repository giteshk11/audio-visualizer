<template>
  <Renderer
    ref="rendererC"
    antialias
    :orbit-ctrl="{ enableDamping: true }"
    resize="window"
  >
    <Camera :position="{ z: 10 }" />
    <Scene>
      <PointLight :position="{ y: 50, z: 50 }" :color="'red'" />
      <Box
        :size="2"
        ref="meshC"
        :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
        @click="startSong"
      >
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import AudioAnalyser from "./audioAnalyser";
  import {
    Box,
    Camera,
    LambertMaterial,
    MeshPublicInterface,
    PointLight,
    Renderer,
    RendererPublicInterface,
    Scene,
  } from "troisjs";
  import excuses from "../assets/input.mp3";

  const rendererC = ref();
  const meshC = ref();
  const isPlaying = ref(true);
  const audioAnalyser = new AudioAnalyser(excuses);
  const analyser = audioAnalyser.setupAnalyser();
  audioAnalyser.analyseAudio(analyser);

  onMounted(() => {
    const renderer = rendererC.value as RendererPublicInterface;
    const mesh = (meshC.value as MeshPublicInterface).mesh;
    renderer.onBeforeRender(() => {
      mesh!.rotation.x += 0.01;
      console.log(audioAnalyser.analyseAudio(analyser));
    });
  });

  async function startSong() {
    await audioAnalyser.audioCtx.resume();
    isPlaying.value ? audioAnalyser.audio.play() : audioAnalyser.audio.pause();
    isPlaying.value = !isPlaying.value;
  }
</script>

<style>
  body,
  html {
    margin: 0;
  }
  canvas {
    display: block;
  }
</style>

<template>
    <Renderer ref="rendererC" antialias :orbit-ctrl="{ enableDamping: true }" resize="window">
        <Camera :position="{ z: 10 }" />
        <Scene>
            <PointLight :position="{ y: 50, z: 50 }" :color="'red'" />
            <Box
                :size="2"
                ref="meshC"
                :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }"
                @click="startSong()"
            >
                <LambertMaterial />
            </Box>
        </Scene>
    </Renderer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadSong, analyseAudio, loadAudioContext, setupAnalyser } from './audioAnalyser';
import {
    Box,
    Camera,
    LambertMaterial,
    MeshPublicInterface,
    PointLight,
    Renderer,
    RendererPublicInterface,
    Scene,
} from 'troisjs';

const rendererC = ref();
const meshC = ref();
const audio = loadSong();
const { source, audioCtx } = loadAudioContext(audio);
const analyser = setupAnalyser({ source, audioCtx });
analyseAudio(analyser);
const isPlaying = ref(true);

onMounted(() => {
    const renderer = rendererC.value as RendererPublicInterface;
    const mesh = (meshC.value as MeshPublicInterface).mesh;
    renderer.onBeforeRender(() => {
        mesh!.rotation.x += 0.01;
        analyseAudio(analyser);
    });
});

async function startSong() {
    await audioCtx.resume();
    isPlaying.value ? audio.play() : audio.pause();
    isPlaying.value = !isPlaying.value;
}
</script>
xw

<style>
xw body,
html {
    margin: 0;
}
canvas {
    display: block;
}
</style>

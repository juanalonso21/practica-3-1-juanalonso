<script setup lang="ts">
import BrowserInfo from './components/BrowserInfo.vue';
import OnlineStatusIndicator from './components/OnlineStatusIndicator.vue';
import ProximityDetector from './components/ProximityDetector.vue';
import CopyToClipboard from './components/CopyToClipboard.vue';
</script>

<template>
    <BrowserInfo></BrowserInfo>
    <OnlineStatusIndicator></OnlineStatusIndicator>
    <ProximityDetector></ProximityDetector>
    <CopyToClipboard text-to-copy="¡Hola desde Objeto Navigator!"></CopyToClipboard>
    </template>
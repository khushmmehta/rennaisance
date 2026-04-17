<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas } from '@threlte/core';
	import { setScene } from '$lib/context';
	import HeroScene from '$lib/components/hero-scene.svelte';
	import CreationOfAdam from '$lib/assets/Creación_de_Adán.jpg?enhanced';
	import { PCFShadowMap } from 'three';

	let scene = $state({
		progress: 0
	});

	let heroTextHeight = $state(0);
	let viewport: VisualViewport;

	onMount(() => {
		viewport = window.visualViewport!;

		getHeroTextHeight();
		updateProgress();
	});

	function getHeroTextHeight() {
		heroTextHeight = document.getElementById('heroText')!.offsetHeight;
	}

	function updateProgress() {
		scene.progress = Math.min(scrollY / (viewport.height * 0.5), 1);
	}

	setScene(scene);
</script>

<svelte:window
	onscroll={updateProgress}
	onresize={() => {
		getHeroTextHeight();
		updateProgress();
	}}
/>

<div
	class="fixed z-20 flex w-screen items-center justify-center mix-blend-difference"
	style="top: calc(50dvh - {heroTextHeight * 0.5}px);"
>
	<h1
		id="heroText"
		class="text-center text-8xl select-none sm:text-9xl md:text-[12rem] xl:text-[16rem]"
	>
		Rennaisance.
	</h1>
</div>

<div
	class="fixed z-10 w-screen bg-black"
	style="height: 50dvh; bottom: {-scene.progress * 50}dvh;"
></div>

<div class="z-0 w-screen bg-black" style="height: 50dvh;"></div>

<div class="fixed top-0 z-15 h-dvh w-dvw">
	<Canvas shadows={PCFShadowMap}>
		<HeroScene />
	</Canvas>
</div>

<enhanced:img
	src={CreationOfAdam}
	alt="creation of adam"
	class="z-0 size-screen object-cover"
	sizes="min(4256px, 200vw)"
	fetchpriority="high"
	loading="eager"
/>

<script lang="ts">
	import { onMount } from 'svelte';
	import CreationOfAdam from '$lib/assets/Creación_de_Adán.jpg?enhanced';

	let progress = $state(0);
	let heroTextHeight = $state(0);

	onMount(() => {
		const vv = window.visualViewport!;

		const updateMetrics = () => {
			heroTextHeight = document.getElementById('heroText')!.offsetHeight;
			// Recalculate progress against the live viewport height
			const vh = vv.height ?? window.innerHeight;
			progress = Math.min(scrollY / (vh / 2), 1);
		};

		const onScroll = () => {
			const vh = vv.height ?? window.innerHeight;
			progress = Math.min(scrollY / (vh / 2), 1);
		};

		window.addEventListener('scroll', onScroll);
		// Fires continuously while the address bar is mid-transition
		vv.addEventListener('resize', updateMetrics);
		// Fallback for browsers without visualViewport
		window.addEventListener('resize', updateMetrics);

		updateMetrics();

		return () => {
			window.removeEventListener('scroll', onScroll);
			vv.removeEventListener('resize', updateMetrics);
			window.removeEventListener('resize', updateMetrics);
		};
	});
</script>

<div
	class="fixed z-20 flex w-screen items-center justify-center mix-blend-difference backdrop-invert"
	style="top: calc(50dvh - {heroTextHeight * 0.5}px);"
>
	<h1
		id="heroText"
		class="text-center text-8xl select-none sm:text-9xl md:text-[12rem] xl:text-[16rem]"
	>
		Rennaisance.
	</h1>
</div>

<div class="fixed z-10 w-screen bg-white" style="height: 50dvh; bottom: {-progress * 50}dvh;"></div>

<div class="z-0 w-screen bg-black" style="height: 50dvh;"></div>

<enhanced:img
	src={CreationOfAdam}
	alt="creation of adam"
	class="z-0 w-dvw object-cover"
	style="height: 100dvh;"
	sizes="min(4256px, 200vw)"
	fetchpriority="high"
	loading="eager"
/>

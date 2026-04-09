<script lang="ts">
	import { onMount } from 'svelte';
	import CreationOfAdam from '$lib/assets/Creación_de_Adán.jpg';

	let progress = $state(0);

	onMount(() => {
		const onScroll = () => {
			progress = Math.min(scrollY / (innerHeight / 2), 1);
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div
	class="fixed top-0 z-20 flex h-screen w-screen items-center justify-center mix-blend-difference backdrop-invert"
>
	<h1 class="text-center text-[16rem]">Rennaisance.</h1>
</div>

<div class="fixed z-10 h-[50vh] w-screen bg-black" style="top: {-progress * 50}vh"></div>
<div class="fixed z-10 h-[50vh] w-screen bg-white" style="top: {50 + progress * 50}vh"></div>

<div class="z-0 h-[50vh] w-screen bg-black"></div>
<enhanced:img
	src={CreationOfAdam}
	alt="creation of adam"
	class="z-0 h-screen w-screen object-cover"
/>

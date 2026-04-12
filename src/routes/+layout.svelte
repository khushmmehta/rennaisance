<script lang="ts">
	import './layout.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.avif';
	import leMurmure from '$lib/assets/fonts/le-murmure.woff2';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href={leMurmure} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}

<script lang="ts">
	import './layout.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import leMurmure from '$lib/assets/fonts/le-murmure.woff2';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" href={leMurmure} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>
{@render children()}

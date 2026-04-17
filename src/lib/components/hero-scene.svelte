<script lang="ts">
	import HandsModel from '$lib/components/3d/hands_model.svelte';
	import { T, useTask, useThrelte } from '@threlte/core';
	import { Fog } from 'three';
	import { onMount } from 'svelte';
	import { getScene } from '$lib/context';

	const { renderMode, scene, invalidate } = useThrelte();
	const heroScene = getScene();

	onMount(() => {
		renderMode.set('on-demand');
		scene.fog = new Fog(0x000000, 3.5, 4); // matches your near/far
		return () => {
			scene.fog = null;
		};
	});

	let rotationX = $state(0);
	let rotationY = $state(0);

	function handleMouseMove(event: MouseEvent) {
		// Normalize to -1 to 1, center = 0
		const nx = (event.clientX / window.innerWidth) * 2 - 1; // left = -1, right = 1
		const ny = (event.clientY / window.innerHeight) * 2 - 1; // top = -1, bottom = 1

		// Map to rotation range (adjust multipliers to taste)
		rotationY = nx * (Math.PI / 6); // ±30° horizontal
		rotationX = -ny * (Math.PI / 8); // ±22.5° vertical (inverted so up = tilt back)
	}

	useTask(
		() => {
			if (heroScene.progress < 0.3) {
				invalidate();
			} else {
				return;
			}
		},
		{ autoInvalidate: false }
	);
</script>

<svelte:window onmousemove={handleMouseMove} />

<T.PerspectiveCamera makeDefault position={[0, 0, 3.25]} fov={30} />

<T.PointLight
	intensity={1}
	decay={2}
	position={[0, -0.9, 0]}
	rotation={[Math.PI / 2, 0, -Math.PI]}
	color={[1, 0.9, 0.8]}
/>
<T.PointLight
	intensity={6}
	decay={2}
	position={[-1.6, 1.8, 1]}
	rotation={[-0.96, -Math.PI / 6, -0.62]}
	color={[1, 0.9, 0.8]}
	castShadow
	shadow.bias={-0.0006}
	shadow.camera.near={0.1}
	shadow.camera.far={5}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
/>
<T.PointLight
	intensity={6}
	decay={2}
	position={[1.3, 1.8, 1]}
	rotation={[-0.86, 0.36, 0.39]}
	color={[1, 0.9, 0.8]}
	castShadow
	shadow.bias={-0.0006}
	shadow.camera.near={0.1}
	shadow.camera.far={5}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
/>
<HandsModel rotation={[rotationX, rotationY, 0]} />

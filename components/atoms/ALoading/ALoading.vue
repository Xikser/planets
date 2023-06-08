<template>
	<div class="fixed z-50 inset-0 flex w-full md:pl-52 lg:pl-80 items-center justify-center">
		<div class="animate-spin rounded-full h-64 w-64 border-t-2 border-b-2 border-blue-500"></div>

		<div class="absolute text-2xl font-bold">Loading...</div>
	</div>
</template>

<style>
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.animate-spin {
	animation: spin 1s linear infinite;
}
</style>

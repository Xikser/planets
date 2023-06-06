<template>
	<div class="container container-custom-setup created">
		<nuxt-img
			format="webp"
			src="/logo.png"
			class="max-w-[600px] w-full"
		/>

		<h1>Created by: Daniel Wyskup</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: `ONavbar`,
    setup() {return {}},
});
</script>

<style lang="scss" scoped>
.created {
	@apply h-screen flex items-center justify-center relative;

	h1 {
		@apply text-2xl font-bold absolute bottom-[20px];
	}
}
</style>

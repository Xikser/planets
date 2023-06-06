<template>
	<main class="default-template">
		<o-navbar/>
		<slot/>
	</main>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted} from "vue";
import ONavbar from '@/components/organisms/ONavbar/ONavbar'
import ABox from '@/components/atoms/ABox/ABox'
import {useGlobalStore} from "../stores/global";
import {storeToRefs} from "pinia";

export default defineComponent({
	components: {ONavbar, ABox},
	setup() {
		const globalStore = useGlobalStore()
		const {setIsClient, setIsMobile, setIsTablet, setIsDesktop} = useGlobalStore()
		const {getIsClient} = storeToRefs(globalStore)

		const handleViewport = (): void => {
			setIsMobile()
			setIsTablet()
			setIsDesktop()
		}

		onMounted(() => {
			setIsClient()

			if (getIsClient.value) {
				handleViewport()

				window.addEventListener('resize', handleViewport, false)
			}
		})

		onUnmounted(() => {
			if (getIsClient.value) {
				window.removeEventListener('resize', handleViewport)
			}
		})

		return {}
	}
});
</script>

<style scoped lang="scss">
.default-template {
	@apply flex flex-col;
}
</style>

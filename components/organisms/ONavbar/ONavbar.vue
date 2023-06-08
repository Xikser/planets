<template>
	<div
		v-if="!showNavbar"
		class="hamburger"
		@click="navClick"
	>
		<a-icon
			icon="menu"
			:size="ESizes.M"
		/>
	</div>
	<nav
		class="o-navbar"
		:class="[{'active' : showNavbar}]"
		ref="navRef"
	>
		<div class="logo">
			<nuxt-img
				format="webp"
				src="/logo.png"
				class="w-16 h-16"
			/>
			<a-icon
				icon="close"
				:size="ESizes.M"
				class="close-icon"
				@click="navClick"
			/>
		</div>

		<ul class="nav-list">
			<li
				v-for="(item, index) in navData"
				:key="`${item.title}--${index}`"
				class="nav-item"
			>
				<router-link
					:to="item.href"
					class="nav-link"
				>
					<a-icon
						:icon="item.icon"
						:size="ESizes.M"
					/>

					<span v-html="item.title"/>
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, onUnmounted} from "vue";
import {navData} from './data';
import AIcon from '@/components/atoms/AIcon/AIcon';
import {storeToRefs} from "pinia";
import {useGlobalStore} from "@/stores/global";
import {ESizes} from "@/types";

export default defineComponent({
	name: `ONavbar`,
	components: {AIcon},
	setup() {
		const globalStore = useGlobalStore();
		const {getIsDesktop, getIsClient} = storeToRefs(globalStore);
		const navRef = ref(null)
		const showNavbar = ref(false);
		const navClick = (): void => {
			showNavbar.value = !showNavbar.value;
		};

		const handleClickOutside = (event) => {
			if (
				event.target.classList.contains('hamburger') ||
				event.target.classList.contains('a-icon') ||
				event.target.classList.contains('material-icons')
			) {
		        return
	        }

			if (navRef.value && !navRef.value.contains(event.target)) {
				showNavbar.value = false
			}
		}

		onMounted(() => {
			document.addEventListener('click', handleClickOutside)
		})

		onUnmounted(() => {
			document.removeEventListener('click', handleClickOutside)
		})

		return {
			navData,
			getIsDesktop,
			ESizes,
			showNavbar,
			navClick,
			navRef
		};
	},
});
</script>

<style scoped lang="scss">
.hamburger {
	@apply absolute text-white z-20 cursor-pointer;
	@apply md:hidden bg-gray-800 fixed rounded-md top-[16px] right-[16px];
	@apply text-gray-400;
}

.o-navbar {
	@apply
	h-0 w-0 p-0 h-screen fixed
	bg-gray-800 p-4 text-white z-[9999]
	transition-all ease-in-out duration-150;

	@apply h-screen w-6/12 min-w-[180px];
	@apply md:w-[180px] md:max-w-[180px];
	@apply lg:min-w-[280px] lg:w-[280px];
	@apply transform -translate-x-full md:translate-x-0;

	.logo {
		@apply flex items-start mb-6;
		.close-icon {
			@apply flex md:hidden ml-auto cursor-pointer;
			@apply text-gray-400;
		}
	}

	&.active {
		@apply transform translate-x-0;
	}
}

.nav {
	&-list {
		@apply pb-6;
		@apply flex flex-col gap-y-5 border-b border-solid border-gray-700;
	}

	&-item {
		@apply w-full text-center lg:text-left;

		&:hover, .router-link-exact-active {
			@apply bg-indigo-600 rounded-lg cursor-pointer text-white;
		}

		&:hover .nav-link {
			@apply text-white;
		}
	}

	&-link {
		@apply text-gray-400 text-xs md:text-sm;
		@apply flex flex-col items-center lg:flex-row;
		@apply px-2 lg:px-3 py-1.5 w-full;

		&:hover {
			@apply no-underline;
		}
	}
}
</style>

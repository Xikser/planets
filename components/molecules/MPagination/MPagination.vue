<template>
	<div class="pagination mx-auto flex items-center justify-center gap-x-5 relative">
		<a-btn
			icon="arrow_back_ios"
			class="prev-button absolute w-1/2 max-w-[47%] md:max-w-auto md:w-auto left-0 md:left-[-80px] top-[60px] md:top-0"
			:variant="prev ? EVariant.PRIMARY : EVariant.DISABLED"
			@click="prevPage"
		/>

		<ul class="pagination-list flex items-center gap-x-2">
			<li
				v-for="index in pages"
				:key="`page--${index}`"
				class="pagination-list-item"
			>
				<a-btn
					:text="index.toString()"
					class="pagination-button"
					:class="{'active' : currentIndex === index}"
					@click="changePage(index)"
				/>
			</li>
		</ul>

		<a-btn
			icon="arrow_forward_ios"
			class="next-button absolute right-0 max-w-[47%] md:max-w-auto w-1/2 md:w-auto md:right-[-80px] top-[60px] md:top-0"
			:variant="next ? EVariant.PRIMARY : EVariant.DISABLED"
			@click="nextPage"
		/>
	</div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRefs} from 'vue';
import ABtn from "@/components/atoms/ABtn/ABtn.vue";
import {EVariant} from "@/types";

export default defineComponent({
	name: "MPagination",
	computed: {
		EVariant() {
			return EVariant
		}
	},
	components: {ABtn},
	props: {
		pages: {
			type: Number as PropType<Number>,
			required: true
		},
		prev: {
			type: null as PropType<String | null>,
			required: false
		},
		next: {
			type: null as PropType<String | null>,
			required: false
		},
		current: {
			type: Number as PropType<Number>,
			required: true
		},
	},
	emits: [`updatePagination`],
	setup(props, {emit}) {
		const {pages, current} = toRefs(props)
		const currentIndex = ref(current.value)

		const prevPage = () => {
			if (currentIndex.value > 1) {
				currentIndex.value = currentIndex.value - 1
				emit('updatePagination', currentIndex.value)
			}
		}

		const nextPage = () => {
			if (currentIndex.value < pages.value) {
				currentIndex.value = currentIndex.value + 1
				emit('updatePagination', currentIndex.value)
			}
		}

		const changePage = (index) => {
			currentIndex.value = index
			emit('updatePagination', currentIndex.value)
		}

		return {changePage, prevPage, nextPage, currentIndex}
	}
})
</script>

<style scoped lang="scss">
.active {
	@apply bg-red-500;
}
</style>

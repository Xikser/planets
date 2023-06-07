<template>
	<div class="sort-box flex items-center justify-end w-full gap-x-4">
		<h3>Sortuj:</h3>

		<div class="min-w-[240px]">
			<a-select
				v-for="(item, index) in sortTypes"
				:key="`select-${index}`"
				v-model="selected"
				v-bind="item"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import ASelect from '@/components/atoms/ASelect/ASelect'
import {defineComponent, onMounted, PropType, ref, watch} from "vue";
import {ISortConfig} from "../../../interfaces";

export default defineComponent({
	name: 'SortItems',
	components: {
		ASelect
	},
	props: {
		sortTypes: {
			type: Object as PropType<ISortConfig>,
			required: true
		}
	},
	emits: ['sortChanged'],
	setup(props, { emit }) {
		const selected = ref(localStorage.getItem('sortOption') || '')

		watch(selected, (newOption: any) => {
			localStorage.setItem('sortOption', newOption)
			emit('sortChanged', newOption)
		})

		return {
			selected
		}
	}
})
</script>

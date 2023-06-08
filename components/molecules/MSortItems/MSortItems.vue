<template>
	<div class="sort-box flex items-center justify-end w-full gap-x-4">
		<!--		{{ items }}-->

		<h3>Sort by:</h3>

		<div class="min-w-[260px]">
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
import {computed, defineComponent, ref, watch, toRefs, reactive} from "vue";
import {useGlobalStore} from "../../../stores/global";
import {storeToRefs} from "pinia";
import {ESortType} from "../../../types";
import useUtils from "../../../utils/useUtils";

export default defineComponent({
	name: 'SortItems',
	components: {
		ASelect
	},
	props: {
		sortTypes: {
			type: Object,
			required: true
		},
		items: {
			type: undefined,
			required: true
		}
	},
	emits: ['updateSortItems'],
	setup(props, {emit}) {
		const {items} = toRefs(props)
		const selected = ref(localStorage.getItem('sortOption') || '')
		const globalStore = useGlobalStore()
		const {getIsClient} = storeToRefs(globalStore)
		const sortOption = ref(ESortType);
		const {sortBy} = useUtils<{ name: string; rotation: number }>();

		watch(selected, (newOption: any) => {
			if (getIsClient) {
				localStorage.setItem('sortOption', newOption)
			}

			updateSortOption(newOption)
		})

		const sortedItems = computed(() => {
			const sortKeys = {
				[ESortType.ALPHABETIC]: 'name',
				[ESortType.NUMERIC]: 'rotation',
			};

			const key = sortKeys[sortOption.value] || ESortType.DEFAULT;
			return sortBy(sortOption.value, items.value, key);
		});

		watch(sortedItems, (newItems: any) => {
			emit('updateSortItems', reactive(newItems))
		})

		const updateSortOption = (newOption: ESortType): void => {
			sortOption.value = newOption;
		}

		return {
			selected,
			items
		}
	}
})
</script>

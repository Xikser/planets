<template>
	<div class="sort-box flex items-center justify-end w-full gap-x-4">
		<h3>Sort by:</h3>

		<div class="min-w-[130px]">
			<a-select
				v-for="(item, index) in Object.values(sortTypes)"
				:key="`select-${index}`"
				v-model="selected"
				v-bind="item"
				:selected="selected"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import ASelect from '@/components/atoms/ASelect/ASelect'
import {computed, defineComponent, ref, watch, toRefs, reactive, toRaw, PropType} from "vue";
import {useGlobalStore} from "../../../stores/global";
import {storeToRefs} from "pinia";
import {ESortType} from "../../../types";
import useUtils from "../../../utils/useUtils";
import {IPlanetSortType} from '../../../pages/planets/config'

export default defineComponent({
	name: 'SortItems',
	components: {
		ASelect
	},
	props: {
		sortTypes: {
			type: Object as PropType<IPlanetSortType>,
			required: true
		},
		items: {
			type: Array,
			required: true
		}
	},
	emits: ['updateSortItems'],
	setup(props, {emit}) {
		const {items, sortTypes} = toRefs(props)
		const globalStore = useGlobalStore()
		const {getIsClient} = storeToRefs(globalStore)
		const sortOption = ref(Number(localStorage.getItem('sortOption')) || 0);
		const {sortBy} = useUtils<{ name: string; rotation: number }>();

		const getNameFromSortType = (sortType) => {
			const selectedSortTypes = toRaw(sortTypes.value)
				.find(({id}) => id === 'select')?.options[sortType];

			return selectedSortTypes?.name || 'Default';
		}

		const selected = ref({
			sortType: Number(localStorage.getItem('sortOption')),
			name: getNameFromSortType(localStorage.getItem('sortOption'))
		} || {})

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

			if (items.value && items.value.length) {
				return sortBy(sortOption.value, items.value, key);
			}
		});

		watch(sortedItems, (newItems: any) => {
			if (getIsClient) {
				localStorage.setItem('sortedItems', JSON.stringify(newItems))
			}

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

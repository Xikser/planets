<template>
	<div class="container container-custom-setup py-24 gap-y-8 flex flex-col">
		<h1 class="text-2xl font-bold">Planety:</h1>

		<o-sort-items
			:sort-types="sortConfig"
			@sort-changed="updateSortOption"
		/>

		<div class="flex flex-col items-center justify-center gap-y-8">
			<a-box
				class="w-full flex flex-col gap-y-2"
				v-for="(planet, index) in getPlanets"
				:key="`planet-${index}`"
			>
				<h3>
					Nazwa: <span>{{ planet.name }}</span>
				</h3>
				<h3>
					Okres rotacji (dni): <span>{{ planet.rotation }}</span>
				</h3>
				<h3>
					Klimat: <span>{{ planet.climates.toString().split(',').join(', ') }}</span>
				</h3>
				<h3>
					Grawitacja: <span>{{ planet.gravity }}</span>
				</h3>
				<h3>
					Stworzona: <span>{{ planet.created }}</span>
				</h3>
				<h3>
					Url: <a href="{{ planet.url }}" target="_blank">{{ planet.url }}</a>
				</h3>
			</a-box>
		</div>

		<m-pagination
			:pages="Number(getPagination.pages)"
			:prev="getPagination.prev"
			:next="getPagination.next"
			:current="getPagination.current"
			@update-pagination="updatePage"
		/>
	</div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, computed} from "vue";
import {storeToRefs} from "pinia";
import {usePlanetsStore} from "../../stores/planets";
import ABox from '@/components/atoms/ABox/ABox'
import OSortItems from '@/components/organisms/OSortItems/OSortItems'
import MPagination from "../../components/molecules/MPagination/MPagination.vue";
import {planetSortConfig} from './config'

import useUtils from '../../utils/useUtils'
import {ESortType} from "../../types";

export default defineComponent({
	name: "Planets",
	components: {MPagination, ABox, OSortItems},
	setup() {
		const planetsStore = usePlanetsStore();
		const {fetchData, updatePage} = usePlanetsStore()
		const {getPlanets, getPagination} = storeToRefs(planetsStore);
		const sortConfig = ref([planetSortConfig]);

		const { sortBy } = useUtils<{ name: string; rotation: number }>();

		const updateSortOption = (newOption: ESortType): void => {
		    const sortKeys = {
		        [ESortType.ALPHABETICAL]: 'name',
		        [ESortType.ROTATION]: 'rotation',
		    };

		    const key = sortKeys[newOption.name] || ESortType.DEFAULT;
		    sortBy(newOption.name, getPlanets.value, key);
		}

		onMounted(() => {
			fetchData()
		})

		return {
			getPlanets,
			getPagination,
			updatePage,
			sortConfig,
			updateSortOption
		}
	}
})
</script>

<style lang="scss" scoped>
.a-box {
	h3 {
		@apply font-bold;

		span {
			@apply font-normal;
		}
	}
}
</style>

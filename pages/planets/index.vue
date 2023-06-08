<template>
	<div class="container container-custom-setup py-24 gap-y-8 flex flex-col">
		<h1 class="text-2xl font-bold">Planets:</h1>

		<template v-if="getPlanets && getPlanets.length">
			<m-sort-items
				:sort-types="sortConfig"
				:items="getPlanets"
				@update-sort-items="updateSortItems"
			/>
		</template>

		<div class="flex flex-col items-center justify-center gap-y-8">
			<a-box
				class="w-full flex flex-col gap-y-2"
				v-for="(planet, index) in sortedItems"
				:key="`planet-${index}`"
			>
				<h3>
					Name: <span>{{ planet.name }}</span>
				</h3>
				<h3>
					Rotation period (days): <span>{{ planet.rotation }}</span>
				</h3>
				<h3>
					Climate: <span>{{ planet.climates.toString().split(',').join(', ') }}</span>
				</h3>
				<h3>
					Gravity: <span>{{ planet.gravity }}</span>
				</h3>
				<h3>
					Created: <span>{{ planet.created }}</span>
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
import {defineComponent, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {usePlanetsStore} from "../../stores/planets";
import ABox from '@/components/atoms/ABox/ABox'
import MSortItems from '@/components/molecules/MSortItems/MSortItems'
import MPagination from "../../components/molecules/MPagination/MPagination.vue";
import {planetSortConfig} from './config'

export default defineComponent({
	name: "Planets",
	components: {MPagination, ABox, MSortItems},
	setup() {
		const planetsStore = usePlanetsStore();
		const {fetchData, updatePage} = usePlanetsStore()
		const {getPlanets, getPagination} = storeToRefs(planetsStore);

		const sortConfig = ref([planetSortConfig]);
		const sortedItems = ref([])

		const updateSortItems = (items): void => {
			sortedItems.value = items;
		}

		onMounted(() => {
			new Promise(fetchData).then(() => sortedItems.value = getPlanets.value)
		})

		return {
			getPlanets,
			getPagination,
			updatePage,
			sortConfig,
			sortedItems,
			updateSortItems,
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

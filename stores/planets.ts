import axios from "axios";
import {defineStore} from "pinia";
import {useGlobalStore} from './global'
import {useFetch} from "nuxt/app";

interface IPlanetsState {
	pagination: {
		prev: string
		next: string
		current: number
		pages: number
		prevButtonStatus: boolean
		nextButtonStatus: boolean
	},
	loading: boolean
	climates: Set<any>,
	planets: [],
	filteredPlanets: []
}

const global = useGlobalStore()

export const usePlanetsStore = defineStore('planetsStore', {
	state: (): IPlanetsState => ({
		pagination: {
			prev: '',
			next: '',
			current: 1,
			pages: 0,
			prevButtonStatus: false,
			nextButtonStatus: false,
		},
		loading: false,
		climates: new Set(),
		planets: [],
		filteredPlanets: [],
	}),
	getters: {
		getPlanets: (state: IPlanetsState) => state.planets,
		getPagination: (state: IPlanetsState) => state.pagination,
	},
	actions: {
		async setResources(payload): Promise<void> {
			const uniqueClimates: Set<any> = new Set();

			this.planets = payload.results.map((planet) => {
				const climates = planet.climate.split(', ')

				climates.forEach(c => uniqueClimates.add(c))

				return {
					name: planet.name,
					rotation: planet.rotation_period,
					climates: climates,
					gravity: planet.gravity,
					created: planet.created,
					url: planet.url
				}
			})

			this.pagination.prev = payload.previous
			this.pagination.next = payload.next
			this.pagination.pages = payload.count / 10

			global.setLoading(false)
		}
	}
})

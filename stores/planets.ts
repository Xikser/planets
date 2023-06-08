import {defineStore} from "pinia";
import axios from "axios";
import {useGlobalStore} from './global'

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
const PLANETS_URL: URL = new URL('https://swapi.dev/api/planets/?page=')

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
		getPagination: (state: IPlanetsState) => state.pagination
	},
	actions: {
		async fetchData (): Promise<void> {
			global.setLoading(true)

			await axios.get(`${PLANETS_URL}${this.pagination.current}`).then(r => {
				this.setResources(r.data)
			}).catch((e) => {
				throw new Error(`Fetch Data Failed --> ${e}`)
			})
		},
		setResources (payload): void {
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
		},
		updatePage (payload: number): void {
			this.pagination.current = payload
			this.fetchData()
		}
	}
})

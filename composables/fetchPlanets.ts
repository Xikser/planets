import {useFetch} from "nuxt/app";
import {usePlanetsStore} from "../stores/planets";
import {useGlobalStore} from "../stores/global";
const {setResources} = usePlanetsStore()
const {setLoading} = useGlobalStore()

const fetchPlanets = (page: number): any => {
	setLoading(true)

	useFetch('/api/planets', {
		onRequest({request, options}): Promise<void> | void {
			options.query = options.query || {}
			options.query.page = page
		}
	}).then((r) => {
		setResources(r.data.value).then(r => r)
	})
}
export default fetchPlanets

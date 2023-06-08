import axios from "axios";

const PLANETS_URL: URL = new URL('https://swapi.dev/api/planets/?page=')
export default defineEventHandler(async (event: any) => {
	let data = []

	await axios.get(`${PLANETS_URL}1`).then(r => {
		data = r.data
	}).catch((e) => {
		throw new Error(`Fetch Data Failed --> ${e}`)
	})

	return data
})

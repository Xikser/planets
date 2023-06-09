import axios from "axios";

const PLANETS_URL: URL = new URL('https://swapi.dev')

export default defineEventHandler(async (event: any) => {
	let data = []

	await axios.get(`${PLANETS_URL}${event.node.req.url}`).then(r => {
		data = r.data
	}).catch((e) => {
		throw new Error(`Fetch Data Failed --> ${e}`)
	})

	return data
})

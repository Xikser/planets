import {ESortType} from "../types";

export interface ISortConfig {
	id: string | number
	selected?: {
		name: ESortType
	}
	options: ISortOptions[]
}

interface ISortOptions {
	name: ESortType
}

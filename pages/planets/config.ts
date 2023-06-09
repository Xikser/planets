import {ESortType} from "../../types";

export interface IPlanetSortType {
	DEFAULT: {
		sortType: ESortType.DEFAULT,
		name: string
	}
	ALPHABETIC: {
		sortType: ESortType.ALPHABETIC,
		name: string
	}
	ROTATION: {
		sortType: ESortType.NUMERIC,
		name: string
	}
}

const planetSortType: IPlanetSortType = {
	DEFAULT: {
		sortType: ESortType.DEFAULT,
		name: 'Default'
	},
	ALPHABETIC: {
		sortType: ESortType.ALPHABETIC,
		name: 'Alphabetic (A-Z)'
	},
	ROTATION: {
		sortType: ESortType.NUMERIC,
		name: 'Rotation period (ascending)'
	}
}

export const planetSortConfig = {
	id: 'select',
	selected: planetSortType.DEFAULT,
	options: [
		planetSortType.DEFAULT, planetSortType.ALPHABETIC, planetSortType.ROTATION
	],
};

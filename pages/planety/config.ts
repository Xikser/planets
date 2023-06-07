import {ESortType} from "../../types";
import {ISortConfig} from "../../interfaces";

const planetSortType = {
	DEFAULT: {
		sortType: ESortType.DEFAULT,
		name: 'Domyślne'
	},
	ALPHABETIC: {
		sortType: ESortType.ALPHABETIC,
		name: 'Alfabetycznie'
	},
	ROTATION: {
		sortType: ESortType.NUMERIC,
		name: 'Okres rotacji (rosnąco)'
	}
}

export const planetSortConfig = {
	id: 'select',
	selected: planetSortType.DEFAULT,
	options: [
		planetSortType.DEFAULT, planetSortType.ALPHABETIC, planetSortType.ROTATION
	],
};

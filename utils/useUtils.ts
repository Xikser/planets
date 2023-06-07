import {ESortType} from "../types";

type IUseUtils<T extends object> = {
	sortBy: <K extends keyof T>(sortType: ESortType, sortValue: T[], sortKey: K) => T[]
}

const useUtils = <T extends object>(): IUseUtils<T> => {
	const sortBy = <K extends keyof T>(sortType: ESortType, valueToSort: T[], sortKey: K): T[] => {
		if (sortType === ESortType.DEFAULT || typeof sortType === 'undefined') {
			return valueToSort
		}

		// console.log(valueToSort)
		let sortedValue = valueToSort; // Create a copy of valueToSort
		// console.log(valueToSort)

		if (sortType === ESortType.ALPHABETICAL) {
			sortedValue.sort((a: T, b: T) => String(a[sortKey]).localeCompare(String(b[sortKey])));
		}

		if (sortType === ESortType.ROTATION) {
			sortedValue.sort((a: T, b: T) => Number(a[sortKey]) - Number(b[sortKey]));
		}

		console.log(sortedValue)

		return sortedValue;
	}

	return {
		sortBy
	}
}

export default useUtils

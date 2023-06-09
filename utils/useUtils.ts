import {ESortType} from "../types";
import {type} from "os";

type IUseUtils<T extends object> = {
	sortBy: <K extends keyof T>(sortType: ESortType, sortValue: T[], sortKey: K) => T[]
}

const useUtils = <T extends object>(): IUseUtils<T> => {
	const deepCopy = (items: T[]): T[] => {
		return items.map(item => {
			if (typeof item === 'object' && item !== null) {
				return {...item};
			} else {
				return item;
			}
		});
	};

	const sortBy = <K extends keyof T>(sortType: ESortType, valueToSort: T[], sortKey: K): T[] => {
	    let sortedValueToSort: T[] = deepCopy(valueToSort);

	    if (Number(sortType) === ESortType.DEFAULT || typeof sortType === 'undefined') {
	        return sortedValueToSort;
	    }

	    if (Number(sortType) === ESortType.ALPHABETIC) {
	        sortedValueToSort.sort((a: T, b: T) => String(a[sortKey]).localeCompare(String(b[sortKey])));
	    }

	    if (Number(sortType) === ESortType.NUMERIC) {
	        sortedValueToSort.sort((a: T, b: T) => Number(a[sortKey]) - Number(b[sortKey]));
	    }

	    return sortedValueToSort;
	}

	return {
		sortBy
	}
}

export default useUtils

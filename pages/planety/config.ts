import {ESortType} from "../../types";
import {ISortConfig} from "../../interfaces";

export const planetSortConfig: ISortConfig = {
    id: 'select',
    selected: {
        name: ESortType.DEFAULT
    },
    options: [
        {
            name: ESortType.DEFAULT,
        },
        {
            name: ESortType.ALPHABETICAL,
        },
        {
            name: ESortType.ROTATION,
        },
    ],
};

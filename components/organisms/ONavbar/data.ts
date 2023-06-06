import {INavData} from "./interfaces";

export const navData: INavData[] = [
    {
        title: 'Strona główna',
        href: '/',
        icon: 'home',
        disabled: false
    },{
        title: 'Planety',
        href: '/planety',
        icon: 'public',
        disabled: false
    },
    {
        title: 'Ludzie',
        href: '/ludzie',
        icon: 'group',
        disabled: true
    },
    {
        title: 'Filmy',
        href: '/filmy',
        icon: 'movie',
        disabled: true
    }
]

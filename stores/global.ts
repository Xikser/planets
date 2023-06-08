import { defineStore } from "pinia";

interface IGlobalState {
    isClient: boolean
    mobileBreakpoint: number
    isMobile: boolean
    isTablet: boolean
    desktopBreakpoint: number
    isDesktop: boolean,
    loading: boolean
}

export const useGlobalStore = defineStore(`globalStore`, {
    state: (): IGlobalState => ({
        isClient: false,
        mobileBreakpoint: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        desktopBreakpoint: 1024,
        loading: false
    }),
    getters: {
        getIsClient: (state: IGlobalState): boolean => state.isClient,
        getIsMobile: (state: IGlobalState): boolean => state.isMobile,
        getIsTablet: (state: IGlobalState): boolean => state.isTablet,
        getIsDesktop: (state: IGlobalState): boolean => !state.isMobile && !state.isTablet,
        getIsLoading: (state: IGlobalState): boolean => state.loading
    },
    actions: {
        setLoading(payload): void {
            console.log(payload)

            this.loading = payload
        },
        setIsClient(): void {
            // @ts-ignore
            this.isClient = typeof window !== `undefined` && !process.server;
        },
        setIsMobile(): void {
            if (this.isClient) {
                this.isMobile = window.innerWidth <= this.mobileBreakpoint;
            }
        },
        setIsTablet(): void {
            if (this.isClient) {
                this.isTablet = window.innerWidth > this.mobileBreakpoint && window.innerWidth < this.desktopBreakpoint;
            }
        },
        setIsDesktop(): void {
            if (this.isClient) {
                this.isDesktop = window.innerWidth >= this.desktopBreakpoint || (!this.isMobile && this.isTablet);
            }
        },
    },
});

import {defineNuxtConfig} from 'nuxt/config';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: true,
	app: {
		head: {
			title: `Planety`,
			htmlAttrs: {lang: `pl`},
			link: [
				{
					rel: `preconnect`,
					href: `https://fonts.googleapis.com`,
				},
				{
					rel: `preconnect`,
					href: `https://fonts.gstatic.com`,
				},
				{
					rel: `stylesheet`,
					href: `https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap`,
				},
				{
					rel: `stylesheet`,
					href: `https://fonts.googleapis.com/icon?family=Material+Icons`,
				},
			],
			meta: [
				{charset: `utf-8`},
				{
					name: `viewport`,
					content: `width=device-width, initial-scale=1`,
				},
				{
					hid: `description`,
					name: `description`,
					content: `Content here`,
				},
				{
					name: `msapplication-TileColor`,
					content: `#ffffff`,
				},
				{
					name: `theme-color`,
					content: `#ffffff`,
				},
			],
		},
	},
	pages: true,
	components: true,
	modules: [
		'@pinia/nuxt',
		`@nuxtjs/tailwindcss`,
		`@nuxt/image-edge`,
		`@nuxtjs/robots`,
	],
	tailwindcss: {
		mode: `jit`,
		content: [
			`/components/**/*.{vue,js,ts}`,
			`/layouts/**/*.vue`,
			`/pages/**/*.vue`,
			`/composables/**/*.{js,ts}`,
			`/plugins/**/*.{js,ts}`,
			`/app.{js,ts,vue}`,
			`/Error.{js,ts,vue}`,
			`/error.{js,ts,vue}`,
		],
		theme: {extend: {colors: {'gray-200': `#E5E7EB`}}},
		exposeConfig: true,
	},
	imports: {dirs: ['./stores']},
	pinia: {
		autoImports: [
			// automatically imports defineStore
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
		],
	},
	image: {dir: `assets/images`},
	vite: {css: {preprocessorOptions: {sass: {additionalData: `@import "@/assets/scss/main.scss" as *`}}}},
	css: [`~/assets/css/tailwind.css`, `~/assets/scss/main.scss`],
	build: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
	},
	env: {baseURL: `http://localhost:3100`, authURL: `http://localhost:3100/auth`},
});

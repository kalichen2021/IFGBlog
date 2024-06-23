/// <reference types="vite/client" />
declare module "*.vue" {
	import { ComponentOptions } from "vue";

	const componentOptions: ComponentOptions;

	export default componentOptions;
}

declare module 'jquery' {
	export function jQuery(selector: string): JQuery;
	export function ajax(settings: JQueryAjaxSettings): JQueryXHR;
	export const fn: JQueryStatic;
}

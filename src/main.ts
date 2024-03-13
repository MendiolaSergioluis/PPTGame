import './style.css'
import { initRouter } from "./router.ts";

const root: Element = document.querySelector<HTMLDivElement>('body')!

initRouter(root);
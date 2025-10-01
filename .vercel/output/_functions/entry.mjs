import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cabc6Rxp.mjs';
import { manifest } from './manifest_IBpf39J-.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/callback.astro.mjs');
const _page2 = () => import('./pages/dashboard.astro.mjs');
const _page3 = () => import('./pages/login.astro.mjs');
const _page4 = () => import('./pages/nosotros.astro.mjs');
const _page5 = () => import('./pages/productos.astro.mjs');
const _page6 = () => import('./pages/recover-password.astro.mjs');
const _page7 = () => import('./pages/reset-password.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/callback.astro", _page1],
    ["src/pages/dashboard.astro", _page2],
    ["src/pages/login.astro", _page3],
    ["src/pages/nosotros.astro", _page4],
    ["src/pages/productos.astro", _page5],
    ["src/pages/recover-password.astro", _page6],
    ["src/pages/reset-password.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "39d825d8-08ea-4dc0-86a4-38ca770934d7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

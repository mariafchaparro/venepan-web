import 'kleur/colors';
import { x as decodeKey } from './chunks/astro/server_zyXMpcS0.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_iHdP20nS.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BwN5Z2tD.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/mafer/Documents/Projects/venepan-web/","cacheDir":"file:///C:/Users/mafer/Documents/Projects/venepan-web/node_modules/.astro/","outDir":"file:///C:/Users/mafer/Documents/Projects/venepan-web/dist/","srcDir":"file:///C:/Users/mafer/Documents/Projects/venepan-web/src/","publicDir":"file:///C:/Users/mafer/Documents/Projects/venepan-web/public/","buildClientDir":"file:///C:/Users/mafer/Documents/Projects/venepan-web/dist/client/","buildServerDir":"file:///C:/Users/mafer/Documents/Projects/venepan-web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"nosotros/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"productos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/productos","isIndex":false,"type":"page","pattern":"^\\/productos\\/?$","segments":[[{"content":"productos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/productos.astro","pathname":"/productos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/callback","isIndex":false,"type":"page","pattern":"^\\/callback\\/?$","segments":[[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/callback.astro","pathname":"/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/AuthLayout.DvB2Xm2x.css"},{"type":"external","src":"/_astro/dashboard.QT4ibWtX.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/AuthLayout.DvB2Xm2x.css"},{"type":"external","src":"/_astro/dashboard.QT4ibWtX.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/AuthLayout.DvB2Xm2x.css"},{"type":"external","src":"/_astro/dashboard.QT4ibWtX.css"}],"routeData":{"route":"/recover-password","isIndex":false,"type":"page","pattern":"^\\/recover-password\\/?$","segments":[[{"content":"recover-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recover-password.astro","pathname":"/recover-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/AuthLayout.DvB2Xm2x.css"},{"type":"external","src":"/_astro/dashboard.QT4ibWtX.css"}],"routeData":{"route":"/reset-password","isIndex":false,"type":"page","pattern":"^\\/reset-password\\/?$","segments":[[{"content":"reset-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reset-password.astro","pathname":"/reset-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/recover-password.astro",{"propagation":"none","containsHead":true}],["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/reset-password.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/mafer/Documents/Projects/venepan-web/src/components/inicio/ReviewSection.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/mafer/Documents/Projects/venepan-web/src/components/productos/ProductSection.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/productos.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/productos@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/mafer/Documents/Projects/venepan-web/src/pages/nosotros.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/callback@_@astro":"pages/callback.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/productos@_@astro":"pages/productos.astro.mjs","\u0000@astro-page:src/pages/recover-password@_@astro":"pages/recover-password.astro.mjs","\u0000@astro-page:src/pages/reset-password@_@astro":"pages/reset-password.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D9i9JAJB.mjs","C:/Users/mafer/Documents/Projects/venepan-web/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CA46k2bt.mjs","C:\\Users\\mafer\\Documents\\Projects\\venepan-web\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\mafer\\Documents\\Projects\\venepan-web\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CShFrtbe.mjs","C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/LogOutButton.tsx":"_astro/LogOutButton.Dcma_85U.js","C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/LoginForm.tsx":"_astro/LoginForm.DeZypNvO.js","C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/RecoverForm.tsx":"_astro/RecoverForm.CW5JjfyI.js","C:/Users/mafer/Documents/Projects/venepan-web/src/components/auth/ResetForm.tsx":"_astro/ResetForm.zMByEdJg.js","C:/Users/mafer/Documents/Projects/venepan-web/src/layouts/AuthLayout.astro?astro&type=script&index=0&lang.ts":"_astro/AuthLayout.astro_astro_type_script_index_0_lang.BYLaQRjo.js","C:/Users/mafer/Documents/Projects/venepan-web/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.sMdtatbb.js","C:/Users/mafer/Documents/Projects/venepan-web/src/components/inicio/ReviewSection.astro?astro&type=script&index=0&lang.ts":"_astro/ReviewSection.astro_astro_type_script_index_0_lang.Cgs6BxNd.js","@astrojs/preact/client.js":"_astro/client.DGJrKcDX.js","C:/Users/mafer/Documents/Projects/venepan-web/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.LvNs0h6a.js","C:/Users/mafer/Documents/Projects/venepan-web/src/components/inicio/Banner.astro?astro&type=script&index=0&lang.ts":"_astro/Banner.astro_astro_type_script_index_0_lang.DjnCdkIK.js","C:/Users/mafer/Documents/Projects/venepan-web/src/layouts/AuthLayout.astro?astro&type=script&index=1&lang.ts":"_astro/AuthLayout.astro_astro_type_script_index_1_lang.CmDRG3Ks.js","C:/Users/mafer/Documents/Projects/venepan-web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DQPmKTee.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/mafer/Documents/Projects/venepan-web/src/components/Header.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"[data-menu-button]\"),c=document.querySelector(\"[data-menu-container]\"),n=document.querySelector(\"[data-menu-backdrop]\"),a=document.querySelector(\"[data-menu-content]\"),u=document.querySelector(\"[data-close-menu-button]\");function t(){const o=e?.getAttribute(\"aria-expanded\")===\"true\";e?.setAttribute(\"aria-expanded\",String(!o)),c?.classList.toggle(\"pointer-events-none\"),n?.classList.toggle(\"opacity-0\"),a?.classList.toggle(\"-translate-x-full\"),document.body.classList.toggle(\"overflow-hidden\")}e?.addEventListener(\"click\",t);u?.addEventListener(\"click\",t);n?.addEventListener(\"click\",t);"]],"assets":["/_astro/banner-productos.D3WCj4mW.svg","/_astro/banner-nosotros.36_Ov1I2.svg","/_astro/iahfc.CexvlLxi.png","/_astro/pan-integral-con-miel.DeetrgRS.webp","/_astro/pan-para-perro.Y8UlemIe.webp","/_astro/pan-para-hamburguesa.CtmCSu-F.webp","/_astro/pan-integral-con-ajonjoli.DxY6a6w-.webp","/_astro/pan-blanco.n_tLTgr4.webp","/_astro/pan-integral.DH-4xBgT.webp","/_astro/tostadas-integrales.DY7Xpy0k.webp","/_astro/aritos-frutados.ISATrgS0.webp","/_astro/choko-bolitos.CX12GHFF.webp","/_astro/choko-crispy.DOJgSDbp.webp","/_astro/aritos-con-miel.BzW9mOt-.webp","/_astro/soya-texturizada.CaISqgK8.webp","/_astro/about-pic.DZ6gTvJT.svg","/_astro/soya-banner.CaJBJgDD.svg","/_astro/cereales-banner.Do-ReCD_.svg","/_astro/planta-venepan.BrETQyZy.svg","/_astro/panes-banner.Cb0cx6yK.svg","/_astro/dashboard.QT4ibWtX.css","/_astro/index.DyytApdI.css","/ana-castillo.jpg","/favicon.svg","/juan-gomez.jpg","/laura-perez.jpg","/icons/arrow-down-right.svg","/icons/arrow-left.svg","/icons/arrow-right.svg","/icons/arrow-up-right.svg","/icons/book-open.svg","/icons/cereal-icon.svg","/icons/chevron-down-gray.svg","/icons/chevron-left.svg","/icons/chevron-up-gray.svg","/icons/dotted-line.svg","/icons/facebook-fill.svg","/icons/google-icon.svg","/icons/home.svg","/icons/instagram-line.svg","/icons/logo-blanco.svg","/icons/logo.svg","/icons/mail.svg","/icons/map-pin.svg","/icons/menu-white.svg","/icons/menu.svg","/icons/package.svg","/icons/pan-icon.svg","/icons/phone.svg","/icons/soy-icon.svg","/icons/soy.svg","/icons/star.svg","/icons/users.svg","/icons/whatsapp-line.svg","/icons/x.svg","/_astro/auth.Dz72V8eb.js","/_astro/AuthLayout.astro_astro_type_script_index_0_lang.BYLaQRjo.js","/_astro/AuthLayout.astro_astro_type_script_index_1_lang.CmDRG3Ks.js","/_astro/AuthLayout.DvB2Xm2x.css","/_astro/autoplay.SYptWxKL.js","/_astro/Banner.astro_astro_type_script_index_0_lang.DjnCdkIK.js","/_astro/client.DGJrKcDX.js","/_astro/hooks.module.DKr0xz_Z.js","/_astro/jsxRuntime.module.N7e_s17M.js","/_astro/Layout.astro_astro_type_script_index_0_lang.DQPmKTee.js","/_astro/LoginForm.DeZypNvO.js","/_astro/LogOutButton.Dcma_85U.js","/_astro/preact.module.CMz4SUKz.js","/_astro/preload-helper.BlTxHScW.js","/_astro/RecoverForm.CW5JjfyI.js","/_astro/ResetForm.zMByEdJg.js","/_astro/ReviewSection.astro_astro_type_script_index_0_lang.Cgs6BxNd.js","/_astro/signals.module.LvNs0h6a.js","/_astro/supabase.CZ8dNI_j.js","/_astro/_commonjsHelpers.Bx2EM-6T.js","/nosotros/index.html","/productos/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"LJDhgq6BtT1Oln37tXGYZTV5cp5U8ZfaPReHsdOtiow="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

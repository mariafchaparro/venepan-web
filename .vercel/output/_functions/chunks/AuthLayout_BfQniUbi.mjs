import { createClient } from '@supabase/supabase-js';
import { c as createComponent, a as createAstro, d as addAttribute, e as renderHead, f as renderSlot, g as renderScript, b as renderTemplate } from './astro/server_zyXMpcS0.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const supabaseUrl = "https://pjqupfgiddtwnnddvzgc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqcXVwZmdpZGR0d25uZGR2emdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzI5NzgsImV4cCI6MjA3MjkwODk3OH0.SQuIXrKZA60nqb5Q55iclGrqIBdYCMVx6WTgncJgaq0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const $$Astro = createAstro();
const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "C:/Users/mafer/Documents/Projects/venepan-web/src/layouts/AuthLayout.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "C:/Users/mafer/Documents/Projects/venepan-web/src/layouts/AuthLayout.astro?astro&type=script&index=1&lang.ts")} </body> </html>`;
}, "C:/Users/mafer/Documents/Projects/venepan-web/src/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $, supabase as s };

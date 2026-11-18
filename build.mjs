import {mkdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {dirname,resolve,relative,isAbsolute} from 'node:path';
import {render} from './src/render-v2.js';
import {collections} from './src/data.js';
const base=(process.env.BASE_PATH||'/').replace(/^\/?/,'/').replace(/\/?$/,'/');
const site=(process.env.SITE_URL||'https://posture-archive.visana-6584.chatgpt.site').replace(/\/$/,'');
const routes=['/','/sobre','/historia','/colecoes','/colaboracoes','/embaixadores','/contato',...collections.filter(c=>!c.pending).map(c=>'/colecoes/'+c.slug)];
const meta={'/':['POSTURE® — Arquivo','Coleções, campanhas e pessoas da POSTURE, criada em 2023.'],'/sobre':['Sobre — POSTURE®','Conheça a POSTURE.'],'/historia':['História — POSTURE®','A POSTURE de 2023 a 2026.'],'/colecoes':['Coleções — POSTURE®','Explore as coleções da POSTURE.'],'/colaboracoes':['Colaborações — POSTURE®','POSTURE e Jaya Luuck em Retrotype.'],'/embaixadores':['Embaixadores — POSTURE®','Conheça Gabreta e Suedezin.'],'/contato':['Contato — POSTURE®','Entre em contato com a POSTURE.']};
for(const c of collections.filter(c=>!c.pending))meta['/colecoes/'+c.slug]=[c.name+' — POSTURE®',c.description];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const path=s=>base+s.replace(/^\//,'');
const rebase=s=>s.replace(/(href|src|poster)="\/(?!\/)/g,(_,attr)=>attr+'="'+base);
const distRoot=resolve('dist');
for(const old of ['dist/raizes','dist/colecoes/raizes','dist/colecoes/starter','dist/assets/collections/raizes','dist/assets/collections/starter']){
 const target=resolve(old), rel=relative(distRoot,target);
 if(rel.startsWith('..')||isAbsolute(rel)||!rel)throw new Error('Caminho de limpeza inválido: '+target);
 await rm(target,{recursive:true,force:true});
}
for(const route of routes){
 const [title,description]=meta[route], canonical=site+(route==='/'?'':route);
 const html=`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101010"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${site}/assets/video/void-poster.webp"><link rel="icon" type="image/svg+xml" href="${path('assets/brand/favicon.svg')}"><link rel="stylesheet" href="${path('style.css')}"></head><body>${rebase(render(route))}<script type="module" src="${path('client.js')}"></script></body></html>`;
 const target=route==='/'?'dist/index.html':`dist${route}/index.html`;await mkdir(dirname(target),{recursive:true});await writeFile(target,html,'utf8');
}
await writeFile('dist/404.html',`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 — POSTURE®</title><link rel="stylesheet" href="${path('style.css')}"></head><body>${rebase(render('/404'))}<script type="module" src="${path('client.js')}"></script></body></html>`);
await copyFile('src/style-v2.css','dist/style.css');await copyFile('src/client.js','dist/client.js');
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${site+(r==='/'?'':r)}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
console.log(`Geradas ${routes.length} páginas em ${base}`);



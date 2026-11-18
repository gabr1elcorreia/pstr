import {readFile,stat} from 'node:fs/promises';
import {join,extname} from 'node:path';
import {collections} from './src/data.js';
const base=(process.env.BASE_PATH||'/').replace(/^\/?/,'/').replace(/\/?$/,'/');
const routes=['/','/sobre','/historia','/colecoes','/colaboracoes','/embaixadores','/contato',...collections.filter(c=>!c.pending).map(c=>'/colecoes/'+c.slug)];
const errors=[];
for(const route of routes){
 const file=route==='/'?'dist/index.html':`dist${route}/index.html`;
 let html;try{html=await readFile(file,'utf8')}catch{errors.push('Página ausente: '+route);continue}
 if(!html.includes('<main id="main">'))errors.push('Conteúdo ausente: '+route);
 for(const [,asset] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)){
  if(!asset.startsWith('/'))continue;
  if(!asset.startsWith(base)){errors.push('Caminho fora da base: '+asset);continue}
  const relative=asset.slice(base.length).split(/[?#]/)[0];
  const target=relative===''?'dist/index.html':extname(relative)?join('dist',relative):join('dist',relative,'index.html');
  try{await stat(target)}catch{errors.push('Arquivo ausente: '+route+' → '+asset)}
 }
 for(const [img] of html.matchAll(/<img\b[^>]*>/g))if(!/alt="[^"]*"/.test(img))errors.push('Imagem sem descrição: '+route);
}
for(const old of ['dist/raizes','dist/colecoes/raizes','dist/colecoes/starter','dist/assets/collections/raizes'])try{await stat(old);errors.push('Conteúdo antigo ainda presente: '+old)}catch{}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log(`OK: ${routes.length} páginas, links e imagens em ${base}`);


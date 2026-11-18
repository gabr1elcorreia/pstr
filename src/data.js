export const store = 'https://loja.pstr.com.br';
export const instagram = 'https://www.instagram.com/pstr.company/';
export const email = 'contato@pstr.com.br';
export const nav = [
  ['Início', '/'], ['Sobre', '/sobre'], ['História', '/historia'],
  ['Coleções', '/colecoes'], ['Colaborações', '/colaboracoes'], ['Embaixadores', '/embaixadores']
];
export const collections = [
  { slug:'oriental-essence', name:'Oriental Essence', year:'2023', number:'01', description:'A primeira coleção completa da POSTURE.', images:['01','02','03','04','05','07','08'] },
  { slug:'kyoto-garden', name:'Kyoto Garden', year:'2023', number:'02', description:'Campanha de 2023 registrada em fotos e vídeo.', cover:'cover', images:['01','02','03','04','05','06','07','08'], video:'/assets/video/kyoto.mp4' },
  { slug:'criminal-streets', name:'Criminal Streets', year:'2024', number:'03', description:'Campanha de 2024 da POSTURE.', images:['01','02','03','04','05','06','07','08'] },
  { slug:'safe-zone', name:'Safe Zone', year:'2024', number:'04', description:'Fotos da coleção Safe Zone, de 2024.', images:['01','02','03','04','05','06','07','08'] },
  { slug:'retrotype', name:'Retrotype', year:'2025', number:'05', description:'Lançada em dezembro de 2025 com participação de Jaya Luuck.', cover:'cover', images:['01','02','03','04','05','06','07','08','09','10','11','12'] },
  { slug:'void', name:'Void', year:'2026', number:'06', description:'Coleção de 2026 da POSTURE.', images:['01','02','03','04','05','06','07','08'] },
  { slug:'raizes', name:'Raízes', year:'2026', number:'07', description:'Próxima coleção. Lançamento em breve.', pending:true, images:[] }
];
export const image = (slug, name='01') => `/assets/collections/${slug}/${name}.webp`;
export const cover = c => c.pending ? null : image(c.slug, c.cover || c.images[0]);

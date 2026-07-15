import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root=process.cwd();
const dist=path.join(root,'dist');
const {render}=await import(pathToFileURL(path.join(root,'dist-ssr','entry-server.js')).href);
const template=await fs.readFile(path.join(dist,'index.html'),'utf8');
const site=process.env.SITE_URL||'https://your-domain.com';
const projects=[
 ['eidcarosse','Eidcarosse.ch','A full-stack luxury transportation booking and operations platform.'],
 ['gratis-ads','Gratis Ads — GratisOglasi.ba','A React Native classifieds marketplace for buying and selling across Bosnia and Herzegovina.'],
 ['maxremind-charts','MaxRemind Charts','An AI-assisted mobile healthcare charting platform for providers.'],
 ['maxchats','MaxChats','A real-time enterprise messaging application built with React Native.'],
 ['provider-portal','Provider Portal','A healthcare provider management and patient-record platform.'],
 ['union-health-solution','Union Health Solution','A healthcare administration and analytics platform.'],
 ['gripy-apps','Gripy','A cross-platform store management application for small businesses.'],
 ['recipes-website','Recipes Website','A responsive recipe discovery and favorites platform.']
];
const pages=[
 {url:'/',title:'Hamza Mustafa | Senior React Native Developer & Full-Stack Engineer',description:'Hamza Mustafa is a React Native specialist and full-stack engineer building production iOS and Android apps, scalable APIs, enterprise platforms, and real-time systems.'},
 ...projects.map(([slug,title,description])=>({url:`/projects/${slug}`,title:`${title} Case Study | Hamza Mustafa`,description})),
 {url:'/404',title:'Page Not Found | Hamza Mustafa',description:'The requested page could not be found.'}
];
for(const page of pages){
 const html=render(page.url);const canonical=`${site}${page.url==='/'?'':page.url}`;
 const json=JSON.stringify({'@context':'https://schema.org','@type':page.url==='/'?'Person':'CreativeWork',name:page.url==='/'?'Hamza Mustafa':page.title,url:canonical,description:page.description,sameAs:page.url==='/'?['https://github.com/hamza229hafeez','https://www.linkedin.com/in/hamza-hafeez-5567a9200']:undefined});
 const head=`<title>${page.title}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site}/og-image.svg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}"><meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${site}/og-image.svg"><script type="application/ld+json">${json}</script>`;
 const output=template.replace('<!--app-head-->',head).replace('<!--app-html-->',html);const out=page.url==='/'?path.join(dist,'index.html'):path.join(dist,page.url.slice(1),'index.html');await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,output);
}
await fs.writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p=>p.url!='/404').map(p=>`<url><loc>${site}${p.url==='/'?'':p.url}</loc></url>`).join('')}</urlset>`);
await fs.writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await fs.rm(path.join(root,'dist-ssr'),{recursive:true,force:true});

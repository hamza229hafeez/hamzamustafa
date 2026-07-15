import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function Reveal({children,className='',delay=0,direction='up'}:{children:ReactNode;className?:string;delay?:number;direction?:'up'|'left'|'zoom'}){
 const initial=direction==='left'?{opacity:0,x:-24}:direction==='zoom'?{opacity:0,scale:.96}:{opacity:0,y:24};
 return <motion.div className={className} initial={initial} whileInView={{opacity:1,x:0,y:0,scale:1}} viewport={{once:true,margin:'-60px'}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}
export function MagneticLink({href,children,secondary=false,download=false}:{href:string;children:ReactNode;secondary?:boolean;download?:boolean}){
 const x=useMotionValue(0),y=useMotionValue(0); const sx=useSpring(x,{stiffness:220,damping:18}),sy=useSpring(y,{stiffness:220,damping:18});
 return <motion.a style={{x:sx,y:sy}} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.14);y.set((e.clientY-r.top-r.height/2)*.14)}} onMouseLeave={()=>{x.set(0);y.set(0)}} className={`button ${secondary?'button-secondary':''}`} href={href} download={download}>{children}<ArrowUpRight size={16}/></motion.a>
}
export function Counter({value,suffix='+'}:{value:number;suffix?:string}){const ref=useRef(null);const visible=useInView(ref,{once:true});const [n,setN]=useState(0);useEffect(()=>{if(!visible)return;let start=0;const begin=performance.now(),duration=1200;const tick=(now:number)=>{const p=Math.min((now-begin)/duration,1);setN(Math.floor(start+(value-start)*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)},[visible,value]);return <strong ref={ref}>{n}{suffix}</strong>}
export function SectionHeading({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <Reveal className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</Reveal>}

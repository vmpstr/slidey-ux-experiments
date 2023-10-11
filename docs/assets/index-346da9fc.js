var I=Object.defineProperty;var L=(e,t,n)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var r=(e,t,n)=>(L(e,typeof t!="symbol"?t+"":t,n),n),N=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var P=(e,t,n)=>(N(e,t,"read from private field"),n?n.call(e):t.get(e)),O=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},D=(e,t,n,s)=>(N(e,t,"write to private field"),s?s.call(e,n):t.set(e,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();class A{constructor(t){r(this,"dragStartTime");r(this,"animationStartTime",0);r(this,"animationStartOffset",0);r(this,"networkDelay");r(this,"maxOffset");r(this,"offset",0);this.dragStartTime=t.dragStartTime,this.networkDelay=t.networkDelay,this.maxOffset=t.targetOffset}startAnimating(t){this.animationStartTime=t,this.animationStartOffset=this.offset}committed(){return performance.now()-this.dragStartTime>=this.networkDelay}}const M=10,x=10;class k{constructor(t){r(this,"mass",1);r(this,"initialVelocity",0);r(this,"dampingRatio");r(this,"undampedNaturalFrequency");r(this,"dampedNaturalFrequency");r(this,"lastNFrames");const n=(2*Math.PI/t.frequencyResponse)**2*this.mass;this.undampedNaturalFrequency=Math.sqrt(n/this.mass),this.dampedNaturalFrequency=this.undampedNaturalFrequency*Math.sqrt(Math.abs(1-t.dampingRatio**2)),this.dampingRatio=t.dampingRatio,this.lastNFrames=[]}position(t,n){const s=this.undampedNaturalFrequency*this.dampingRatio,o=this.dampedNaturalFrequency,i=(this.initialVelocity+s*t)/o,a=t;console.log(`${s} ${o} ${i} ${a}`),console.log("TIME: "+n);const c=Math.exp(-s*n)*(i*Math.sin(o*n)+a*Math.cos(o*n));if(console.log("Start position "+t),isNaN(c)||!isFinite(c))throw"Spring config invalid. Position: "+c;console.log(this),this.lastNFrames.push(c);let S=!1;if(this.lastNFrames.length>M){this.lastNFrames.shift();let u=0;for(let v of this.lastNFrames)u+=v*v;console.log("SUM: "+u),console.log(this.lastNFrames),S=u<x*M}return{offset:c,done:S}}}var d;class _ extends A{constructor(n){super(n);O(this,d,void 0);r(this,"hasCommitted",!1);D(this,d,new k({frequencyResponse:1.2,dampingRatio:.9})),console.log("NEW MODEL "+this.networkDelay)}updateDisplays(){}advance(){const n=(performance.now()-this.animationStartTime)/1e3;let s=null;return s=P(this,d).position(this.maxOffset-this.animationStartOffset,n),this.offset=this.maxOffset-s.offset,console.log("Offset "+s.offset),{done:s.done,offset:this.offset}}pointerMove(n){return this.offset+=n,this.offset<0&&(this.offset=0),this.offset}}d=new WeakMap;function h(){throw new Error("missing element")}let $=_,f,R,y=!1,m=!1;const F=document.getElementById("scrim")??h(),g=document.getElementById("networkDelayInput")??h(),T=Array.from(document.querySelectorAll('input[name="mode"]')).map(e=>e),b=document.getElementById("networkDelayDisplay")??h();function B(e){var t;((t=e.target)==null?void 0:t.id)!=""||y||(m=!0,l=E(),R=document.startViewTransition(),R.ready.then(()=>{f=document.documentElement.animate({},{duration:100,pseudoElement:"::view-transition-new(root)"}),f.pause(),F.style.display="block"}))}function H(e){if(!m)return;let t=l.pointerMove(e.movementX);document.documentElement.style.setProperty("--offset",`${t}px`);let s=.3+(1-t/document.documentElement.getBoundingClientRect().width)*.5;document.documentElement.style.setProperty("--scrim",`${s}`)}function V(e){m&&(m=!1,G().then(()=>{document.documentElement.animate([{"--scrim":0}],{duration:100}).finished.then(w)}))}let l=E();w();function q(e){const t=l.advance();console.log(t),document.documentElement.style.setProperty("--offset",`${t.offset}px`),t.done?e():requestAnimationFrame(()=>{q(e)})}function G(){return y=!0,l.startAnimating(performance.now()),new Promise(e=>{q(e)})}function w(){y=!1,document.documentElement.style.setProperty("--offset","0px"),document.documentElement.style.setProperty("--vertical-offset","0px"),document.documentElement.style.setProperty("--scrim","0.0"),f&&f.play(),F.style.display="none"}function E(){for(const e of T)e.checked&&parseInt(e.value);return new $({dragStartTime:performance.now(),networkDelay:parseFloat(g.value),targetOffset:document.documentElement.getBoundingClientRect().width})}function p(){b.innerHTML=g.value,l.updateDisplays(),l=E(),w()}function U(){g.addEventListener("input",p);for(const e of T)e.addEventListener("click",p);p(),window.addEventListener("pointerdown",B),window.addEventListener("pointerup",V),window.addEventListener("pointermove",H)}onload=U;

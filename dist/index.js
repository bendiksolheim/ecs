!function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"Entity",(function(){return r})),n.d(e,"system",(function(){return i})),n.d(e,"World",(function(){return u})),n.d(e,"Key",(function(){return o}));class r{constructor(){this.id=function(){let t=s;return s+=1,Date.now().toString(16)+(1e8*Math.random()|0).toString(16)+t}(),this.components=new Map}add(t){const e=t.constructor;this.components.set(e,t)}remove(t){this.components.delete(t)}has(t){return this.components.has(t)}get(t){return this.components.get(t)}print(){const t=[...this.components];console.log(JSON.stringify({id:this.id,components:t},null,4))}}let s=0;var o,i=(t,e)=>({filter:t,tick:e});!function(t){t.Up="ArrowUp",t.Down="ArrowDown",t.Left="ArrowLeft",t.Right="ArrowRight"}(o||(o={}));!function(t){const e={};Object.keys(t).forEach(n=>{const r=t[n];e[r]=n})}(o);class c{constructor(){this.state=new Map}press(t){this.state.set(t,!0)}release(t){this.state.set(t,!1)}pressed(t){return this.state.get(t)||!1}}class u{constructor(t,e,n){this.canvas=t,this.context=t.getContext("2d"),this.mouse={x:-100,y:-100},this.systems=n,this.entities=new Map,this.keyboard=new c,this.createEntityMapping(e),this.createMouseListener(),this.createKeyboardListener()}add(t){this.entities.forEach((e,n)=>{a(t,n)&&e.set(t.id,t)})}removeEntity(t){this.entities.forEach(e=>{e.delete(t)})}tick(){this.systems.forEach(t=>{const e=Array.from(this.entities.get(t.filter).values());return t.tick(e,this)})}createEntityMapping(t){this.systems.forEach(e=>{const n=new Map;(function(t,e){return Object.values(t).filter(t=>a(t,e))})(t,e.filter).forEach(t=>{n.set(t.id,t)}),this.entities.set(e.filter,n)})}createMouseListener(){const t=this.canvas.getBoundingClientRect();this.canvas.addEventListener("mousemove",e=>{this.mouse.x=e.clientX-t.left,this.mouse.y=e.clientY-t.top})}createKeyboardListener(){document.body.addEventListener("keydown",t=>{this.keyboard.press(t.key)}),document.body.addEventListener("keyup",t=>{this.keyboard.release(t.key)})}}function a(t,e){return e.every(e=>t.has(e))}}]);
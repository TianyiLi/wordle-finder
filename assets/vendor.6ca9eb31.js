function A(){}function S(t){return t()}function v(){return Object.create(null)}function _(t){t.forEach(S)}function N(t){return typeof t=="function"}function I(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function O(t){return Object.keys(t).length===0}function J(t,e){t.appendChild(e)}function K(t,e,n){t.insertBefore(e,n||null)}function L(t){t.parentNode.removeChild(t)}function Q(t){return document.createElement(t)}function T(t){return document.createTextNode(t)}function R(){return T(" ")}function U(t,e,n,c){return t.addEventListener(e,n,c),()=>t.removeEventListener(e,n,c)}function V(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function B(t){return Array.from(t.childNodes)}function W(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function X(t,e){t.value=e==null?"":e}let b;function a(t){b=t}const i=[],E=[],d=[],j=[],M=Promise.resolve();let p=!1;function P(){p||(p=!0,M.then(C))}function $(t){d.push(t)}const g=new Set;let l=0;function C(){const t=b;do{for(;l<i.length;){const e=i[l];l++,a(e),q(e.$$)}for(a(null),i.length=0,l=0;E.length;)E.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];g.has(n)||(g.add(n),n())}d.length=0}while(i.length);for(;j.length;)j.pop()();p=!1,g.clear(),a(t)}function q(t){if(t.fragment!==null){t.update(),_(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach($)}}const z=new Set;function D(t,e){t&&t.i&&(z.delete(t),t.i(e))}function F(t,e,n,c){const{fragment:o,on_mount:h,on_destroy:f,after_update:m}=t.$$;o&&o.m(e,n),c||$(()=>{const u=h.map(S).filter(N);f?f.push(...u):_(u),t.$$.on_mount=[]}),m.forEach($)}function G(t,e){const n=t.$$;n.fragment!==null&&(_(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function H(t,e){t.$$.dirty[0]===-1&&(i.push(t),P(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,c,o,h,f,m=[-1]){const u=b;a(t);const r=t.$$={fragment:null,ctx:null,props:h,update:A,not_equal:o,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:v(),dirty:m,skip_bound:!1,root:e.target||u.$$.root};f&&f(r.root);let y=!1;if(r.ctx=n?n(t,e.props||{},(s,x,...k)=>{const w=k.length?k[0]:x;return r.ctx&&o(r.ctx[s],r.ctx[s]=w)&&(!r.skip_bound&&r.bound[s]&&r.bound[s](w),y&&H(t,s)),x}):[],r.update(),y=!0,_(r.before_update),r.fragment=c?c(r.ctx):!1,e.target){if(e.hydrate){const s=B(e.target);r.fragment&&r.fragment.l(s),s.forEach(L)}else r.fragment&&r.fragment.c();e.intro&&D(t.$$.fragment),F(t,e.target,e.anchor,e.customElement),C()}a(u)}class Z{$destroy(){G(this,1),this.$destroy=A}$on(e,n){const c=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return c.push(n),()=>{const o=c.indexOf(n);o!==-1&&c.splice(o,1)}}$set(e){this.$$set&&!O(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Z as S,R as a,V as b,K as c,J as d,Q as e,X as f,W as g,L as h,Y as i,U as l,A as n,_ as r,I as s,T as t};

(()=>{var e={184:(e,t)=>{var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)){if(r.length){var s=o.apply(null,r);s&&e.push(s)}}else if("object"===i){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var c in r)n.call(r,c)&&r[c]&&e.push(c)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.React;var t=r(184),n=r.n(t);const o=window.wp.i18n,i=window.wp.hooks,s=window.wp.blockEditor,c=window.wp.components;(0,i.addFilter)("blocks.registerBlockType","enable-column-direction/add-attributes",(function(e){return"core/columns"!==e.name?e:{...e,attributes:{...e.attributes,isReversedDirectionOnMobile:{type:"boolean",default:!1}}}})),(0,i.addFilter)("editor.BlockEdit","enable-column-direction/add-inspector-controls",(function(t){return r=>{if("core/columns"!==r.name)return(0,e.createElement)(t,{...r});const{attributes:n,setAttributes:i}=r,{isReversedDirectionOnMobile:l}=n;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t,{...r}),(0,e.createElement)(s.InspectorControls,null,(0,e.createElement)("div",{class:"enable-reverse-direction-container"},(0,e.createElement)(c.ToggleControl,{label:(0,o.__)("Reverse direction on mobile","enable-column-direction"),checked:l,onChange:()=>{i({isReversedDirectionOnMobile:!l})}}))))}})),(0,i.addFilter)("editor.BlockListBlock","enable-column-direction/add-classes",(function(t){return r=>{const{name:o,attributes:i}=r;if("core/columns"!==o||!i?.isReversedDirectionOnMobile)return(0,e.createElement)(t,{...r});const s=n()(r?.className,{"is-reversed-direction-on-mobile":i?.isReversedDirectionOnMobile});return(0,e.createElement)(t,{...r,className:s})}}))})()})();
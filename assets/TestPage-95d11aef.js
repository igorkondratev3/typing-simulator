import{r as l,o as Y,d as M,a as v,c as b,t as I,b as r,F as E,e as H,w as V,v as Z,f as ee,g as C,h as te,i as k,n as R,j as se,u as ae,k as K,l as g,m as O,p as B,q as j,_ as z}from"./index-9cd4c9e6.js";import{_ as re}from"./testStatistic.vue_vue_type_style_index_0_lang-f82f6ae7.js";import{_ as ne}from"./TheHeader.vue_vue_type_style_index_0_lang-4fb7d97b.js";const oe=async e=>{try{const t=await(await fetch(`https://baconipsum.com/api/?type=meat-and-filler&sentences=${e}`)).json();if(!t)throw new Error("Отсутствует текст");return{text:t}}catch(n){return console.error(n),{error:"Ошибка при получении текста. Попробуйте еще раз."}}},le=e=>{e.value||(e.value=!0,setTimeout(()=>e.value=!1,2500))},ce=e=>!(e>="А"&&e<="я"||e==="ё"||e==="Ё"),ue=e=>{e.key===" "&&e.preventDefault()},ie=()=>{const e=l(0),n=l(0),t=l(100);let o=0,c=0,s,i=0;const f=()=>{c=Date.now(),s=setInterval(()=>{n.value=Math.round(e.value/((Date.now()-c)/1e3/60))},1e3)},d=()=>{clearInterval(s),n.value=Math.round(e.value/((Date.now()-c)/1e3/60))};return Y(()=>clearInterval(s)),{printSpeed:n,currentLetterNumber:e,accuracy:t,increaseError:()=>o++,startTest:f,finishTest:d,calcAccuracyStep:S=>i=100/S,calcAccuracy:()=>t.value-=i,normalizeAccuracy:S=>{t.value<0&&(t.value=0),o===S&&(t.value=0)},resetStatistic:()=>{clearInterval(s),e.value=0,n.value=0,t.value=100,o=0,c=0,s=void 0,i=0}}},_e={class:"service-message"},pe=M({__name:"serviceMessage",props:{message:{}},setup(e){return(n,t)=>(v(),b("div",_e,I(n.message),1))}});const ve={class:"dialog__wrapper"},de={class:"dialog__test-setup test-setup"},ye=r("h2",{class:"test-setup__header"},"Настройка параметров теста",-1),me={class:"test-setup__parameter setup-parameter"},ge=r("h3",{class:"setup-parameter__header"},"Количетво предложений в тексте",-1),fe={class:"setup-parameter__parameter sentences"},he={class:"sentence__value"},be=["autofocus","value"],Se={class:"test-setup__parameter setup-parameter"},Te=r("h3",{class:"setup-parameter__header"},"Показывать клавиатуру",-1),ke=["disabled"],xe=M({__name:"testSetup",emits:["goToTest"],setup(e,{emit:n}){const t=JSON.parse(localStorage.getItem("testSetup")||"null"),o=l((t==null?void 0:t.sentences)||3),c=l((t==null?void 0:t.keyboardVisibility)??!0),s=l(!1),i=l(""),f=async()=>{s.value=!0,i.value="Загружаем текст";const d=await oe(o.value);if(d.error){i.value=d.error,s.value=!1;return}const _={sentences:o.value,keyboardVisibility:c.value};localStorage.setItem("testSetup",JSON.stringify(_)),i.value="",s.value=!1,n("goToTest",d.text,c.value)};return(d,_)=>(v(),b("div",ve,[r("div",de,[ye,r("div",me,[ge,r("div",fe,[(v(),b(E,null,H(5,u=>r("label",{class:"sentences__sentence sentence",key:u+"sentences"},[r("h5",he,I(u),1),V(r("input",{class:"sentence__radio",type:"radio",name:"sentences",autofocus:u===o.value,value:u,"onUpdate:modelValue":_[0]||(_[0]=T=>o.value=T)},null,8,be),[[Z,o.value]])])),64))])]),r("label",Se,[Te,V(r("input",{class:"setup-parameter__parameter keyboard-visibility",type:"checkbox","onUpdate:modelValue":_[1]||(_[1]=u=>c.value=u),onKeyup:_[2]||(_[2]=C(u=>c.value=!c.value,["enter"]))},null,544),[[ee,c.value]])]),r("button",{class:"test-setup__start",onClick:f,disabled:s.value}," Начать ",8,ke),V(k(pe,{message:i.value,class:R({"service-message_blue":s.value})},null,8,["message","class"]),[[te,i.value]])])]))}});const we="/typing-simulator/assets/restart-2bd398d3.svg",Ce=r("img",{class:"restart-button__icon",src:we,alt:"restart"},null,-1),Me=[Ce],$e=M({__name:"restartButton",emits:["restartTest"],setup(e){return(n,t)=>(v(),b("button",{class:"restart-button",tabindex:"-1",title:"Начать заново",onClick:t[0]||(t[0]=o=>n.$emit("restartTest"))},Me))}});const Pe=["onKeydown"],Ae={class:"typing-test"},Ve={class:"typing-test__statistic-and-content"},Ke={class:"typing-test__text-content text-content",lang:"us"},Ee=M({__name:"TestPage",setup(e){var N;const n=j(()=>z(()=>import("./theKeyboard-fe25dc2b.js"),["assets/theKeyboard-fe25dc2b.js","assets/theKeyboard.vue_vue_type_style_index_0_lang-2bde6cb7.js","assets/index-9cd4c9e6.js","assets/index-087c307b.css","assets/theKeyboard-7e54f906.css"])),t=j(()=>z(()=>import("./serviceMessage-9a3d5758.js"),["assets/serviceMessage-9a3d5758.js","assets/index-9cd4c9e6.js","assets/index-087c307b.css","assets/testStatistic.vue_vue_type_style_index_0_lang-f82f6ae7.js","assets/testStatistic-44ea2bf5.css","assets/TheHeader.vue_vue_type_style_index_0_lang-4fb7d97b.js","assets/TheHeader-1ddfafc4.css"])),o=l(null);se(()=>{var a;(a=o.value)==null||a.showModal()});const c=l(null),s=l([]),i=(N=JSON.parse(localStorage.getItem("testSetup")||"null"))==null?void 0:N.keyboardVisibility,f=l(i??!0),d=(a,y)=>{var m,h;f.value=y,s.value=[...a[0].replaceAll("  "," ")],q(s.value.length),(m=o.value)==null||m.close(),(h=c.value)==null||h.focus()},_=ae(),u=l(!1),T=l(!1),{currentLetterNumber:p,printSpeed:$,accuracy:S,increaseError:F,startTest:J,finishTest:U,calcAccuracyStep:q,calcAccuracy:G,normalizeAccuracy:D,resetStatistic:Q}=ie(),x=l(""),w=a=>{x.value=a,setTimeout(()=>x.value="",50)},P=l(!1),W=a=>{P.value=!a.getModifierState("CapsLock"),w("CAPS")};let A=!1;const L=a=>{if(ue(a),!ce(a.key)){le(T);return}A||(P.value=a.getModifierState("CapsLock"),J(),A=!0),w(a.key),a.key!==s.value[p.value]&&(u.value||(G(),D(s.value.length),F()),u.value=!0),a.key===s.value[p.value]&&(p.value++,u.value=!1),p.value===s.value.length&&(U(),D(s.value.length),_.push({name:"CompletePage",query:{accuracy:S.value.toFixed(2),printSpeed:String($.value)}}))},X=()=>{var a;Q(),A=!1,u.value=!1,x.value="",(a=o.value)==null||a.showModal()};return(a,y)=>(v(),b(E,null,[r("dialog",{class:"dialog",ref_key:"setupModal",ref:o,onCancel:y[0]||(y[0]=K(()=>{},["prevent"]))},[k(xe,{onGoToTest:d})],544),r("div",{class:"test-page page-wrapper",ref_key:"testPage",ref:c,tabindex:"1",onKeypress:L,onKeydown:[C(K(L,["prevent"]),["tab"]),y[1]||(y[1]=C(m=>w("BS"),["backspace"])),C(W,["caps-lock"]),y[2]||(y[2]=K(m=>w(m.code),["shift","exact"]))]},[k(ne,{hideHeaderHeightLess600:f.value,toHomePageVisibility:!0},null,8,["hideHeaderHeightLess600"]),r("main",Ae,[r("div",Ve,[k(re,{accuracy:g(S).toFixed(2),printSpeed:String(g($))},null,8,["accuracy","printSpeed"]),r("div",Ke,[(v(!0),b(E,null,H(s.value,(m,h)=>(v(),b("span",{class:R(["text-content__letter",{"text-content__letter_current":h===g(p),"text-content__letter_completed":h<g(p),"text-content__letter_error":h===g(p)&&u.value}]),key:h+m},I(m),3))),128)),k($e,{onRestartTest:X}),T.value?(v(),O(g(t),{key:0,message:"Смените раскладку клавиатуры на английскую"})):B("",!0)])]),f.value?(v(),O(g(n),{key:0,language:"english",necessaryKey:s.value[g(p)],pressedKey:x.value,isCapsEnabled:P.value},null,8,["necessaryKey","pressedKey","isCapsEnabled"])):B("",!0)])],40,Pe)],64))}});const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:Ee},Symbol.toStringTag,{value:"Module"}));export{Ne as T,pe as _};
import{d as n,c,i as s,b as t,t as a,s as r,l as _,a as l,R as p}from"./index-9cd4c9e6.js";import{_ as m}from"./testStatistic.vue_vue_type_style_index_0_lang-f82f6ae7.js";import{_ as u}from"./theKeyboard.vue_vue_type_style_index_0_lang-2bde6cb7.js";import{_ as d}from"./TheHeader.vue_vue_type_style_index_0_lang-4fb7d97b.js";const g={class:"complete-page page-wrapper"},f={class:"complete-page__main"},y={class:"complete-page__message-and-link"},h={class:"complete-page__message complete-message"},b={class:"complete-message__value"},k=t("button",{class:"test-link__button",tabindex:"-1"}," Пройти тест повторно ",-1),O=n({__name:"CompletePage",props:{accuracy:{},printSpeed:{}},setup(v){const o=JSON.parse(JSON.stringify(history.state));o.current="/typing-simulator/complete",history.replaceState(o,"","/typing-simulator/complete");const i=e=>e%100>=11&&e%100<=19||e%10===0?"знаков":e%10===1?"знак":e%10>=2&&e%10<=4?"знака":"знаков";return(e,S)=>(l(),c("div",g,[s(d,{hideHeaderHeightLess600:!1,toHomePageVisibility:!0}),t("main",f,[t("div",y,[t("div",h,[s(m,{accuracy:e.accuracy,printSpeed:e.printSpeed},null,8,["accuracy","printSpeed"]),t("p",b," Вы печатаете текст на английском языке со скоростью "+a(e.printSpeed)+" "+a(i(Number(e.printSpeed)))+" в минуту и с точность "+a(e.accuracy)+"%. ",1)]),s(_(p),{class:"complete-page__test-link test-link",to:"/test"},{default:r(()=>[k]),_:1})]),s(u,{language:"english"})])]))}});export{O as default};

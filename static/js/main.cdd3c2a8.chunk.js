(this["webpackJsonpetf-vis"]=this["webpackJsonpetf-vis"]||[]).push([[0],{159:function(t,e,a){},160:function(t,e,a){},163:function(t,e,a){"use strict";a.r(e);var n=a(8),i=a.n(n),r=a(48),s=a.n(r),o=(a(159),a(160),a(3)),c=a.n(o),u=a(11),l=a(6),d=a(7),h=a(14),f=a(26),p=a(30),v=a(0),g=a(5),m=a(29),y=a.n(m),b=a(1),x=36e5,C=12;function j(t){return 0===t.getMonth()}function D(t,e){return t.getFullYear()<e.getFullYear()}function P(t){return Math.round(100*t)/100}function F(t,e){return O.apply(this,arguments)}function O(){return(O=Object(u.a)(c.a.mark((function t(e,a){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.c("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=".concat(e,"&apikey=").concat(a,"&datatype=csv"),(function(t){return{date:new Date(t.timestamp.toString()),dividend:parseFloat(t["dividend amount"]),course:parseFloat(t["adjusted close"])}}));case 2:return(n=t.sent).sort((function(t,e){return t.date-e.date})),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(t){return t.map((function(t){return[T(t.date),t.course]}))}function M(t){var e=t[0].date.getFullYear(),a=[[e,0]];return t.forEach((function(t){t.date.getFullYear()===e?a[a.length-1][1]+=t.dividend:(e=t.date.getFullYear(),a.push([e,t.dividend]))})),a.sort((function(t,e){return t[0]-e[0]})),a}function T(t){return Math.floor(t.getTime()/x)}var w=function(){function t(){Object(l.a)(this,t),this.historicalData={},this.coursePredictors={},this.dividendPredictors={}}return Object(d.a)(t,[{key:"loadAndCacheHistoricalETFData",value:function(){var e=Object(u.a)(c.a.mark((function e(a){var n,i,r,s,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a in this.historicalData)){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,F(a);case 4:n=e.sent,i=k(n),r=t._calculateMaxTimestampBeforePredictorRepetition(i),s=M(n),o=t._calculateMaxTimestampBeforePredictorRepetition(s),this.historicalData[a]={history:n,courseForecastArray:i,dividendForecastArray:s},this.coursePredictors[a]={maxTimestampBeforeCoursePredictorRepetition:r},this.dividendPredictors[a]={maxYearBeforeDividendPredictorRepetition:o};case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_createCoursePredictorIfNotPresent",value:function(e,a){if(!(a in this.coursePredictors[e])){var n=this.historicalData[e].courseForecastArray,i=n[n.length-1][0]-Math.abs(n[n.length-1][0]-a)*t.backCastTimeFactor-t.backCastTimestampConstant,r=n.filter((function(t){return t[0]>=i}));this.coursePredictors[e][a]=y.a.linear(r)}}},{key:"_courseDateToPredictorTimestampAndDateTimestamp",value:function(t,e){var a=T(t);return[a>this.coursePredictors[e].maxTimestampBeforeCoursePredictorRepetition?this.coursePredictors[e].maxTimestampBeforeCoursePredictorRepetition:a,a]}},{key:"_createDividendPredictorIfNotPresent",value:function(e,a){if(!(a in this.dividendPredictors[e])){var n=this.historicalData[e].dividendForecastArray,i=n[n.length-1][0]-Math.abs(n[n.length-1][0]-a)*t.backCastTimeFactor-t.backCastTimestampConstant,r=n.filter((function(t){return t[0]>=i}));this.dividendPredictors[e][a]=y.a.linear(r)}}},{key:"_dividendYearToPredictorYear",value:function(t,e){return this.dividendPredictors[t].maxYearBeforeDividendPredictorRepetition<e?this.dividendPredictors[t].maxYearBeforeDividendPredictorRepetition:e}},{key:"predictCourse",value:function(t,e){if(!(t in this.coursePredictors))throw"First call loadHistoricalDataIfNotPresent() before predicting";var a=this._courseDateToPredictorTimestampAndDateTimestamp(e,t),n=Object(g.a)(a,2),i=n[0],r=n[1];return this._createCoursePredictorIfNotPresent(t,i),this.coursePredictors[t][i].predict(r)[1]}},{key:"predictDividend",value:function(t,e){if(!(t in this.dividendPredictors))throw"First call loadHistoricalDataIfNotPresent() before predicting";var a=this._dividendYearToPredictorYear(t,e);return this._createDividendPredictorIfNotPresent(t,a),Math.max(0,this.dividendPredictors[t][a].predict(e)[1])}}],[{key:"configure",value:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:7;t.apiKey=e,t.backCastTimeFactor=a;var i=new Date(0);if(i.setMonth(n),t.backCastTimestampConstant=T(i),null!=t.instance){var r=t.getInstance();for(var s in r.coursePredictors)r.coursePredictors[s]={maxTimestampBeforeCoursePredictorRepetition:t._calculateMaxTimestampBeforePredictorRepetition(r.historicalData[s].courseForecastArray)};for(var o in r.dividendPredictors)r.dividendPredictors[o]={maxYearBeforeDividendPredictorRepetition:t._calculateMaxTimestampBeforePredictorRepetition(r.historicalData[o].dividendForecastArray)}}}},{key:"getInstance",value:function(){return null==t.instance&&(t.instance=new t),t.instance}},{key:"_calculateMaxTimestampBeforePredictorRepetition",value:function(e){var a=e[0][0],n=e[e.length-1][0];return n+(n-a)/t.backCastTimeFactor}}]),t}();w.instance=null,w.apiKey=null,w.backCastTimeConstant=null,w.backCastTimeFactor=null;var I=w,A=.26375;function Y(t,e,a,n){var i=w.getInstance(),r=i.predictCourse(n,e);return P(t*(i.predictCourse(n,a)/r)-t)}function R(t,e){var a=t*e.percentageCosts+e.fixedCosts;return[t-a,a]}function B(t,e,a,n,i){if(!D(n,i))return[0,e];var r=function(t,e){return[Math.max(0,t-e),Math.max(0,e-t)]}(function(t,e){return Math.min(.7*t*.005,e)}(a,t),e),s=Object(g.a)(r,2),o=s[0],c=s[1];return[.7*o*A,c]}var _=function(){function t(e,a,n,i,r,s,o,c){Object(l.a)(this,t),this.initialDate=e,this.lastYearModelValues=o,this.startDate=a,this.newInvestmentAmount=i,this.endDate=n,this.etfIdentifierToRatio=r,this.costConfiguration=s,this.costs=o.costs,this.costs=o.costs,this.taxes=o.taxes,this.etfs={},this.yearBeginningCapital=j(this.startDate)?o.totalAmount:o.yearBeginningCapital,this.totalAmount=0,this.investedMoney=o.investedMoney+i,this.leftoverTaxFreeAmount=j(this.startDate)?c:o.leftoverTaxFreeAmount,this.calculate()}return Object(d.a)(t,[{key:"calculate",value:function(){var t=0;for(var e in this.lastYearModelValues.etfs){var a=this.etfIdentifierToRatio[e]*this.newInvestmentAmount;this.etfs[e]={},t+=this.calculateNextEtfValueAndCosts(e,a)}var n=B(this.totalAmount-this.yearBeginningCapital-t,this.leftoverTaxFreeAmount,this.yearBeginningCapital,this.startDate,this.endDate),i=Object(g.a)(n,2),r=i[0],s=i[1];this.taxes+=r,this.leftoverTaxFreeAmount=s,this.inflation=function(t,e,a){var n=a.getFullYear()-e.getFullYear()+(a.getMonth()-e.getMonth())/C;return t-t*Math.pow(.99,n)}(this.totalAmount,this.initialDate,this.endDate)}},{key:"calculateNextEtfValueAndCosts",value:function(t,e){var a=this.lastYearModelValues.etfs[t],n=Y(a.capital,this.startDate,this.endDate,t),i=Y(a.dividend,this.startDate,this.endDate,t),r=function(t,e,a,n,i){for(var r=(i.getFullYear()-n.getFullYear())*C+i.getMonth()-n.getMonth(),s=R(t/r,e),o=Object(g.a)(s,2),c=o[0],u=o[1]*r,l=c*r,d=0,h=r;h>0;h--)d+=Y(c,n,i,a);return[l,d,u]}(e,this.costConfiguration,t,this.startDate,this.endDate),s=Object(g.a)(r,3),o=s[0],c=s[1],u=s[2],l=function(t,e,a){return D(e,a)?P(w.getInstance().predictDividend(t,e.getFullYear())):0}(t,this.startDate,this.endDate),d=n+i+c+l,h=a.capital+d+o;return this.etfs[t].capital=h,this.etfs[t].dividend=a.dividend+l+i,this.totalAmount+=h,this.costs+=u,o}}],[{key:"getInitialModelValues",value:function(t,e,a,n,i){for(var r=R(t,a),s=Object(g.a)(r,2),o=s[0],c={costs:s[1],taxes:0,inflation:0,investedMoney:t,etfs:{},yearBeginningCapital:o,totalAmount:o,leftoverTaxFreeAmount:n,startDate:i,endDate:i},u=0,l=Object.entries(e);u<l.length;u++){var d=Object(g.a)(l[u],2),h=d[0],f=d[1];c.etfs[h]={capital:f*o,dividend:0}}return c}}]),t}();function V(t,e){var a=t.getMonth()+e,n=a%C,i=t.getFullYear()+Math.floor(a/C);return new Date(i,n)}var S,E=function(){function t(e,a,n,i,r,s,o){var c=arguments.length>7&&void 0!==arguments[7]?arguments[7]:C;if(Object(l.a)(this,t),!Number.isInteger(c/C))throw"currently only month lengths that are a factor of ".concat(C," are allowed.");this.taxFreeAmount=o,this.startCapital=e,this.investmentPerPeriod=a*c,this.savingPhaseLength=n,this.etfIdentifierToRatio=i,this.costConfiguration=r,this.age=s,this.intervalLengthInMonths=c,this._calculateTimestampsForVisualization(),this._calculateAllYearModels()}return Object(d.a)(t,[{key:"_calculateTimestampsForVisualization",value:function(){for(var t=function(t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,a=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:80)-t,n=new Date(0);n.setFullYear((new Date).getFullYear());var i=new Date(0);return i.setFullYear((new Date).getFullYear()+a+e),[n,i]}(this.age),e=Object(g.a)(t,2),a=e[0],n=e[1],i=[],r=a;r<=n;)i.push(r),r=V(r,this.intervalLengthInMonths);this.dates=i,this.nextFutureDate=r}},{key:"_calculateAllYearModels",value:function(){for(var t=[_.getInitialModelValues(this.startCapital,this.etfIdentifierToRatio,this.costConfiguration,this.taxFreeAmount,this.dates[0])],e=0;e<this.dates.length-1;e++){var a=t[t.length-1];t.push(new _(this.dates[0],this.dates[e],this.dates[e+1],this.investmentPerPeriod,this.etfIdentifierToRatio,this.costConfiguration,a,this.taxFreeAmount))}this.dates.length>1&&(t.push(new _(this.dates[0],this.dates[this.dates.length-1],this.nextFutureDate,this.investmentPerPeriod,this.etfIdentifierToRatio,this.costConfiguration,t[t.length-1],this.taxFreeAmount)),this.yearModels=t)}},{key:"renderVisualization",value:function(t){for(var e=1e3,a=b.i(t).append("svg").attr("id","firstSVG").attr("height","100%").attr("width","100%").attr("viewBox","0 0 ".concat(1300," ").concat(480)).append("g").attr("transform","translate(".concat([150,40],")")),n=this.yearModels.map((function(t){return t.getD3Representation()})),i=n.map((function(t){return t.extent})),r=b.f(i.map((function(t){return t[0]}))),s=b.e(i.map((function(t){return t[1]}))),o=b.g().domain([r,s]).range([400,0]),c=b.h().domain([this.dates[0],this.nextFutureDate]).range([0,e]),u=e/this.dates.length*.9,l=0;l<this.yearModels.length;l++){var d=this.yearModels[l],h=d.date,f=h.toDateString().split(" ").join("_"),p=d.getD3Representation().bars;a.selectAll("rect.".concat(f)).append("g").attr("class",f).data(p).enter().append("rect").attr("x",c(h)).attr("y",(function(t){return o(t.yStart)})).attr("width",u).attr("height",(function(t){return o(t.yEnd)-o(t.yStart)})).attr("class",(function(t){return t.class}))}a.append("g").style("font-size","20px").call(b.b(o).tickFormat((function(t){return"".concat(t.toLocaleString()," EUR")}))),a.append("g").style("font-size","20px").attr("transform","translate(0, ".concat(400,")")).call(b.a(c)),a.append("g").append("line").attr("x1",c(this.dates[0])).attr("y1",o(0)).attr("x2",c(this.nextFutureDate)).attr("y2",o(0)).attr("stroke-width",3).attr("stroke","black");var v=n.map((function(t){return t.investedMoney}));v.unshift({date:this.dates[0],money:this.startCapital}),a.append("path").datum(v).attr("fill","none").attr("id","investedMoney").attr("stroke-width",3).attr("d",b.d().x((function(t){return c(t.date)})).y((function(t){return o(t.money)})))}},{key:"updateVisualization",value:function(){}}]),t}(),z=a(2),N=function(){function t(){Object(l.a)(this,t)}return Object(d.a)(t,[{key:"render",value:function(t,e){e.innerHTML="";var a=b.i(e).append("svg").attr("id","firstSVG").attr("height","100%").attr("width","100%").attr("viewBox","0 0 ".concat(1300," ").concat(480)).append("g").attr("transform","translate(".concat([150,40],")")),n={costs:0,taxes:1,inflation:2},i=3,r="capital",s="dividend";for(var o in t.etfIdentifierToRatio)n[o+s]=i++,n[o+r]=i++;for(var c=[],u=0;u<i;u++)c.push([]);var l,d=Object(z.a)(t.yearModels);try{for(d.s();!(l=d.n()).done;){var h=l.value;c[n.costs].push({value:-h.costs,date:h.endDate}),c[n.taxes].push({value:-h.taxes-h.costs,date:h.endDate}),c[n.inflation].push({value:-h.inflation-h.taxes-h.costs,date:h.endDate});var f=0;for(var p in t.etfIdentifierToRatio)c[n[p+r]].push({value:h.etfs[p].capital+f,date:h.endDate}),c[n[p+s]].push({value:h.etfs[p].capital-h.etfs[p].dividend+f,date:h.endDate}),f+=h.etfs[p].capital}}catch(j){d.e(j)}finally{d.f()}for(var v in c[n.inflation].cssClass="inflation",c[n.taxes].cssClass="taxes",c[n.costs].cssClass="costs",t.etfIdentifierToRatio)c[n[v+s]].cssClass="".concat(v,"_dividend"),c[n[v+r]].cssClass="".concat(v,"_total_amount");var g=b.f(c[n.inflation].map((function(t){return t.value}))),m=b.e(c[c.length-1].map((function(t){return t.value}))),y=b.g().domain([g,m]).range([400,0]),x=b.h().domain([t.dates[0],t.nextFutureDate]).range([0,1e3]);a.append("g").style("font-size","20px").call(b.b(y).tickFormat((function(t){return"".concat(t.toLocaleString()," EUR")}))),a.append("g").style("font-size","20px").attr("transform","translate(0, ".concat(400,")")).call(b.a(x)),a.append("g").append("line").attr("x1",x(t.dates[0])).attr("y1",y(0)).attr("x2",x(t.nextFutureDate)).attr("y2",y(0)).attr("stroke-width",3).attr("stroke","black");for(var C=0;C<c.length;C++)a.append("path").datum(c[C]).attr("fill","none").attr("class",(function(t){return t.cssClass})).attr("stroke-width",3).attr("d",b.d().x((function(t){return x(t.date)})).y((function(t){return y(t.value)})))}}]),t}(),L=a(4),H="startingCapital",U="monthlyInvestment",J="transactionCosts",G="transactionCostsType",K="savingPhase",q="payoutPhase",Q="age",W="taxFreeAmount",X=(S={},Object(v.a)(S,H,"Starting Capital"),Object(v.a)(S,U,"Monthly Investment"),Object(v.a)(S,J,"Transaction Costs"),Object(v.a)(S,G,"Fixes Amount ?"),Object(v.a)(S,K,"Saving Phase"),Object(v.a)(S,q,"Payout Phase"),Object(v.a)(S,Q,"Your Age"),Object(v.a)(S,W,"Tax Free Amount"),S),Z=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(t){var n,r;return Object(l.a)(this,a),(r=e.call(this,t)).state=(n={},Object(v.a)(n,H,{value:1e4,type:"text"}),Object(v.a)(n,U,{value:100,type:"text"}),Object(v.a)(n,J,{value:.005,type:"text"}),Object(v.a)(n,G,{value:!1,type:"checkbox"}),Object(v.a)(n,K,{value:40,type:"text"}),Object(v.a)(n,q,{value:20,type:"text"}),Object(v.a)(n,Q,{value:30,type:"text"}),Object(v.a)(n,W,{value:801,type:"text"}),n),r.ref=i.a.createRef(),r.handleChange=r.handleChange.bind(Object(h.a)(r)),r}return Object(d.a)(a,[{key:"handleChange",value:function(t,e){this.setState(Object(v.a)({},e,{value:t,type:this.state[e].type})),console.log("State ".concat(e," changed value to ").concat(t,"."))}},{key:"getVisualizationModel",value:function(){return new E(this.state.startingCapital.value,this.state.monthlyInvestment.value,this.state.savingPhase.value,{IBM:1},{percentageCosts:0,fixedCosts:5},this.state.age.value,this.state.taxFreeAmount.value)}},{key:"componentDidMount",value:function(){var t=Object(u.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return I.configure("demo"),this.forecastModel=I.getInstance(),t.next=4,this.forecastModel.loadAndCacheHistoricalETFData("IBM");case 4:(new N).render(this.getVisualizationModel(),this.ref.current);case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){(new N).render(this.getVisualizationModel(),this.ref.current)}},{key:"render",value:function(){var t=this;return Object(L.jsxs)(i.a.Fragment,{children:[Object(L.jsx)("form",{children:Object.keys(this.state).map((function(e){return Object(L.jsx)($,{label:X[e],value:t.state[e].value,type:t.state[e].type,onValueChange:t.handleChange,stateIdentifier:e},e)}))}),Object(L.jsx)("div",{ref:this.ref})]})}}]),a}(i.a.Component),$=function(t){Object(f.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).handleChange=n.handleChange.bind(Object(h.a)(n)),n}return Object(d.a)(a,[{key:"handleChange",value:function(t){var e=t.target.value;"checkbox"===this.props.type&&(e=!this.props.value),this.props.onValueChange(e,this.props.stateIdentifier)}},{key:"render",value:function(){return Object(L.jsxs)("label",{children:[this.props.label,Object(L.jsx)("input",{type:this.props.type,value:this.props.value,onChange:this.handleChange})]})}}]),a}(i.a.Component),tt=Z;var et=function(){return Object(L.jsx)("div",{className:"Input",children:Object(L.jsx)(tt,{})})},at=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,164)).then((function(e){var a=e.getCLS,n=e.getFID,i=e.getFCP,r=e.getLCP,s=e.getTTFB;a(t),n(t),i(t),r(t),s(t)}))};s.a.render(Object(L.jsx)(i.a.StrictMode,{children:Object(L.jsx)(et,{})}),document.getElementById("root")),at()}},[[163,1,2]]]);
//# sourceMappingURL=main.cdd3c2a8.chunk.js.map
//>>built
define("dojox/mobile/_compat",["dojo/_base/array","dojo/_base/config","dojo/_base/connect","dojo/_base/fx","dojo/_base/lang","dojo/sniff","dojo/_base/window","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/dom-attr","dojo/fx","dojo/fx/easing","dojo/ready","dojo/uacss","dijit/registry","dojox/fx","dojox/fx/flip","./EdgeToEdgeList","./IconContainer","./ProgressIndicator","./RoundRect","./RoundRectList","./ScrollableView","./Switch","./View","./Heading","require"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,fx,_d,_e,_f,_10,xfx,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a,_1b){
var dm=_5.getObject("dojox.mobile",true);
if(!(_6("webkit")||_6("ie")===10||(!_6("ie")&&_6("trident")>6))){
_5.extend(_19,{_doTransition:function(_1c,_1d,_1e,dir){
var _1f;
this.wakeUp(_1d);
var s1,s2;
if(!_1e||_1e=="none"){
_1d.style.display="";
_1c.style.display="none";
_1d.style.left="0px";
this.invokeCallback();
}else{
if(_1e=="slide"||_1e=="cover"||_1e=="reveal"){
var w=_1c.offsetWidth;
s1=fx.slideTo({node:_1c,duration:400,left:-w*dir,top:_b.get(_1c,"top")});
s2=fx.slideTo({node:_1d,duration:400,left:0,top:_b.get(_1d,"top")});
_1d.style.position="absolute";
_1d.style.left=w*dir+"px";
_1d.style.display="";
_1f=fx.combine([s1,s2]);
_3.connect(_1f,"onEnd",this,function(){
if(!this._inProgress){
return;
}
_1c.style.display="none";
_1c.style.left="0px";
_1d.style.position="relative";
var _20=_10.byNode(_1d);
if(_20&&!_8.contains(_20.domNode,"out")){
_20.containerNode.style.paddingTop="";
}
this.invokeCallback();
});
_1f.play();
}else{
if(_1e=="slidev"||_1e=="coverv"||_1e=="reavealv"){
var h=_1c.offsetHeight;
s1=fx.slideTo({node:_1c,duration:400,left:0,top:-h*dir});
s2=fx.slideTo({node:_1d,duration:400,left:0,top:0});
_1d.style.position="absolute";
_1d.style.top=h*dir+"px";
_1d.style.left="0px";
_1d.style.display="";
_1f=fx.combine([s1,s2]);
_3.connect(_1f,"onEnd",this,function(){
if(!this._inProgress){
return;
}
_1c.style.display="none";
_1d.style.position="relative";
this.invokeCallback();
});
_1f.play();
}else{
if(_1e=="flip"){
_1f=xfx.flip({node:_1c,dir:"right",depth:0.5,duration:400});
_1d.style.position="absolute";
_1d.style.left="0px";
_3.connect(_1f,"onEnd",this,function(){
if(!this._inProgress){
return;
}
_1c.style.display="none";
_1d.style.position="relative";
_1d.style.display="";
this.invokeCallback();
});
_1f.play();
}else{
_1f=fx.chain([_4.fadeOut({node:_1c,duration:600}),_4.fadeIn({node:_1d,duration:600})]);
_1d.style.position="absolute";
_1d.style.left="0px";
_1d.style.display="";
_b.set(_1d,"opacity",0);
_3.connect(_1f,"onEnd",this,function(){
if(!this._inProgress){
return;
}
_1c.style.display="none";
_1d.style.position="relative";
_b.set(_1c,"opacity",1);
this.invokeCallback();
});
_1f.play();
}
}
}
}
},wakeUp:function(_21){
if(_6("ie")&&!_21._wokeup){
_21._wokeup=true;
var _22=_21.style.display;
_21.style.display="";
var _23=_21.getElementsByTagName("*");
for(var i=0,len=_23.length;i<len;i++){
var val=_23[i].style.display;
_23[i].style.display="none";
_23[i].style.display="";
_23[i].style.display=val;
}
_21.style.display=_22;
}
}});
_5.extend(_18,{_changeState:function(_24,_25){
var on=(_24==="on");
var pos;
if(!on){
pos=this.isLeftToRight()?-_b.get(this.right,"left"):0;
}else{
pos=this.isLeftToRight()?0:-_b.get(this.right,"left");
}
this.left.style.display="";
this.right.style.display="";
var _26=this;
var f=function(){
_8.remove(_26.domNode,on?"mblSwitchOff":"mblSwitchOn");
_8.add(_26.domNode,on?"mblSwitchOn":"mblSwitchOff");
_26.left.style.display=on?"":"none";
_26.right.style.display=!on?"":"none";
_c.set(_26.domNode,"aria-checked",on?"true":"false");
};
if(_25){
var a=fx.slideTo({node:this.inner,duration:300,left:pos,onEnd:f});
a.play();
}else{
if((this.isLeftToRight()?on:!on)||pos){
this.inner.style.left=pos+"px";
}
f();
}
}});
_5.extend(_14,{scale:function(_27){
if(_6("ie")){
var dim={w:_27,h:_27};
_a.setMarginBox(this.domNode,dim);
_a.setMarginBox(this.containerNode,dim);
}else{
if(_6("ff")){
var _28=_27/40;
_b.set(this.containerNode,{MozTransform:"scale("+_28+")",MozTransformOrigin:"0 0"});
_a.setMarginBox(this.domNode,{w:_27,h:_27});
_a.setMarginBox(this.containerNode,{w:_27/_28,h:_27/_28});
}
}
}});
if(_6("ie")){
_5.extend(_15,{buildRendering:function(){
dm.createRoundRect(this);
this.domNode.className="mblRoundRect";
}});
_16._addChild=_16.prototype.addChild;
_16._postCreate=_16.prototype.postCreate;
_5.extend(_16,{buildRendering:function(){
dm.createRoundRect(this,true);
this.domNode.className="mblRoundRectList";
if(_6("ie")&&_6("dojo-bidi")&&!this.isLeftToRight()){
this.domNode.className="mblRoundRectList mblRoundRectListRtl";
}
},postCreate:function(){
_16._postCreate.apply(this,arguments);
this.redrawBorders();
},addChild:function(_29,_2a){
_16._addChild.apply(this,arguments);
this.redrawBorders();
if(dm.applyPngFilter){
dm.applyPngFilter(_29.domNode);
}
},redrawBorders:function(){
if(this instanceof _12){
return;
}
var _2b=false;
for(var i=this.containerNode.childNodes.length-1;i>=0;i--){
var c=this.containerNode.childNodes[i];
if(c.tagName=="LI"){
c.style.borderBottomStyle=_2b?"solid":"none";
_2b=true;
}
}
}});
_5.extend(_12,{buildRendering:function(){
this.domNode=this.containerNode=this.srcNodeRef||_7.doc.createElement("ul");
this.domNode.className="mblEdgeToEdgeList";
}});
_13._addChild=_13.prototype.addChild;
_5.extend(_13,{addChild:function(_2c,_2d){
_13._addChild.apply(this,arguments);
if(dm.applyPngFilter){
dm.applyPngFilter(_2c.domNode);
}
}});
_5.mixin(dm,{createRoundRect:function(_2e,_2f){
var i,len;
_2e.domNode=_7.doc.createElement("div");
_2e.domNode.style.padding="0px";
_2e.domNode.style.backgroundColor="transparent";
_2e.domNode.style.border="none";
_2e.containerNode=_7.doc.createElement(_2f?"ul":"div");
_2e.containerNode.className="mblRoundRectContainer";
if(_2e.srcNodeRef){
_2e.srcNodeRef.parentNode.replaceChild(_2e.domNode,_2e.srcNodeRef);
for(i=0,len=_2e.srcNodeRef.childNodes.length;i<len;i++){
_2e.containerNode.appendChild(_2e.srcNodeRef.removeChild(_2e.srcNodeRef.firstChild));
}
_2e.srcNodeRef=null;
}
_2e.domNode.appendChild(_2e.containerNode);
for(i=0;i<=5;i++){
var top=_9.create("div");
top.className="mblRoundCorner mblRoundCorner"+i+"T";
_2e.domNode.insertBefore(top,_2e.containerNode);
var _30=_9.create("div");
_30.className="mblRoundCorner mblRoundCorner"+i+"B";
_2e.domNode.appendChild(_30);
}
}});
_5.extend(_17,{postCreate:function(){
var _31=_9.create("div",{className:"mblDummyForIE",innerHTML:"&nbsp;"},this.containerNode,"first");
_b.set(_31,{position:"relative",marginBottom:"-2px",fontSize:"1px"});
}});
}
if(_6("ie")<=6){
dm.applyPngFilter=function(_32){
_32=_32||_7.body();
var _33=_32.getElementsByTagName("IMG");
var _34=_1b.toUrl("dojo/resources/blank.gif");
for(var i=0,len=_33.length;i<len;i++){
var img=_33[i];
var w=img.offsetWidth;
var h=img.offsetHeight;
if(w===0||h===0){
if(_b.get(img,"display")!="none"){
continue;
}
img.style.display="";
w=img.offsetWidth;
h=img.offsetHeight;
img.style.display="none";
if(w===0||h===0){
continue;
}
}
var src=img.src;
if(src.indexOf("resources/blank.gif")!=-1){
continue;
}
img.src=_34;
img.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"')";
img.style.width=w+"px";
img.style.height=h+"px";
}
};
if(!dm._disableBgFilter&&dm.createDomButton){
dm._createDomButton_orig=dm.createDomButton;
dm.createDomButton=function(_35,_36,_37){
var _38=dm._createDomButton_orig.apply(this,arguments);
if(_38&&_38.className&&_38.className.indexOf("mblDomButton")!==-1){
var f=function(){
if(_38.currentStyle&&_38.currentStyle.backgroundImage.match(/url.*(mblDomButton.*\.png)/)){
var img=RegExp.$1;
var src=_1b.toUrl("dojox/mobile/themes/common/domButtons/compat/")+img;
_38.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='crop')";
_38.style.background="none";
}
};
setTimeout(f,1000);
setTimeout(f,5000);
}
return _38;
};
}
}
dm.loadCssFile=function(_39){
if(!dm.loadedCssFiles){
dm.loadedCssFiles=[];
}
if(_7.doc.createStyleSheet){
setTimeout(function(_3a){
return function(){
var ss=_7.doc.createStyleSheet(_3a);
ss&&dm.loadedCssFiles.push(ss.owningElement);
};
}(_39),0);
}else{
dm.loadedCssFiles.push(_9.create("link",{href:_39,type:"text/css",rel:"stylesheet"},_7.doc.getElementsByTagName("head")[0]));
}
};
dm.loadCss=function(_3b){
if(!dm._loadedCss){
var obj={};
_1.forEach(dm.getCssPaths(),function(_3c){
obj[_3c]=true;
});
dm._loadedCss=obj;
}
if(!_5.isArray(_3b)){
_3b=[_3b];
}
for(var i=0;i<_3b.length;i++){
var _3d=_3b[i];
if(!dm._loadedCss[_3d]){
dm._loadedCss[_3d]=true;
dm.loadCssFile(_3d);
}
}
};
dm.getCssPaths=function(){
var _3e=[];
var i,j,len;
var s=_7.doc.styleSheets;
for(i=0;i<s.length;i++){
if(s[i].href){
continue;
}
var r=s[i].cssRules||s[i].imports;
if(!r){
continue;
}
for(j=0;j<r.length;j++){
if(r[j].href){
_3e.push(r[j].href);
}
}
}
var _3f=_7.doc.getElementsByTagName("link");
for(i=0,len=_3f.length;i<len;i++){
if(_3f[i].href){
_3e.push(_3f[i].href);
}
}
return _3e;
};
dm.loadCompatPattern=/\/mobile\/themes\/.*\.css$/;
dm.loadCompatCssFiles=function(_40){
if(_6("ie")&&!_40){
setTimeout(function(){
dm.loadCompatCssFiles(true);
},0);
return;
}
dm._loadedCss=undefined;
var _41=dm.getCssPaths();
if(_6("dojo-bidi")){
_41=dm.loadRtlCssFiles(_41);
}
for(var i=0;i<_41.length;i++){
var _42=_41[i];
if((_42.match(_2.mblLoadCompatPattern||dm.loadCompatPattern)||location.href.indexOf("mobile/tests/")!==-1)&&_42.indexOf("-compat.css")===-1){
var _43=_42.substring(0,_42.length-4)+"-compat.css";
dm.loadCss(_43);
}
}
};
if(_6("dojo-bidi")){
dm.loadRtlCssFiles=function(_44){
for(var i=0;i<_44.length;i++){
var _45=_44[i];
if(_45.indexOf("_rtl")==-1){
var _46="android.css blackberry.css custom.css iphone.css holodark.css base.css Carousel.css ComboBox.css IconContainer.css IconMenu.css ListItem.css RoundRectCategory.css SpinWheel.css Switch.css TabBar.css ToggleButton.css ToolBarButton.css ProgressIndicator.css Accordion.css GridLayout.css FormLayout.css";
var _47=_45.substr(_45.lastIndexOf("/")+1);
if(_46.indexOf(_47)!=-1){
var _48=_45.replace(".css","_rtl.css");
_44.push(_48);
dm.loadCss(_48);
}
}
}
return _44;
};
}
dm.hideAddressBar=function(evt,_49){
if(_49!==false){
dm.resizeAll();
}
};
_e(function(){
if(_2.mblLoadCompatCssFiles!==false){
dm.loadCompatCssFiles();
}
if(dm.applyPngFilter){
dm.applyPngFilter();
}
});
}
return dm;
});

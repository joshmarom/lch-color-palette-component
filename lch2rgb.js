const D50=[.3457/.3585,1,.2958/.3585]
function multiplyMatrices(t,a){let r=t.length;Array.isArray(t[0])||(t=[t]),Array.isArray(a[0])||(a=a.map(t=>[t]));let n=a[0].length,o=a[0].map((t,r)=>a.map(t=>t[r])),_=t.map(t=>o.map(a=>Array.isArray(t)?t.reduce((t,r,n)=>t+r*(a[n]||0),0):a.reduce((a,r)=>a+r*t,0)));return 1===r&&(_=_[0]),1===n?_.map(t=>t[0]):_}
function gam_sRGB(t){return t.map(function(t){let a=t<0?-1:1,r=Math.abs(t);return r>.0031308?a*(1.055*Math.pow(r,1/2.4)-.055):12.92*t})}
function XYZ_to_lin_sRGB(t){return multiplyMatrices([[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]],t)}
function D50_to_D65(t){return multiplyMatrices([[.9554734527042182,-.023098536874261423,.0632593086610217],[-.028369706963208136,1.0099954580058226,.021041398966943008],[.012314001688319899,-.020507696433477912,1.3303659366080753]],t)}
function Lab_to_XYZ(t){var a=24389/27,r=216/24389,n=[];return n[1]=(t[0]+16)/116,n[0]=t[1]/500+n[1],n[2]=n[1]-t[2]/200,[Math.pow(n[0],3)>r?Math.pow(n[0],3):(116*n[0]-16)/a,t[0]>8?Math.pow((t[0]+16)/116,3):t[0]/a,Math.pow(n[2],3)>r?Math.pow(n[2],3):(116*n[2]-16)/a].map((t,a)=>t*D50[a])}
const LCH_to_Lab=(t)=>([t[0],t[1]*Math.cos(t[2]*Math.PI/180),t[1]*Math.sin(t[2]*Math.PI/180)])
const LCH_to_sRGB=_=>gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(_)))))
const alpha_to_string=(t=100)=>t<100?` / ${t}%`:""
const isLCH_within_sRGB=(l, c, h) => {const rgb = LCH_to_sRGB([+l, +c, +h]);const ε = 0.000005;return rgb.reduce((a, b) => a && b >= 0 - ε && b <= 1 + ε, true)}
const force_into_gamut=(r,t,e,n)=>{if(n(r,t,e))return[r,t,e];let o=t,f=0;for(t/=2;o-f>1e-4;)n(r,t,e)?f=t:o=t,t=(o+f)/2;return[r,t,e]};
export const LCH_to_RGB = (l, c, h, a = 100, forceInGamut = true) => {
	if (forceInGamut) [l, c, h] = force_into_gamut(l, c, h, isLCH_within_sRGB)
	const rgb = LCH_to_sRGB([+l,+c,+h])
	const rgbString = rgb.map(x => Math.round(x*255)).join(',')
	return `rgb(${rgbString}${alpha_to_string(a)})`
}

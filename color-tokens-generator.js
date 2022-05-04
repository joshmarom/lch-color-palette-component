import { html } from 'https://cdn.skypack.dev/lit'
import { LCH_to_RGB } from './lch2rgb.js'

const convertColors = (colors) =>{
    const rgbColors = {}

    Object.entries(colors).forEach(([colorName, lch]) => {
        for (let i = 0; i < 10; i++) {
            const colorKey = `${colorName}-${i*100}`
            const l = 100 - (i*10) - 5
            const c = lch.c ? lch.c : 80
            const h = lch.h

            rgbColors[colorKey] = LCH_to_RGB(l, c, h)
        }
    })

    return rgbColors
}

const renderColorTokens = (rgbColors) =>{
    let style = []

    style.push(`:host {`)
    Object.entries(rgbColors).forEach(([colorName, color]) => 
        style.push(`--${colorName}: ${color};`)
    )
    style.push(`}`)
    
    return style.join(' ')
}

export const generateColorTokens = (colors) => {
    const rgbColors = convertColors(colors)
    const style = renderColorTokens(rgbColors)

    return html`<style>${style}</style>`
}
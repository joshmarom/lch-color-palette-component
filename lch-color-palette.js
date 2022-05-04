import { LitElement, html, css } from 'https://cdn.skypack.dev/lit'
import { generateColorTokens } from './color-tokens-generator.js'
import { colors as defaultColors } from './default-colors.js'

class ColorPalette extends LitElement {
	static get properties() {
		return {
			chroma: { type: Number },
			colors: { type: Object },
		}
	}
  
	static get styles() {
    return css`:host { display: block }`
  }

	constructor() {
		super()
		this.chroma = 80
		this.colors = defaultColors
	}

	render() {
    const style = generateColorTokens(this.colors)
		return html`${style}
    <slot></slot>`
	}
}

customElements.define('lch-color-palette', ColorPalette)

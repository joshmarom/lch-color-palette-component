import { LitElement, html, css } from 'https://cdn.skypack.dev/lit'
import { colors as defaultColors } from '../default-colors'

class ColorPaletteCreator extends LitElement {
	static get properties() {
		return {
			chroma: { type: Number },
			colors: { type: Object },
		}
	}
  
	static get styles() {
    return css`
      :host {display: block}
      input[type=range]{
        -webkit-appearance: none;
        height: 1.25rem;
        color: inherit;
      }
      input[type=range]::-webkit-slider-runnable-track {
        height: .25rem;
        background: #ddd;
        border: none;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 0 none;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        background: #000;
        margin-top: -.375rem;
        transition: transform .25s;
      }
      input[type=range]::-webkit-slider-thumb:active {
        background-color: currentColor;
        transform: scale(1.5);
      }
      .color-strips {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 50rem;
        width: 80vw;
        margin-inline: auto;
      }
      .color-entry {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .controls {
        display: flex;
        width: 20rem;
        flex-direction: column;
      }
      .color-label {
        width: 8rem;
        font-size: 1rem;
      }
      .strip {
        width: 100%;
      }
      code.json {
        display: block;
        width: 300px;
        height: 100vh;
        overflow: auto;
        position: fixed;
        bottom: 0;
        right: 0;
        background-color: #fafafa;
      }`
  }

	constructor() {
		super()
		this.chroma = 80
		this.colors = defaultColors
	}

  _handleSlideChange(e) {
    const { value, dataset } = e.target
    const color = dataset.color
    const prop = dataset.prop

    this.colors[color][prop] = Number(value)
    this.requestUpdate()
  }

	render() {
		return html`
    <lch-color-palette colors="${JSON.stringify(this.colors)}">
      <div class="color-strips">
        ${Object.keys(this.colors).map(color => ( html`
          <div class="color-entry" style="color:var(--${color}-500)">
              <code class="color-label">${color}</code>
              <div class="controls">
                  <input type="range" step=".1" max="360" value="${this.colors[color].h}"
                  @input="${this._handleSlideChange}" data-color="${color}" data-prop="h">
                  <input type="range" step=".1" min=".01" max="160" value="${this.colors[color].c}"
                  @input="${this._handleSlideChange}" data-color="${color}" data-prop="c">
              </div>
              <div class="strip">
                <color-strip color="${color}"></color-strip>
              </div>
          </div>`
        ))}
      </div>
    </lch-color-palette>
    <code class="json"><pre>${JSON.stringify(this.colors, null, 2)}</pre></code>`
	}
}

customElements.define('lch-color-palette-creator', ColorPaletteCreator)

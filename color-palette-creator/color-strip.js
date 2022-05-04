import { LitElement, css, html } from 'lit'

export class ColorStrip extends LitElement {
    static get properties() {
        return {
            color: { type: String },
        }
    }

    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                height: 2rem;
                border-radius: .75rem;
                overflow: hidden;
            }
            .color-square {
                background-color: currentColor;
            }
            `
    }

    constructor() {
        super()
        this.color = 'gray'
    }

    firstUpdated() {
        this.renderSquares()
    }

    renderSquares() {
        const squares = []
        for (let i = 0; i < 10; i++) {
            const colorToken = `var(--${this.color}-${i * 100})`;
            squares[i] = html`<div class="color-square" style="color: ${colorToken}"></div>`
        }

        return squares
    }

    render() {
        const squares = this.renderSquares()
        return html`${squares}`
    }
}

customElements.define('color-strip', ColorStrip)

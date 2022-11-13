import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            phase: { state: true },
        }
    }

    constructor() {
        super()
        const state = store.subscribe(this.storeChange)
        this.storeChange(state)
    }

    /**
     * @param {import('../types').state} state 
     */
    storeChange = (state) => {
        if (this.phase === state.phase) return
        this.phase = state.phase
    }

    disconnectedCallback() { store.unsubscribe(this.storeChange) }

    render() {
        const loadSingleHandler = () => store.loadSingle('10182')
        const loadListHandler = () => store.loadList()

        if (this.phase === 'loading') {
            return html`<div>Loading....</div>`
        }

        if (this.phase === 'error') {
            return html`<div>Something went wrong!</div>`
        }

        if (this.phase === 'list') {
            return html`
                <div>
                    <button @click="${loadSingleHandler}">Go to single</button>
                    <podcast-view-list></podcast-view-list>
                </div>
            `
        }

        if (this.phase === 'single') {
            return html`
                <div>
                    <button @click="${loadListHandler}">Go to list</button>
                    <podcast-view-single></podcast-view-single>
                </div>
            `
        }

        throw new Error('Invalid view active')
    }
}

customElements.define('podcast-app', Component)

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

class Component extends LitElement {
    static get properties() {
        return {
            key: { type: String },
            image: { type: String },
            label: { type: String },
            seasons: { type: Number },
        }
    }

    static styles = css`
        .wrapper {
            max-width: 100%;
            max-height: 20rem;
            margin-top: 3px;
            margin-left: 3px;
            margin-right: 3px;
            display: flex;
            background-color: rgb(65, 65, 65);
            color: rgb(204, 204, 204);
            border-radius: 5px;
            position: relative;
            z-index: 1;
            cursor: pointer;
        }

        .wrapper:hover {
            opacity: 0.5;
        }

        .image {
            height: 10rem;
            width: 10rem;
        }

        .image img {
            width: 10rem;
            height: 10rem;
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            object-fit: cover;
            position: absolute;
        }

        .title {
            color: rgb(228, 228, 228);
            width: 10rem auto;
            text-align: center;
        }

        .title p {
            margin-top: 5px;
            margin-left: 5px;
            font-weight: bold;
        }

        .seasons {
            position: absolute;
            left: 86%;
            font-size: small;
        }
    `
    
    render() {
        const seasonsText = `${this.seasons} Season${this.seasons > 1 ? 's' : ''}`

        return html`
            <div class="wrapper">
               <div class="image">
                    <img src="${this.image}">
                </div>
  
                <div class="title">
                    <p>${this.label}</p>
                </div>
  
                <div class="seasons">
                    <p>${seasonsText}</p>
                </div>
            </div>
        `
    }
}

customElements.define('podcast-preview', Component)

import getAllShows from "./getAllShows.js";
import getSingleShow from './getSingleShow.js'

const app = document.querySelector('#app')
if (!app) throw new Error('No app element in HTML')

getAllShows().then(data => {
    console.log(data)
    app.innerHTML = data
})



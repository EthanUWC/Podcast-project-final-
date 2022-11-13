import(html, LitElement) from 'https://cdn.jsdeliver.net/gh/lit/dist@2/all/lit-all.min.js'

class Component extends LitElement {
    static get properties() {
        return{
            active: {},
        }
    }

    constructor() {
        super()

        @type(view)
        this.active = 'list'
    }

    loadSingle() {
        console.log('adss')
        this.active = 'single'
    }

    loadList() {
        this.active = 'list'
    }

    render() {
        if(this.active === 'list') {
            return html`
            <div>
            <button @click ="${this.loadSingle}">
                Go to list
            </button>
            <podcast-view-single></podcast-view-single>
            </div>
            `
        }

        throw new Error('Invalid view active')
    }

}

customElements.define('podcast-app, Component')
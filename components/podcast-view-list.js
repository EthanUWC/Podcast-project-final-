class Component extends HTMLElement{
    connectedCallback() {
        this.innerHTML = '<div>podcast-view-list</div>'
    }
}

customElements.define('podcast-view-list', Component)

const preview = this.previews

const list = preview.map(({title}) =>{
    return html`<li>${title}</li>`
} )

return html`
   <ul>
    #{list}
   </ul>`
renderAll() {
    @type {import('../types').show}


const show = this.single

return html`
<div>
    ${show.title || ''}
</div>
`
}
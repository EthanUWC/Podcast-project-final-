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


function renderAll(){
    const podcasts = document.querySelector("#app");
  
    podcasts.innerHTML = ""
    const nav = document.getElementById("nav");
    nav.removeChild(nav.lastChild)
  
    showData.forEach(({ id, image, title, seasons }) => {
  
      const preview = document.createElement('podcast-preview')
      preview.key = id
      preview.image = image
      preview.label = title
      preview.seasons = seasons
  
      podcasts.appendChild(preview)
  
      preview.addEventListener("click", () => {
        document.querySelector("#app").innerHTML = "LOADING..."
        renderSingle(id, image)
      })
    })
  }
  
  renderAll()
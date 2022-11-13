
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

  /// Callback

const callbackExample = (fn, time) => {
    setTimeout(fn, time)
}

callbackExample(() => {
    console.log('fire1');

    callbackExample(
        () => {
            console.log('fire1');
        
            callbackExample(
                () => () => {
                    console.log('fire1');
                
                    callbackExample(
                        () => () => {
                            console.log('fire1');
                        
                            callbackExample(
                                () => console.log('fire2'), 
                                3000
                            )
                        }, 
                        3000
                    )
                }, 
                3000
            )
        },
        3000
    )
}, 1000)


/// Promise

const promiseExample = (value, time) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(value)
        resolve()
    }, time)
})

promiseExample('fire1', 2000)
    .then(() => promiseExample('fire2', 3000))
    .then(() => promiseExample('fire3', 3000))
    .then(() => promiseExample('fire4', 3000))

/// Async/Await

const asyncExample = async () => {
    await promiseExample('fire1', 2000)
    await promiseExample('fire2', 2000)
    await promiseExample('fire3', 2000)
    await promiseExample('fire4', 2000)
}
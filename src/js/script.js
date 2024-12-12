
const accessKey = 'zy34wjpi7u3vBxgFuA_92i-zoid8sxTM-LUbBEY09is'

const form = document.querySelector('form')
const searchInput = document.getElementById('search_input')

const imagesContainer = document.getElementById('images_container')

const loadMoreBtn = document.getElementById('load_more_btn')

let page = 1

async function fetchImages (text, pageNo) {

    const url = `https://api.unsplash.com/search/photos?query=${text}&per_page=28&page=${page}&client_id=${accessKey}`

    try {

        if (pageNo === 1) {
            imagesContainer.innerHTML = ''
        }

        const response = await fetch(url)

        const data = await response.json()
        console.log(data)

        if ( data.results.length > 0 ) {
            data.results.forEach( (image) => {

                // Make img element
                const imgElemet = document.createElement('div')
                imgElemet.classList.add('img-div')
                imgElemet.innerHTML = ` <img src = ${image.urls.regular}> `
    
                // Make overlay element
                const overlay = document.createElement('div')
                overlay.classList.add('overlay-style')
                
                
                // Make overlay text
                const overlayText = document.createElement('p')
                overlayText.classList.add('overlay-text-style') 
                overlayText.innerHTML = image.alt_description || "Sem descrição"

                overlay.appendChild(overlayText)
                imgElemet.appendChild(overlay)
                imagesContainer.appendChild(imgElemet)
            })

            if(data.total_pages === page) {
                loadMoreBtn.style.display = 'none'
            } else {
                loadMoreBtn.style.display = 'block'
            }
        } 
        else {
            imagesContainer.innerHTML = '<h2>Nenhuma imagem encontrada</h2>'
            if (loadMoreBtn.style.display === 'block') {
                loadMoreBtn.style.display = 'none'
            }
        }

    } catch (error) {
        
    }
}

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const inputValue = searchInput.value.trim()

    if ( inputValue !== '' ) {
        fetchImages(inputValue, page)
    }
    else {
        imagesContainer.innerHTML = '<h2>Por favor, insira algum texto</h2>'
        if (loadMoreBtn.style.display === 'block') {
            loadMoreBtn.style.display = 'none'
        }
    }
    

})

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page)
})
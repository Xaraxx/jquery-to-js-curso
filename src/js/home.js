console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

// const getUser = new Promise(function(resolve, reject){
//   setTimeout(resolve, 3000)
//   // resolve()
// })

// getUser.then(function(){
//   console.log('All is ok!')
// })

// getUser.catch(function(){
//   console.log('Sorry! something is wrong!')
// })

// const url = 'https://swapi.co/api/people/1/'

// $.ajax(url, {
//   method: 'GET',
//   success: function(data){
//     console.log(data)
//   },
//   error: function(){
//     console.log(error)
//   }
  
// })

// fetch(url).then(
//   function(response){
//     // console.log(response)
//     return response.json()
//   }).then(function(character){
//     console.log('character', character.name)
//   }).catch(function(){
//     console.log('Sorry! something is wrong!')
//   });

(async function load(){
  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    if (data.data.movie_count > 0){
      return data
    }
    throw new Error('No se encontró ningún resultado')
  }
  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')


  function setAttributes($element, attributes){
    for (const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  const BASE_API = 'https://yts.mx/api/v2/'

  function featuringTemplate(peli){
    return(
    `
    <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
    `)
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault() // => esto es para evitar que el navegador se recarge con cada búsqueda! 
    
    $home.classList.toggle('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src:'src/images/loader.gif',
      height: 50,
      width: 50
    })

    $featuringContainer.append($loader)
    const data = new FormData($form)
    try {
      const {
        data:{
          movies: pelis
        } 
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString
    } catch(error){
      alert(error.message)
      $loader.remove()
      $home.classList.remove('search-active')
    }
    
    // const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
    // TODO: include this part in the Start Wars Application
    
  })

  // const actionList = await getData(`${BASE_API}list_movies.json?genre=action`)
  // const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`)
  // const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`)
  
  // const $home = $('.home .list #item')

  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.getElementById('drama')
  const $animationContainer = document.getElementById('animation')

  function videoItemTemplate(movie, category){
    return(
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
       </div>`)
      }
  
    // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'))
  function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0]
  }

  function addEventClick($element){
    $element.addEventListener('click', () => {
      showModal($element)
    })
  }

  function renderMovieList(list, $container, category){
    $container.children[0].remove()
    // actionList.data.movies
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      const image = movieElement.querySelector('img')
      image.addEventListener('load', (event) =>{
        event.srcElement.classList.add('fadeIn')
      })
      
      addEventClick(movieElement)
    })
  
  }

  async function cacheExist(category){
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem(listName)
    
    if (cacheList) {
      return JSON.parse(cacheList)
    }
    const {data: { movies: data} } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName, JSON.stringify(data))
    
    return data
  }

  const actionList = await cacheExist('action')
  renderMovieList(actionList, $actionContainer, 'action')
  
  const dramaList = await cacheExist('drama')
  renderMovieList(dramaList, $dramaContainer, 'drama')

  const animationList = await cacheExist('animation')
  renderMovieList(animationList, $animationContainer, 'animation')
  
  console.log(actionList, dramaList, animationList)
  
  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalImg = $modal.querySelector('img')
  const $modalTitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  function findById(list, id){
    return list.find((movie) => movie.id === parseInt(id, 10))
  }

  function findMovie(id, category){
    switch (category) {
      case 'action':{
        return findById(actionList, id)
      }
      case 'drama':{
        return findById(dramaList, id)
      }
      default: {
        return findById(animationList, id)       
      }
    }
  }

  function showModal($element){
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category

    const dataMovie = findMovie(id, category)
    
    $modalImg.setAttribute('src', dataMovie.medium_cover_image) 
    $modalTitle.textContent = dataMovie.title
    $modalDescription.textContent = dataMovie.description_full
  }

  $hideModal.addEventListener('click', hideModal)
  function hideModal(){
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

})();

(async function loadRandomUsers(){
  async function getUserData(url){
    const response = await fetch(url)
    const userData = await response.json()
    console.log(userData)
    return userData
    
  }

  // const url  
  const users = await getUserData('https://randomuser.me/api/')
})()


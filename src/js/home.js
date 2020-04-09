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
  async function getData(url2){
    const response = await fetch(url2)
    const data = await response.json()
    return data
  }
  const $form = document.getElementById('form')
  const $home = document.getElementById('home')

  $form.addEventListener('submit', (event) => {
    event.preventDefault() // => esto es para evitar que el navegador se recarge con cada búsqueda! 
    
    $home.classList.toggle('search-active')
  })

  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
  
  console.log(actionList, dramaList, animationList)
  // const $home = $('.home .list #item')

  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.getElementById('drama')
  const $animationContainer = document.getElementById('animation')

  function videoItemTemplate(movie){
    return(
      `<div class="primaryPlaylistItem">
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
      showModal()
    })
  }

  function renderMovieList(list, $container){
    $container.children[0].remove()
    // actionList.data.movies
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie)
      const movieElement = createTemplate(HTMLString)
  
      $container.append(movieElement)
      addEventClick(movieElement)
    })
  
  }

  renderMovieList(actionList.data.movies, $actionContainer)
  renderMovieList(dramaList.data.movies, $dramaContainer)
  renderMovieList(animationList.data.movies, $animationContainer)
  

  const $featuringContainer = document.getElementById('#featuring')
  


  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalImg = $modal.querySelector('img')
  const $modalTitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  function showModal(){
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
  }
  function showModal(){
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalIn .8s forwards'
  }
  $hideModal.addEventListener('click', hideModal())

  // '<div class="primaryPlaylistItem">' +
  //   '<div class="primaryPlaylistItem-image">' +
  //     '<img src="src/images/covers/midnight.jpg">' +
  //   '</div>' +
  //   '<h4 class="primaryPlaylistItem-title">' +
  //    ' Titulo de la peli' +
  //   '</h4>' +
  // '</div>'

})()



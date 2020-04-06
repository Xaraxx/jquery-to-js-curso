console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUser = new Promise(function(resolve, reject){
  setTimeout(resolve, 3000)
  // resolve()
})

getUser.then(function(){
  console.log('All is ok!')
})

getUser.catch(function(){
  console.log('Sorry! something is wrong!')
})

const url = 'https://swapi.co/api/people/1/'

$.ajax(url, {
  method: 'GET',
  success: function(data){
    console.log(data)
  },
  error: function(){
    console.log(error)
  }
  
})

fetch(url).then(
  function(response){
    // console.log(response)
    return response.json()
  }).then(function(character){
    console.log('character', character.name)
  }).catch(function(){
    console.log('Sorry! something is wrong!')
  });

(async function load(){
  async function getData(url2){
    const response = await fetch(url2)
    const data = await response.json()
    return data
  }
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  let terrorList;
  getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  .then(function(data){
    console.log('terrorlist', data)
  })
  console.log('actionList', actionList)
})()


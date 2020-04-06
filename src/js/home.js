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


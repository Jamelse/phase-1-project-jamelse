const mainApi = 'https://api.gameofthronesquotes.xyz/v1/random';
const imgApi = 'https://api.got.show/api/show/characters';
// --Nodes-- //
const container = document.querySelector('.container')
const mainDiv1 = document.querySelector('#main')

function homePage(){
  // --Element Creation-- //
  let h1 = document.createElement('h1');
  let p = document.createElement('p');
  
  // --Element innerText-- //
  h1.innerText = 'Thrones Quote Generator';
  p.innerText = 'to be determined quote';
  
  // --Element Appending-- //
  mainApi.appendChild(h1);
  mainApi.appendChild(p);
}
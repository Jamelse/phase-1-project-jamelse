const gotApi = 'https://api.gameofthronesquotes.xyz/v1/random';
const imgApi = 'https://api.got.show/api/show/characters';

// --Nodes-- //

const container = document.querySelector('.container');
const mainDiv = document.getElementById('main');
const quoteLink = document.getElementById('quoteLink');
const resetLink = document.querySelector('#resetLink');

// --Handlers-- //

function mainReset(){
  mainDiv.innerHTML = '';
}

function homePage(){
  mainReset();
  // --Element Creation-- //
  const img = document.createElement('img')
  const h1 = document.createElement('h1');
  
  // --Element innerText-- //
  img.src = './Game of Thrones/Game-of-Thrones-logo.png';
  img.className = 'responsive-img';
  h1.innerText = 'Thrones Quote Generator';
  
  // --Element Appending-- //
  mainDiv.appendChild(img);
  mainDiv.appendChild(h1);
  
}

function renderQuote(quote){
 mainReset();
  
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  
  h2.innerText = quote.character.name;
  li.innerText = `"${quote.sentence}"`;
  

  ul.appendChild(li);
  mainDiv.appendChild(h2);
  mainDiv.appendChild(ul);
  
}

function randomQuote(){
  fetch (gotApi)
  .then(resp => resp.json())
  .then(data => {
    renderQuote(data)
  })
}

// --Event Listeners-- //

function quoteLinkClickEvent(){
  quoteLink.addEventListener('click', (e) => {
    e.preventDefault;
    randomQuote();
    //characterImg();
  })
}

function resetLinkClickEvent(){
  resetLink.addEventListener('click', (e) => {
    e.preventDefault;
    homePage();
  })
}



document.addEventListener('DOMContentLoaded', () => {
  homePage();
  quoteLinkClickEvent();
  resetLinkClickEvent();
})
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
  h1.innerText = 'Quote Generator';
  
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
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function randomQuote(){
  fetch (gotApi)
  .then(resp => resp.json())
  .then(data => {
    //data.character.name
    characterImage(data.character.name)
    renderQuote(data)
    characterHouse(data.character.house.slug)
  })
}

function characterImage(char){
  fetch(`https://api.got.show/api/show/characters`)
  .then(resp => resp.json())
  .then(img =>{
    let image = document.createElement('img')
    for (let i = 0; i<img.length; i++){
    if (img[i].name.includes(char)){
    image.src = img[i].image;
    mainDiv.appendChild(image)
      } 
    }
  })
 }

function characterHouse(char){
  fetch(`https://api.got.show/api/show/houses`)
  .then(resp => resp.json())
  .then(logo => {
    let img = document.createElement('img')
    img.className = "houseLogo";
    for (let x = 0; x<logo.length; x++){
      //console.log(logo[x].name)}
      if (logo[x].name.toLowerCase().includes(char))
       img.src = logo[x].logoURL
        mainDiv.appendChild(img);
      
    }
  })
}


// --Event Listeners-- //

function quoteLinkClickEvent(){
  quoteLink.addEventListener('click', (e) => {
    e.preventDefault;
    characterHouse();
    randomQuote();
    characterImage();
    
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
const gotApi = 'https://api.gameofthronesquotes.xyz/v1/random';
const imgApi = 'https://api.got.show/api/show/characters';

// --Nodes-- //

const container = document.querySelector('.container');
const mainDiv = document.getElementById('main');
const quoteLink = document.getElementById('quoteLink');
const resetLink = document.querySelector('#resetLink');
const accumulator = document.querySelector('#accumulate');

// --Handlers-- //

function mainReset(){
  mainDiv.innerHTML = '';
}

function homePage(){
  mainReset();
  //Element Creation
  const img = document.createElement('img')
  const h1 = document.createElement('h1');
  
  //Element innerText
  img.src = './Game of Thrones/GOTlogo2.png';
  img.className = 'responsive-img';
  h1.innerText = 'Quote Generator';
  
  //Element Appending
  mainDiv.appendChild(img);
  mainDiv.appendChild(h1);
  
}

function renderQuote(quote){
 mainReset();
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const btn = document.createElement('button');
  const i = document.createElement('i');
  
  i.className = 'large material-icons left transparent'
  btn.className = 'btn';
  h2.innerText = quote.character.name;
  li.innerText = `"${quote.sentence}"`;
  btn.innerText = 'Like';
  i.innerText = ' favorite_border';

  btn.addEventListener('click', () => {
    
  })
  
  btn.appendChild(i);
  ul.appendChild(li);
  mainDiv.appendChild(btn);
  mainDiv.appendChild(h2);
  mainDiv.appendChild(ul);
}

function randomQuote(){
  fetch (gotApi)
  .then(resp => resp.json())
  .then(data => {
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
    let img = document.createElement('img');
    let img2 = document.createElement('img');
    img.className = "houseLogo";
    img2.className = 'houseLogo2';
    for (let x = 0; x<logo.length; x++){
      if (logo[x].name.toLowerCase().includes(char))
       img.src = logo[x].logoURL;
        img2.src = img.src;
        mainDiv.appendChild(img);
        mainDiv.appendChild(img2);
    }
  })
}


// --Event Listeners-- //

function quoteLinkClickEvent(){
  quoteLink.addEventListener('click', (e) => {
    e.preventDefault;
    randomQuote();
    
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
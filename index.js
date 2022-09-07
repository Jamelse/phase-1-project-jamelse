// --Nodes-- //

const mainDiv = () => document.getElementById('main');
const quoteLink = () => document.getElementById('quoteLink');
const resetLink = () => document.querySelector('#resetLink');
const likedQuotes = () => document.querySelector('#likedQuotes');
let quotes = [];

// --Element Creators-- //

const createImg = () => document.createElement('img');
const createH2 = () => document.createElement('h2');
const createUl = () => document.createElement('ul');
const createLi = () => document.createElement('li');
const createBtn = () => document.createElement('button');

// --Handlers-- //

function mainReset(){ //Main div reset
  mainDiv().innerHTML = '';
}

function homePage(){ //Home page creation
  mainReset();
  const img = createImg();
  const h1 = document.createElement('h1');
  
  img.src = './Game of Thrones/GOTlogo2.png';
  img.className = 'responsive-img';
  h1.innerText = 'Quote Generator';
  
  mainDiv().append(img, h1); 
}

function randomQuotePage(data){ //Rendering Fetch Requests for random quote page
  characterImage(data.character.name);
  renderQuotePage(data);
  characterHouseLogos(data.character.house.slug);
}

function characterImageCreation(img, char){ //Character Image Creation
  const image = createImg();
  image.src = img.find((i) => i.name.includes(char)).image
  mainDiv().appendChild(image);
}

function characterHouseLogosCreation(logo, char){
  const img1 = createImg();
  const img2 = createImg();
  img1.className = 'houseLogo';
  img2.className = 'houseLogo2';
  img1.src = logo.find((i) => i.name.toLowerCase().includes(`house ${char}`)).logoURL;
  img2.src = img1.src;
  mainDiv().append(img1, img2);
}

function renderQuotePage(quote){ //Random quote page bulk creation- 
 mainReset();                    
  const h2 = createH2();
  const ul = createUl();
  const li = createLi();
  const btn = createBtn();
  const i = document.createElement('i');
  
  i.className = 'large material-icons left transparent'
  btn.className = 'btn';
  h2.innerText = quote.character.name;
  li.innerText = `"${quote.sentence}"`;
  btn.innerText = 'Like';
  i.innerText = ' favorite_border';

  btn.addEventListener('click', () => { // Like button Event
    likedQuote(quote);
    i.innerText = 'favorite';
    btn.style.background = 'transparent';
    btn.className = 'btn disabled';
  })
  
  btn.appendChild(i);
  ul.appendChild(li);
  mainDiv().append(btn, h2, ul);
}


function likedQuotesPage(){//Like page rendering
  mainReset();
  showQuotes();
}

function showQuotes(){ //Like page appending 
  const div = document.createElement('div');
  div.className = "containter";
  
  quotes.forEach(quote => showQuote(quote, div))
  mainDiv().appendChild(div);
}

function showQuote(quote, div){ //Like page bulk creation
  const ul = createUl();
  const li = createLi();
  const btn = createBtn();
  const i = document.createElement('i');
  
  btn.id = 'remove-button';
  btn.className = 'btn-floating btn-large';
  i.id = "btnX"
  i.className = "large material-icons transparent";
  li.className = 'container';
  i.innerText = 'close';
  li.innerText = `"${quote.sentence}" - ${quote.character.name}`;

  btn.addEventListener('click', (e) => { //Delete button event       
    e.preventDefault(); 
    div.removeChild(ul);
    removeQuote(quote.id); 
  })

  btn.appendChild(i);
  ul.append(btn, li);
  div.appendChild(ul);
}

// --Fetch Requests-- //

function randomQuote(){ //Random quote API + Random quote page render
  fetch ('https://api.gameofthronesquotes.xyz/v1/random')
  .then(errorHandler)
  .then(data => {
    randomQuotePage(data)
  })
  .catch(console.log);
}



function characterImage(char){ //Separate API for character images
  fetch(`https://api.got.show/api/show/characters`)
  .then(errorHandler)
  .then(img =>{
    characterImageCreation(img, char);
  })
  .catch(console.log);
 }

function characterHouseLogos(char){ //Separate API for house logos
  fetch(`https://api.got.show/api/show/houses`)
  .then(errorHandler)
  .then(logo => {
    characterHouseLogosCreation(logo, char);
    })
  .catch(console.log)
}

function quoteFetcher(){ //Local Json server fetch
  fetch('http://localhost:3000/favorites')
  .then(errorHandler)
  .then(data => {
    quotes = data;
  })
  .catch(console.log);
}

function likedQuote(quote){ //Local JSON server POST for like button
  fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  })
  .then(errorHandler)
  .then(data => {
   quotes.push(data);
  })
  .catch(console.log);
}

function removeQuote(id){ //Local JSON server DELETE for delete button
  fetch(`http://localhost:3000/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(errorHandler)
  .then(data => { //.try? and .catch
    console.log(data);
  })
  .catch(console.log);
}

const errorHandler = (response) => { //Error handler for JSON requests
  if (!response.ok){
    throw Error(response.statusText);
  } else {
    return response.json();
  }
}

// --Event Listeners-- //

function likedQuotesClickEvent(){
  likedQuotes().addEventListener('click', (e) => {
    e.preventDefault();
    likedQuotesPage();
  
})
}

function quoteLinkClickEvent(){
  quoteLink().addEventListener('click', () => {
    randomQuote();
    })
}

function resetLinkClickEvent(){
  resetLink().addEventListener('click', () => {
    location.reload();
  })
}

document.addEventListener('DOMContentLoaded', () => {
  homePage();
  quoteFetcher();
  quoteLinkClickEvent();
  resetLinkClickEvent();
  likedQuotesClickEvent();
})
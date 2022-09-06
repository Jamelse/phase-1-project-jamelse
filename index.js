// --Nodes-- //

const container = document.querySelector('.container');
const mainDiv = () => document.getElementById('main');
const quoteLink = document.getElementById('quoteLink');
const resetLink = document.querySelector('#resetLink');
const likedQuotes = document.querySelector('#likedQuotes');
let quotes = [];

// --Handlers-- //

function mainReset(){ //Main div reset
  mainDiv.innerHTML = '';
}

function homePage(){ //Home page creation
  mainReset();
  const img = document.createElement('img')
  const h1 = document.createElement('h1');
  
  img.src = './Game of Thrones/GOTlogo2.png';
  img.className = 'responsive-img';
  h1.innerText = 'Quote Generator';
  
  mainDiv.appendChild(img);
  mainDiv.appendChild(h1);
  
}

function renderQuotePage(quote){ //Random quote page bulk creation- 
 mainReset();                    //Rendering Fetch Requests
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

  btn.addEventListener('click', () => { // Like button Event
    likedQuote(quote);
    i.innerText = 'favorite';
    btn.style.background = 'transparent';
    btn.className = 'btn disabled';
  })
  
  btn.appendChild(i);
  ul.appendChild(li);
  mainDiv.appendChild(btn);
  mainDiv.appendChild(h2);
  mainDiv.appendChild(ul);
}

function likedQuotesPage(){//Like page rendering
  mainReset();
  showQuotes();
}

function showQuotes(){ //Like page appending 
  const div = document.createElement('div');
  div.className = "containter";
  
  quotes.forEach(quote => showQuote(quote, div))
  mainDiv.appendChild(div);
}

function showQuote(quote, div){ //Like page bulk creation
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const btn = document.createElement('button');
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
    //location.reload();
    removeQuote(quote.id); 
  })

  btn.appendChild(i);
  ul.append(btn, li);
  div.appendChild(ul);

}

// --Fetch Requests-- //

function randomQuote(){ //Random quote API + Random quote page render
  fetch ('https://api.gameofthronesquotes.xyz/v1/random')
  .then(resp => resp.json())
  .then(data => {
   characterImage(data.character.name)
   renderQuotePage(data)
   characterHouseLogos(data.character.house.slug)
  })
}

function characterImage(char){ //Separate API for character images
  fetch(`https://api.got.show/api/show/characters`)
  .then(resp => resp.json())
  .then(img =>{
    const image = document.createElement('img')
    for (let i = 0; i<img.length; i++){
    if (img[i].name.includes(char)){
    image.src = img[i].image;
    mainDiv.appendChild(image)
      } 
    }
  })
 }

function characterHouseLogos(char){ //Separate API for house logos
  fetch(`https://api.got.show/api/show/houses`)
  .then(resp => resp.json())
  .then(logo => {
    const img = document.createElement('img');
    const img2 = document.createElement('img');
    img.className = "houseLogo";
    img2.className = 'houseLogo2';
    for (let x = 0; x<logo.length; x++){
      if (logo[x].name.toLowerCase().includes(char)){
       img.src =  logo[x].logoURL;
         img2.src = img.src;
        mainDiv.appendChild(img);
        mainDiv.appendChild(img2);
      }
    }
  })
}

function quoteFetcher(){ //Local Json server fetch
  fetch('http://localhost:3000/favorites')
  .then(resp => resp.json())
  .then(data => {
    quotes = data;
  })
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
  .then(resp => resp.json())
  .then(data => {
   quotes.push(data);
  })
  
}

function removeQuote(id){ //Local JSON server DELETE for delete button
  fetch(`http://localhost:3000/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => resp.json())
  .then(data => { //.try?
    console.log(data);
  })
}

// --Event Listeners-- //

function likedQuotesClickEvent(){
  likedQuotes.addEventListener('click', (e) => {
    e.preventDefault();
    likedQuotesPage();
  
})
}

function quoteLinkClickEvent(){
  quoteLink.addEventListener('click', () => {
    randomQuote();
    
  })
}

function resetLinkClickEvent(){
  resetLink.addEventListener('click', () => {
    location.reload();
  })
}

document.addEventListener('DOMContentLoaded', () => {
  homePage();
  quoteFetcher();
  likedQuotesClickEvent();
  quoteLinkClickEvent();
  resetLinkClickEvent();
})
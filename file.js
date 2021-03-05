
let userLibrary = [];


function book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(title, author, pages, read) {
  let newBook = new book(title, author, pages, read);
  userLibrary.push(newBook);
  displayBooks();
}

let firstRow = document.querySelector("#firstRow");
let booksDisplayed = 0;
let row = firstRow;
let main = document.querySelector(`#main`);

function displayBooks(){
  for(i = booksDisplayed; i < userLibrary.length; i++){
    let card = document.createElement(`div`);
    let title = document.createElement(`div`);
    let author = document.createElement(`div`);
    let pages = document.createElement(`div`);
    let read = document.createElement(`div`);
    let deleteBtn = document.createElement(`button`);
    let readBtn = document.createElement(`button`);
    card.setAttribute(`data-id`, `${i}`);
    deleteBtn.setAttribute(`data-id`, `${i}`);
    read.setAttribute(`data-id`, `${i}b`);
    readBtn.setAttribute(`data-id`, `${i}b`);
    deleteBtn.classList.add(`cardBtns`);
    readBtn.classList.add(`cardBtns`);
    deleteBtn.textContent = `Delete Book`;
    readBtn.textContent = `Read Staus`;
    card.classList.add(`bookCard`);
    if(booksDisplayed % 8 == 0 && booksDisplayed >= 8){
      row = document.createElement(`div`);
      row.classList.add(`row`);
      main.appendChild(row);
    }
    row.appendChild(card);
    title.classList.add(`infoSlot`);
    author.classList.add(`infoSlot`);
    pages.classList.add(`infoSlot`);
    read.classList.add(`infoSlot`);
    title.textContent = `${userLibrary[i].title}`;
    author.textContent = `${userLibrary[i].author}`;
    pages.textContent = `${userLibrary[i].pages}`;
    read.textContent = `${userLibrary[i].read}`;
    if(read.textContent.toLowerCase() == "read"){
      read.style.color = "#3AA655";
    } else if (read.textContent.toLowerCase() == "not read"){
      read.style.color = "#FF355E";
    }
    deleteBtn.addEventListener(`click`, removeCard);
    readBtn.addEventListener(`click`, changeStatus)
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(deleteBtn);
    card.appendChild(readBtn);
    localStorage.setItem(`card${i}title`, title.textContent);
    localStorage.setItem(`card${i}author`, author.textContent);
    localStorage.setItem(`card${i}pages`, pages.textContent);
    localStorage.setItem(`card${i}read`, read.textContent);
    booksDisplayed++;
  }
}

function removeCard(){
  let id = this.getAttribute(`data-id`);
  userLibrary.splice(parseInt(id), 1);
  let targetCard = document.querySelector(`[data-id = '${id}']`);
  targetCard.parentElement.removeChild(targetCard);
  localStorage.removeItem(`card${id}title`);
  localStorage.removeItem(`card${id}author`);
  localStorage.removeItem(`card${id}pages`);
  localStorage.removeItem(`card${id}read`);
  updateLocal();
}

function changeStatus(){
  let id = this.getAttribute(`data-id`);
  let targetStatus = document.querySelector(`[data-id = '${id}']`);
  if(targetStatus.textContent.toLowerCase() == `read`){
    targetStatus.textContent = `Not Read`;
    targetStatus.style.color = "#FF355E";
    this.style.backgroundColor = "#3AA655";
  } else {
    targetStatus.textContent = `Read`;
    targetStatus.style.color = "#3AA655";
    this.style.backgroundColor = "#FF355E";
  }
}

let newBook = document.querySelector(`#newBook`);

newBook.addEventListener(`click`, function(){
  let title = prompt(`Title of your book:`);
  let author = prompt(`Author of your book:`);
  let pages = parseInt(prompt(`How many pages is this book?`));
  let read = prompt(`Status of book? (Read or Not Read)`);
  addBook(title, author, pages, read);
})

let ii = localStorage.length / 4; // we have 4 properties per book

for(i = 0; i < ii; i++){
    addBook(localStorage.getItem(`card${i}title`), localStorage.getItem(`card${i}author`), localStorage.getItem(`card${i}pages`), localStorage.getItem(`card${i}read`))
}

function updateLocal(){
  for(i = 0; i < userLibrary.length; i++){
    localStorage.setItem(`card${i}title`, userLibrary[i].title);
    localStorage.setItem(`card${i}author`, userLibrary[i].author);
    localStorage.setItem(`card${i}pages`, userLibrary[i].pages);
    localStorage.setItem(`card${i}read`, userLibrary[i].read);
  }
}

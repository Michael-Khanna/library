let userLibrary = [];

let currentRow = document.querySelector(`#firstRow`);
let main = document.querySelector(`#main`);
let newBook = document.querySelector(`#newBook`);

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;

  this.ID = Date.now();

  this.addBookToLibrary();
}

Book.prototype.addBookToLibrary = function(){
    userLibrary.push(this);
}

let storageModule = (function(){
  let storageGet = function(){
    let data = localStorage.getItem(`libraryData`);
    data = JSON.parse(data);
    if(data == null){
      return false;
    }
    for(let i = 0; i < data.length; i++){
      userLibrary.push(data[i]);
    }
  }

  let storageSet = function(){
    let data = JSON.stringify(userLibrary);
    localStorage.setItem(`libraryData`, data);
  }

  return {
    storageGet,
    storageSet,
  }
})();

Book.prototype.changeRead = function(){

  this.read = this.read ? false : true ;

  let card = document.querySelector(`[id = '${this.ID}']`);
  
  let info = card.querySelector(`[infoType = 'read']`);
    
  info.textContent = this.read; 

  storageModule.storageSet();
}

Book.prototype.delBook = function(){
  for(let i = 0; i < userLibrary.length; i++){
    if(userLibrary[i].ID == this.ID){
      userLibrary.splice(i, 1);
      break; 
    }
  }

  let card = document.querySelector(`[id = '${this.ID}']`);
  card.parentNode.removeChild(card);

  storageModule.storageSet();
}

userLibrary.displaySingle = function(book){
  let div = document.createElement(`div`);
  div.classList.add(`bookCard`);

  div.setAttribute(`ID`, book.ID);

  for (let key in book){
    if(key == `addBookToLibrary` || key == `ID` || key == `changeRead` || key == `delBook`){
      continue;
    }
    let info = document.createElement(`div`);
    info.classList.add(`infoSlot`);

    info.textContent = book[key];

    info.setAttribute(`infoType`, `${key}`);

    let infoHead = document.createElement(`div`);
    infoHead.classList.add(`infoHeader`);

    infoHead.textContent = key.toUpperCase();

    div.appendChild(infoHead);
    div.appendChild(info);
  }

  let btnRow = document.createElement(`div`);
  btnRow.classList.add(`btnDiv`);

  let delBtn = document.createElement(`button`);
  delBtn.classList.add(`cardBtns`);
  delBtn.textContent = `Delete`;
  delBtn.addEventListener(`click`, function(){
    book.delBook();
  });
  
  let readBtn = document.createElement(`button`);
  readBtn.classList.add(`cardBtns`);
  readBtn.textContent = `Read`;
  readBtn.style.backgroundColor = `olive`;
  readBtn.addEventListener(`click`, function(){
    book.changeRead();
  });

  btnRow.appendChild(readBtn);
  btnRow.appendChild(delBtn);

  div.appendChild(btnRow);

  currentRow.appendChild(div);

  if(currentRow.children.length >= 8){
    currentRow = document.createElement(`div`);
    currentRow.classList.add(`row`);

    main.appendChild(currentRow);
  }
  storageModule.storageSet();
}

userLibrary.display = function(){
  for(let i = 0; i < this.length; i++){
    this.displaySingle(this[i]);
  }
}

let submitPrompt = function(){
  let prompt = document.querySelector(`.prompt`);

  let inputs = prompt.querySelectorAll(`input`);
  
  let values = []

  inputs.forEach(function(input){
    values.push(input.value);
  });

  let book = new Book(...values);

  userLibrary.displaySingle(book)

  deletePrompt();
} 

let deletePrompt = function(){
  let prompt = document.querySelector(`.prompt`);
  prompt.parentNode.removeChild(prompt);
}

let createPrompt = function(){
  let names = [
    {name: "Title", type: "text"}, {name: "Author", type: "text"}, {name: "Pages", type: "number"}
  ]

  let prompt = document.createElement(`div`);
  prompt.classList.add(`prompt`);

  main.appendChild(prompt);

  for(let i = 0; i < 3; i++){
    let input = document.createElement(`input`);
    input.classList.add(`input`);

    input.placeholder = names[i].name;
    input.type = names[i].type;

    prompt.appendChild(input)   ; 
  }

  let btnDiv = document.createElement(`div`);
  btnDiv.classList.add(`btnDiv`);
  btnDiv.style.backgroundColor = "#e3e0cf";

  prompt.appendChild(btnDiv);

  let xButton = document.createElement(`button`);
  xButton.classList.add(`cardBtns`);

  xButton.textContent = "X";
  xButton.addEventListener(`click`, deletePrompt);

  let subButton = document.createElement(`button`);
  subButton.classList.add(`cardBtns`);

  subButton.textContent = "Submit";
  subButton.style.backgroundColor = "green";
  subButton.addEventListener(`click`, submitPrompt);


  btnDiv.appendChild(subButton);
  btnDiv.appendChild(xButton);
  
}

storageModule.storageGet();

newBook.addEventListener(`click`, createPrompt);

userLibrary.display();

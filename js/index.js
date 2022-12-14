const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200; 

server.use(middlewares);
server.use(router);

server.listen(port);

function print(value) {
    console.log(value);
}


// appending item to an element
function appendElement(element, id = "animal-item-body") {
    const rootElement = document.getElementById(id);
    rootElement.append(element);
}


function createMainItem(poster, title,runtime, showtime,id, capacity, tickets_sold, description) {
    // list to contain the elements
    //divs styling
    let rootDiv = document.createElement("div")
    rootDiv.setAttribute("id", "root-div")
    rootDiv.classList.add("row", 'border-success','mt-3','w-100','m-auto')

    let menuDiv =document.createElement("div")
    menuDiv.classList.add("col-sm-1", 'm-auto')
    menuDiv.setAttribute("id", "menus")

    let mainDiv =document.createElement("div")
    mainDiv.setAttribute("id", "display-block")
    mainDiv.classList.add("col-sm-10")

    let mainBody = document.createElement("div")
    mainBody.setAttribute("id", "main-body")
    mainDiv.appendChild(mainBody)

  
    let cardDiv = document.createElement("div");
    cardDiv.classList.add('card', 'm-auto')
    cardDiv.style.textAlign = "center"


    let bodyDiv = document.createElement("div")
    bodyDiv.classList.add("card-body", "d-flex", "p-2", "bd-highlight")
    bodyDiv.style.textAlign = "center"

    // movie poster
    let moviePoster = document.createElement("img");
    moviePoster.src = poster;
    moviePoster.classList.add("card-img")
    moviePoster.alt = `${title} image`;
    moviePoster.style.height = "500px";

  
    // movies name content
    let movieTitle = document.createElement("h2");
    movieTitle.innerHTML = title; 

    let movieDescription = document.createElement("p");
    movieDescription.innerHTML = description; 

    let showTime = document.createElement("h4");
    showTime.innerHTML = `show time: ${showtime} `
    showTime.style.width = "33%"
    showTime.style.color = "blue"

    let runTime = document.createElement("h4");
    runTime.innerHTML = `run time: ${runtime}`
    runTime.style.width = "33%"
    runTime.style.color = "blue"

    // calculates available tickets and updates db.jason


    let availableTickets = capacity - tickets_sold
    let buyTicket = document.createElement("button");
    if(availableTickets===0){
        buyTicket.innerHTML= "sold out"
    }else{
        buyTicket.innerHTML = ` click to book ticket, ${availableTickets} available`

    }   
    
    buyTicket.style.width = "33%"
    buyTicket.classList.add("btn", "btn-success","ml-2")
    buyTicket.addEventListener('click',(e)=>{
        if(tickets_sold<capacity){
            let avail = document.querySelector("button")
            avail.innerText = ` click to book ticket, ${--availableTickets} available`
            confirm("buy ticket?")
            fetch(`http://localhost:3000/films/${id}`,{
            method: "PATCH",
  
            body:JSON.stringify({
              "tickets_sold": `${++ tickets_sold}`  
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },          
          })
          .then((response) => response.json())
          .then((json)=>console.log(json))
          
        }else {
            alert("theatre is full")
            let soldOut = document.querySelector("button")
            soldOut.innerText = "sold out"

        }
                
    })
    


    mainBody.appendChild(cardDiv)
    mainBody.appendChild(bodyDiv)

    rootDiv.appendChild(menuDiv)
    rootDiv.appendChild(mainDiv)  
    

    // append the image and text to root element
    cardDiv.append(moviePoster);
    cardDiv.append(movieTitle);
    cardDiv.append(movieDescription)
    bodyDiv.append(runTime)
    bodyDiv.append(showTime) 
    bodyDiv.append(buyTicket) 
  
    // return the element
    return rootDiv;
}
//creates side menu itesms
function createMenuItem(id, poster,title){

    let rootDiv = document.getElementById("menus")

    let movieDiv = document.createElement("li");
    movieDiv.style.listStyle = "none"
    movieDiv.classList = ("film item")
    movieDiv.setAttribute("id", id);

    movieDiv.addEventListener('click',(e)=>{
        document.getElementById("root-div").remove()      
        handleMovieClicks(id)
    })
    

    let moviePoster = document.createElement("img");
    moviePoster.src = poster;
    moviePoster.alt = `${title} image`;
    moviePoster.style.height = "100px";
    moviePoster.style.width = "100px";

    let movieTitle = document.createElement("h6");
    movieTitle.innerHTML = title; 

    rootDiv.appendChild(movieDiv)
    movieDiv.append(moviePoster)
    movieDiv.append(movieTitle)


}
// funtion to load main movie(first movie display)
function loadMovies(id) {
  
    fetch("http://localhost:3000/films/1")
        .then(response => response.json())
        .then((data) => {               
            const moviesItem = createMainItem(
            data.poster,
            data.title,
            data.runtime,
            data.showtime,
            data.id,
            data.capacity,
            data.tickets_sold,
            data.description
            );
            displayMenu()            
            appendElement(moviesItem, "main-display");   

        })

}
//function to display menu items
function displayMenu(){
    fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then((data)=>{
        const menuItems = data
        menuItems.map(
            menus => createMenuItem(menus.id, menus.poster,menus.title))
    })
}
// function that handles do display a different movie
function handleMovieClicks(id){
    fetch(`http://localhost:3000/films/${id}`)
    .then(response => response.json())
    .then((data) => {              
        const moviesItem = createMainItem(
        data.poster,
        data.title,
        data.runtime,
        data.showtime,
        data.id,
        data.capacity,
        data.tickets_sold,
        data.description
        );
        displayMenu()
        appendElement(moviesItem, "main-display");   

    })

}

document.addEventListener("DOMContentLoaded", (event) => {
    print(`Event loaded: ${event.type}`);
    print(loadMovies())



});
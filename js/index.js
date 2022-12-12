function print(value) {
    console.log(value);
}


// appending item to an element
function appendElement(element, id = "animal-item-body") {
    const rootElement = document.getElementById(id);
    rootElement.append(element);
}


function createMainItem(poster, title,runtime, showtime,id, capacity, tickets_sold) {
    // list to contain the elements
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

    let showTime = document.createElement("h4");
    showTime.innerHTML = `show time: ${showtime} `
    showTime.style.width = "33%"
    showTime.style.color = "blue"

    let runTime = document.createElement("h4");
    runTime.innerHTML = `run time: ${runtime}`
    runTime.style.width = "33%"
    runTime.style.color = "blue"


    mainBody.appendChild(cardDiv)
    mainBody.appendChild(bodyDiv)

    rootDiv.appendChild(menuDiv)
    rootDiv.appendChild(mainDiv)  
    

    // append the image and text to root element
    cardDiv.append(moviePoster);
    cardDiv.append(movieTitle);
    bodyDiv.append(runTime)
    bodyDiv.append(showTime)  
  
    // return the element
    return rootDiv;
}

function createMenuItem(id, poster,title){

    let rootDiv = document.getElementById("menus")

    let movieDiv = document.createElement("li");
    movieDiv.style.listStyle = "none"
    movieDiv.classList = ("film item")
    movieDiv.setAttribute("id", id);

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

document.addEventListener("DOMContentLoaded", (event) => {
    print(`Event loaded: ${event.type}`);



});
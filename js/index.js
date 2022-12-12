function print(value) {
    console.log(value);
}


// appending item to an element
function appendElement(element, id = "animal-item-body") {
    const rootElement = document.getElementById(id);
    rootElement.append(element);
}


document.addEventListener("DOMContentLoaded", (event) => {
    print(`Event loaded: ${event.type}`);



});
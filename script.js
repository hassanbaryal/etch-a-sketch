//IDEAS
//to go up and down add/subtract by width/height of grid. e.g. add/subtract 16 if 16x16 grid
//add colour pallette thing to change colour
//modal popup on page load to let user select size of grid, 16x16, 32x32, 64x64
//let user select initial location on popup
//KEYS left37 up38 right39 down40
let loc = 0;
const container = document.querySelector('.grid-container')
let gridArray;
let isDown = false


document.addEventListener('mousedown', function (e) {isDown = true})
document.addEventListener('mouseup', function (e) {isDown = false})
document.querySelector(".clear-grid").addEventListener('click', clearGrid)
const backgroundColor = document.querySelector(".bg-color-selector")
const squareColor = document.querySelector(".color-selector")
const gridSize = document.querySelector(".size-slider")

// This event listenener changes the colour of the background/uncoloured squares as the user
// changes the background colour on the settings UI (input element)
backgroundColor.addEventListener('input', function (e) {
    for (let i in gridArray) {
        if (!(gridArray[i].classList[2] == 'colored')) {
            gridArray[i].style.setProperty('background-color', `${backgroundColor.value}`)
        }
    }
})

// This event listener changes the size of the grid and user changes the grid size slider
gridSize.addEventListener('input', function (e) {
    document.querySelector('.grid-size-value').textContent = `${gridSize.value}`
    gridArray.forEach( square => {
        square.remove()
    })
    createGrid(gridSize.value)
    
})

function createGrid (size) {
    for (let i = 0; i < (size**2); i++) {
        const sqr = document.createElement('div')
        sqr.classList.toggle('square')
        sqr.classList.toggle(i)
        
        container.appendChild(sqr)
    }
    console.log(backgroundColor.value)
    const grid = document.querySelectorAll('.square')

    grid.forEach(square => {
        square.setAttribute('style', `height: ${500/size}px; width: ${500/size}px `)
        square.style.setProperty('background-color', `${backgroundColor.value}`)
        square.addEventListener('mouseover', colourSquare)
     })
    gridArray = Array.from(grid)
}


function colourSquare (e) {
    if (isDown) {
        e.target.style.setProperty('background-color', `${squareColor.value}`)
        e.target.classList.add("colored")
    }
}

// Clears the grid and sets the colour of the grid to whatever the value of the background color
// input element is
function clearGrid () {
    for (let i in gridArray) {
        gridArray[i].style.setProperty('background-color', `${backgroundColor.value}`)
        gridArray[i].classList.remove('colored')
    }
}

createGrid(gridSize.value)




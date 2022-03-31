
let loc = 0;
const container = document.querySelector('.grid-container')
let gridArray;
let isMouseDown = false
let rainbowMode = false
let eraserMode = false
// Array of random colors used for rainbow mode
let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
let colorArrayIndex = 0

document.addEventListener('mousedown', function (e) {isMouseDown = true})
document.addEventListener('mouseup', function (e) {isMouseDown = false})

const eraserBtn = document.querySelector('.eraser-btn')
const clearGridBtn = document.querySelector('.clear-grid')
const rainbowBtn = document.querySelector('.rainbow-btn')
const backgroundColor = document.querySelector(".bg-color-selector")
const penColor = document.querySelector(".color-selector")
const gridSize = document.querySelector(".size-slider")



eraserBtn.addEventListener('click', function (e) {
    //Disables rainbow mode if rainbow button is toggled
     if (rainbowMode) {
         rainbowBtn.click()
    }

    eraserBtn.classList.toggle('activated')
    if (eraserMode) {
        eraserMode = false
    } else {
        eraserMode = true
    }

})

//clears grid of all pen colouring
clearGridBtn.addEventListener('click', function (e) {
    e.target.classList.toggle('activated')
    setTimeout(clearGrid, 500)
})

// When rainbow button is clicked, rainbow mode is turned on (true) and the color of each square
// is reandomly selected from colorArray
rainbowBtn.addEventListener('click', function (e) {
    // Disables eraser if eraser mode is toggled
    if(eraserMode) {
        eraserBtn.click()
    }

    rainbowBtn.classList.toggle('activated')
    if(rainbowMode) {
        document.querySelector('.rainbow-mode').textContent = `OFF`
        rainbowMode = false
        penColor.setAttribute('value', `${colorArray[colorArrayIndex]}`)
    } else {
        document.querySelector('.rainbow-mode').textContent = `ON`
        rainbowMode = true
        penColor.setAttribute('value', `${colorArray[colorArrayIndex]}`)
    }
})

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
    document.querySelector('.grid-size-value').textContent = `${gridSize.value}x${gridSize.value}`
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

    const grid = document.querySelectorAll('.square')

    grid.forEach(square => {
        square.setAttribute('style', `height: ${500/size}px; width: ${500/size}px `)
        square.style.setProperty('background-color', `${backgroundColor.value}`)

        square.addEventListener('mouseenter', colourSquare)
        square.addEventListener('mousedown', function (e) {isMouseDown = true; colourSquare(e)})
     })
    gridArray = Array.from(grid)
}


function colourSquare (e) {
    if (isMouseDown) {
        if (rainbowMode) {
            e.target.style.setProperty('background-color', `${colorArray[colorArrayIndex]}`)
            colorArrayIndex++
            if (colorArrayIndex > (colorArray.length-1)) {
                colorArrayIndex = 0
            }
            penColor.setAttribute('value', `${colorArray[colorArrayIndex]}`)
            e.target.classList.add("colored")
        } else if (eraserMode) {
            e.target.style.setProperty('background-color', `${backgroundColor.value}`)
            e.target.classList.remove('colored')
        } else {
            e.target.style.setProperty('background-color', `${penColor.value}`)
            e.target.classList.add("colored")
        }
        
    }
}

// Clears the grid and sets the colour of the grid to whatever the value of the background color
// input element is
function clearGrid () {
    for (let i in gridArray) {
        gridArray[i].style.setProperty('background-color', `${backgroundColor.value}`)
        gridArray[i].classList.remove('colored')
    }
    clearGridBtn.classList.toggle('activated')
}

createGrid(gridSize.value)




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

function createGrid(size) {
    for (let i = 0; i < (size**2); i++) {
        const sqr = document.createElement('div')
        sqr.classList.toggle('square')
        sqr.classList.toggle(i)
        container.appendChild(sqr)
    }
    const grid = document.querySelectorAll('.square')

    grid.forEach(square => {
        square.setAttribute('style', `height: ${500/size}px; width: ${500/size}px `)
        square.addEventListener('mouseover', function (e) {
            //console.log('hello')
            //square.style.setProperty('background-color', 'red')
            if (isDown) {
                console.log(this.classList.value)
                square.style.setProperty('background-color', 'red')
            }
        })
    })
    gridArray = Array.from(grid)
}

createGrid(10)




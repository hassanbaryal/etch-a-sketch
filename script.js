
const container = document.querySelector('.container')

for (let i = 0; i < (16 * 16); i++) {
    const sqr = document.createElement('div')
    sqr.classList.toggle('square')
    container.appendChild(sqr)
}

const grid = document.querySelectorAll('.square')

// const sqr1 = document.createElement('div')
// sqr1.classList.toggle('square')
// container.appendChild(sqr1)







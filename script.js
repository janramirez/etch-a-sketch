const defaultGridSize = 16;
const defaultMode = 'sketch';
const defaultColor = 'black';

let currentGridSize = defaultGridSize;
let currentMode = defaultMode;
let currentColor = defaultColor;

const gridSizeBtn = document.getElementById('gridSizeBtn');
const clearBtn = document.getElementById('clearBtn');
const container = document.getElementById('container');

function setGridSize(size) {
    currentGridSize = size;
}

function clearGrid() {
    container.innerHTML = ''
}

clearBtn.onclick = () => {
    clearGrid();
    loadGrid(currentGridSize);
}

gridSizeBtn.onclick = () => {
    // get input from user
    let size = prompt("Input grid size (min: 16 | max: 100)", currentGridSize)
    // set grid size based on user input
    setGridSize(size)
    // clear grid
    clearGrid()
    // reset grid
    loadGrid(currentGridSize)
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function loadGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i=0; i < size * size; i++) {
        const gridBox = document.createElement('div')
        gridBox.classList.add('grid-box')
        gridBox.addEventListener('mouseover', changeColor)
        gridBox.addEventListener('mouseenter', addBorder)
        gridBox.addEventListener('mouseleave', removeBorder)
        gridBox.addEventListener('mousedown', changeColor)
        container.appendChild(gridBox)
    }
}

function addBorder(e) {
    e.target.style.border = 'solid 1px #777'
}

function removeBorder(e) {
    e.target.style.border = 'none'
}

function changeColor(e) {
    if (e.type === 'mouseover' && mouseDown)
        e.target.style.backgroundColor = defaultColor
}

window.onload = () => {
    loadGrid(defaultGridSize);
    // setMode(defaultMode);
}
document.addEventListener('DOMContentLoaded', (event) => {

const listElements = document.querySelectorAll(".drag")

for (const elem of listElements) {
    elem.draggable = true;
}

function handleDragStart(e) {
  e.target.classList.add("selected");
}

function handleDragEnd(e) {
  e.target.classList.remove("selected");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

listElements.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('dragend', handleDragEnd, false);
})
})

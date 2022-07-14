class ColorPicker {
    constructor(root) {
        this.root = root
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".color_picker"))
        this.selectedColor = null
        this.savedColors = this.getSavedColors()
        this.colorjoe.show()

        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex())
        })
        
        this.root.querySelectorAll(".saved_color").forEach((el, i) => {
            this.showSavedColor(el, this.savedColors[i])
            el.addEventListener("mouseup", elem => {
                if (elem.button == 1) {
                    this.saveColor(this.selectedColor, i)
                    this.showSavedColor(el, this.selectedColor)
                }
                this.setSelectedColor(el.dataset.color)
            })
        })
    }

    getSavedColors() {
        const saved = JSON.parse(localStorage.getItem("colorpicker-saved" || "[]"))
        return new Array(18).fill("5B5B5B").map((defaultColor, i) => {
            return saved[i] || defaultColor
        })
    }

    setSelectedColor(color) {
        this.selectedColor = color
        this.root.querySelector(".selected_color_text").textContent = color
        this.root.querySelector(".selected_color").style.background = color
    }

    showSavedColor(el, color) {
        el.style.background = color
        el.dataset.color = color
    }

    saveColor(color, i) {
        this.savedColors[i] = color
        localStorage.setItem("colorpicker-saved", JSON.stringify(this.savedColors))
    }
}

const cp1 = new ColorPicker(document.querySelector(".add_color"))

const cp2 = new ColorPicker(document.querySelector(".change_color"))

const colorsArray = loadFromLocalStorage() || [
    {id: 1, name:"name1", type:"main", color:'#f4f4f4'},
    {id: 2, name:"name2", type:"side", color:'#123456'},
]

localStorage.setItem("color-array", JSON.stringify(colorsArray))

render()

document.querySelector(".add_color_btn").addEventListener("click", (event) => {
    document.querySelector(".add_color_wrapper").style.display = "block"
})

document.querySelector(".add_btn").addEventListener("click", (event) => {
    event.preventDefault()    
    addColor()
    document.querySelector(".add_color_wrapper").style.display = "none"
})

document.querySelector(".save_btn").addEventListener("click", setToLocalStorage)

document.querySelector(".close_btn1").addEventListener("click", () => {
    document.querySelector(".add_color_wrapper").style.display = "none"
})

document.querySelector(".close_btn2").addEventListener("click", () => {
    document.querySelector(".change_color_wrapper").style.display = "none"
})

function renderTableRow({id, name, type, color}) {
    const el = document.createElement("div")
    el.classList.add("table_row")
    el.classList.add("drag")
    el.setAttribute("data-id", id)
    el.innerHTML = `
    <div class="table_header flex">
        <div class="color_rect" style="background: ${color};"></div>
    </div>
    <div class="table_header table_data">${name}</div>
    <div class="table_header table_data">${type}</div>
    <div class="table_header table_data">${color}</div>
    <div class="table_header">
        <svg class="change" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8701 1.60447C11.0429 1.41283 11.2481 1.26081 11.4739 1.1571C11.6997 1.05338 11.9417 1 12.1861 1C12.4306 1 12.6726 1.05338 12.8984 1.1571C13.1242 1.26081 13.3293 1.41283 13.5022 1.60447C13.675 1.79611 13.8121 2.02362 13.9056 2.27401C13.9991 2.5244 14.0473 2.79277 14.0473 3.06379C14.0473 3.33481 13.9991 3.60317 13.9056 3.85356C13.8121 4.10395 13.675 4.33146 13.5022 4.5231L4.61905 14.3735L1 15.468L1.98701 11.4549L10.8701 1.60447Z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>    
    </div>
    <div class="table_header">
        <svg class="delete" width="11" height="13" viewBox="0 0 11 13" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H0L1.26923 13H9.73077L11 1ZM9.88865 2H1.11135L2.16904 12H8.83096L9.88865 2Z"/>
        <rect width="11" height="2"/>
        </svg>    
    </div>
    `
    document.querySelector(".added_colors").appendChild(el) 
}

function render() {
    document.querySelector(".added_colors").innerHTML = ""
    colorsArray.forEach( el => renderTableRow(el) )
    document.querySelectorAll(".change").forEach((el) => {
        el.addEventListener("click", () => {
            let id = el.parentElement.parentElement.dataset.id
            document.querySelector(".change_color_wrapper").style.display = "block"
            document.querySelector(".change_btn").addEventListener("click", (event) => {
                event.preventDefault()
                changeColor(id)
                document.querySelector(".change_color_wrapper").style.display = "none"
                id = null
            })
        })
    })
    document.querySelectorAll(".delete").forEach( el => {
        el.addEventListener("click", () => {
            let id = el.parentElement.parentElement.dataset.id
            deleteColor(id)
            id = null
        })
    })
}

function addColor() {
    const color = {}
    color.name = document.querySelector(".add_input").value
    color.type = document.querySelector(".add_select").value
    color.color = cp1.selectedColor
    color.id = Date.now()
    colorsArray.push(color)
    render()
    document.querySelector(".add_input").value = ""
}

function changeColor(id) {
    const changeColorDiv = document.querySelector(".change_color")    
    colorsArray.forEach((el) => {
        if (el.id == id) {
            let name = changeColorDiv.querySelector(".add_input").value
            let type = changeColorDiv.querySelector(".add_select").value
            let color = cp2.selectedColor
            el.name = name
            el.type = type
            el.color = color
            render()
        }        
    })
}

function deleteColor(id) {
    const changeColorDiv = document.querySelector(".change_color") 
    for (let i = 0; i < colorsArray.length; i++) {
        if (colorsArray[i].id == id) {
            colorsArray.splice(i, 1)
            render()
        }
    }
}

function setToLocalStorage() {
    localStorage.setItem("color-array", JSON.stringify(colorsArray))
}

function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("color-array"))
}



 // глобальная переменная для контекста WebGL

// function start() {
//   var canvas = document.getElementById("glcanvas");
  
//   var gl = canvas.getContext('webgl');

//   // продолжать только если WebGL доступен и работает

//   if (gl) {
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета чёрный, полная непрозрачность
//     gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
//     gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
//     gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
//   }
// }

// start()

/*const arr = [
    {
        name:"name1", 
        type: "main", 
        color: '#f4f4f4'
    },
    {
        name:"name2",
        type: "side", 
        color: '#f8f8f8'
    }
]

class ColorLine extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .red {
                color:red
            }
        </style>
        <div class="red">${arr[0].name}</div>
        `
    }

    connectedCallback() { // (2)
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
      }
}

window.customElements.define('color-line', ColorLine) */
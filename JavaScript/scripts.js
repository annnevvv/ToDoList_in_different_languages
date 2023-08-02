let tdInput, errorInfo, addBtn, ulList
let popup, popupInfo, tdEdit, popupInput, popupAddBtn, popupCloseBtn

const main = () => {
    prepDomElements()
    prepDomEvents()
}

const prepDomElements = () => {
    tdInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepDomEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTaskText)
    tdInput.addEventListener('keyup', checkKeyEnterDown)
}

const addNewTask = () => {
    if (tdInput.value !== "") {
        console.log(ulList)
        const newTask = document.createElement('li')
        newTask.textContent = tdInput.value
        ulList.append(newTask)
        createToolsArea(newTask)
        tdInput.value = ""
    } else {
        errorInfo.textContent =('Enter task')
    }
}

const createToolsArea = (parameter) => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    parameter.append(toolsPanel)

    const cmplBtn = document.createElement('button')
    cmplBtn.classList.add('complete')
    cmplBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'
    
    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(cmplBtn, editBtn, delBtn)
}

const checkClick = e => {
    if (e.target.matches('.complete')) {
        console.log('completed')
        (e.target.closest('li')).classList.toggle('completed')
        e.target.classList.toggle('completed')

    } else if (e.target.matches('.edit')) {
        editTask(e)   

    } else if (e.target.matches('.delete')) {
        deleteTask(e)

    } else {
        console.log('hee?');
    }
}

const editTask = (e) => {
    tdEdit = e.target.closest('li')
    popupInput.value = tdEdit.firstChild.textContent
    popup.style.display = 'flex'
}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ""
}

const changeTaskText = () => {
    if ((popupInput.value !== "") && (popupInput.value !== " " )) {    
        tdEdit.firstChild.textContent = popupInput.value
        closePopup()
    } else {
        popupInfo.textContent = "Enter changed task's description"
    }
}

const deleteTask = e => {
    e.target.closest('li').remove()

    const allTasks = ulList.querySelectorAll('li')

    if (allTasks.length === 0) {
        errorInfo.textContent = 'You have any tasks to do'
    }
}

const checkKeyEnterDown = e => {
    if(e.key === 'Enter') {
        addNewTask()
    }
}



document.addEventListener("DOMContentLoaded", main)
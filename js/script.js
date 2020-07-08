numItem = 0


function addItemToToDoList(){
    var jobToDo = document.getElementById("input").value,
        toDoList = document.getElementById("toDoList"),
        toDoItem = document.createElement("li"),
        goToDoingButton = document.createElement("button"),
        deleteButton = document.createElement("button"),
        buttonsDiv = document.createElement("div");
    if(jobToDo == ""){
        alert("Não pode adicionar uma tarefa vazia")
    }else{
        toDoItem.classList.add("list-group-item", "toDoListItem", "d-flex", "justify-content-between", "align-items-center");
        toDoItem.setAttribute("data-id", numItem);
        toDoItem.id = "item"+numItem;
        toDoItem.textContent = jobToDo;

        buttonsDiv.classList.add("d-flex", "flex-sm-column");
        buttonsDiv.id = "div" + numItem;
        
        toDoList.appendChild(toDoItem);
        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(goToDoingButton);
        toDoItem.appendChild(buttonsDiv);

        deleteButton.classList.add("btn", "btn-danger", "btnItems");
        deleteButton.id = "deleteButton" + numItem;
        deleteButton.setAttribute("data-id", numItem);
        deleteButton.setAttribute("onclick", "del(this.id)");
        deleteButton.textContent = "Delete";

        goToDoingButton.classList.add("btn", "btn-info", "btnItems");
        goToDoingButton.id = "goToDoingButton" + numItem;
        goToDoingButton.setAttribute("data-id", numItem)
        goToDoingButton.setAttribute("onclick", "toDoing(this.id)");
        goToDoingButton.textContent = "To Doing";
       

        numItem++;
    }
}

function del(id){
    itemId = document.getElementById(id).getAttribute("data-id");
    itemToRemove = document.getElementById("item" + itemId);
    itemToRemove.remove();
    return itemToRemove;
}

function toDoing(id){
    itemToAdd = del(id);
    doingList = document.getElementById("doingList").appendChild(itemToAdd);
    toWaitingButton = document.createElement("button");
    toWaitingButton.classList.add("btn", "btn-warning", "btnItems");
    toWaitingButton.id = "goToWaitingButton" + itemToAdd.getAttribute("data-id")
    toWaitingButton.setAttribute("onclick", "toWaiting(this.id)");
    toWaitingButton.setAttribute("data-id", itemToAdd.getAttribute("data-id"));
    toWaitingButton.textContent = "To Waiting";
    
    toDoneButton = document.createElement("button");
    toDoneButton.classList.add("btn", "btn-success", "btnItems");
    toDoneButton.id = "goToDoneButton" + itemToAdd.getAttribute("data-id");
    toDoneButton.setAttribute("onclick", "done(this.id)");
    toDoneButton.setAttribute("data-id", itemToAdd.getAttribute("data-id"));
    toDoneButton.textContent = "To Done";

    buttonsDiv = document.getElementById("div" + itemToAdd.getAttribute("data-id"))

    toDeleteButton = document.getElementById("deleteButton" + itemToAdd.getAttribute("data-id"))
    toDeleteButton.remove();

    buttonsDiv.appendChild(toDeleteButton);
    buttonsDiv.appendChild(toWaitingButton);
    buttonsDiv.appendChild(toDoneButton);   
    document.getElementById(id).remove();
}

function toWaiting(id){
    itemToAdd = del(id);
    waitingList = document.getElementById("waitingList").appendChild(itemToAdd);

    backToDoingButton = document.createElement("button");
    backToDoingButton.classList.add("btn", "btn-info", "btnItems");
    backToDoingButton.id = "backToDoing" + itemToAdd.getAttribute("data-id");
    backToDoingButton.setAttribute("onclick", "backToDoing(this.id)"); 
    backToDoingButton.setAttribute("data-id", itemToAdd.getAttribute("data-id")); 
    backToDoingButton.textContent = "Back To Doing";
    toDoneButton = document.getElementById("goToDoneButton" + itemToAdd.getAttribute("data-id"));
    toDoneButton.remove();

    buttonsDiv = document.getElementById("div" + itemToAdd.getAttribute("data-id"));
    buttonsDiv.appendChild(backToDoingButton)
    buttonsDiv.appendChild(toDoneButton);

    document.getElementById(id).remove();

}

function backToDoing(id){
    itemToAdd = del(id);
    doingList = document.getElementById("doingList").appendChild(itemToAdd);
    toWaitingButton = document.createElement("button");
    toWaitingButton.classList.add("btn", "btn-warning", "btnItems");
    toWaitingButton.id = "goToWaitingButton"+ itemToAdd.getAttribute("data-id");
    toWaitingButton.setAttribute("onclick", "toWaiting(this.id)");
    toWaitingButton.setAttribute("data-id", itemToAdd.getAttribute("data-id"));
    toWaitingButton.textContent = "To Waiting";
    toDoneButton = document.getElementById("goToDoneButton" + itemToAdd.getAttribute("data-id"));
    toDoneButton.remove();

    buttonsDiv = document.getElementById("div" + itemToAdd.getAttribute("data-id"))
    buttonsDiv.appendChild(toWaitingButton);
    buttonsDiv.appendChild(toDoneButton);
    
    document.getElementById(id).remove();
}

function done(id){
    let itemToAdd = del(id);
    document.getElementById("doneList").appendChild(itemToAdd);
    let buttonsDiv = document.getElementById("div" + itemToAdd.getAttribute("data-id"));
    let deleteButton = document.getElementById("deleteButton" + itemToAdd.getAttribute("data-id"));
    buttonsDiv.remove();
    document.getElementById("item" + itemToAdd.getAttribute("data-id")).appendChild(deleteButton)
    document.getElementById(id).remove();
}
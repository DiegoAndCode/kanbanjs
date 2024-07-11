const columns = document.querySelectorAll(".column__cards");

let draggedCard;

const updateCardCount = () => {
    columns.forEach((column) => {
        const count = column.querySelectorAll(".card").length;
        const countSpan = column.parentElement.querySelector(".column__count");
        countSpan.textContent = `(${count})`;
    });
};

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.add("column--highlight");
    }
};

const dragLeave = ({ target }) => {
    target.classList.remove("column--highlight");
};

const drop = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.remove("column--highlight");
        target.append(draggedCard);
        updateCardCount();
    }
};

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return;

    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (!card.textContent) {
            card.remove();
            updateCardCount();
        }
    });

    card.addEventListener("dragstart", dragStart);

    card.addEventListener("dblclick", () => {
        card.contentEditable = "true";
        card.focus();
    });

    card.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        card.remove();
        updateCardCount();
    });

    target.append(card);
    card.focus();
    updateCardCount();
};

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
    updateCardCount(); 
});

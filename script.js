let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let count = 0;
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;

    enableBoxes();

    msgContainer.classList.add("hide");
};


boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");

            turnO = false;

        } else {
            box.innerText = "X";
            box.classList.add("X");

            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });

});


const checkWinner = () => {

    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== ""
        ) {

            if (
                pos1Val === pos2Val &&
                pos2Val === pos3Val
            ) {

                showWinner(pos1Val, pattern);

                return true;
            }
        }
    }

    return false;
};


const showWinner = (winner, pattern) => {

    msg.innerText = `Winner: ${winner}`;

    msgContainer.classList.remove("hide");

    disableBoxes();

    // Highlight winning boxes
    pattern.forEach((index) => {
        boxes[index].style.background = "#dcfce7";
    });
};


const gameDraw = () => {

    msg.innerText = "It's a Draw!";

    msgContainer.classList.remove("hide");

    disableBoxes();
};


const disableBoxes = () => {

    boxes.forEach((box) => {
        box.disabled = true;
    });
};


const enableBoxes = () => {

    boxes.forEach((box) => {

        box.disabled = false;

        box.innerText = "";

        box.classList.remove("O");
        box.classList.remove("X");

        box.style.background = "";
    });
};


newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);

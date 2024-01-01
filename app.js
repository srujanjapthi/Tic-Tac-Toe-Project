let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let game = document.querySelector(".game");

let turnO = true; // PlayerX and PlayerO
let i = 0;

msgContainer.classList.remove("hide");
game.classList.add('hide');
resetBtn.classList.add('hide');

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBtn();
    i = 0;

    msgContainer.classList.add('opaque');
    game.classList.add('show');
    game.classList.remove('opaque');
    setTimeout(() => {
        msgContainer.classList.add('hide');
        game.classList.remove('hide');
        resetBtn.classList.remove('hide');
    }, 1000);
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        box.innerText = turnO ? 'O' : 'X';
        turnO = !turnO;
        box.disabled = true;

        checkWinner();
    });
});

const disableBtn = (boxes) => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

const enableBtn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = winner;

    game.classList.remove('show');
    msgContainer.classList.remove('opaque');
    game.classList.add('opaque');
    setTimeout(() => {
        msgContainer.classList.remove("hide");
        game.classList.add('hide');
        resetBtn.classList.add('hide');
    }, 500);
}

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos1Val === pos3Val) {
                disableBtn(boxes);
                setTimeout(() => {
                    showWinner(`Player ${pos1Val} Wins...`);
                }, 200);
                return;
            }
        }
    }

    if (i++ == 8) {
        showWinner(`Draw...`);
    }
}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
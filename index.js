const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetBoard = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    turnO = true;
    count = 0;
    msg.innerText = "";
    msgContainer.classList.add("hide");
};

// Resets the board for  Reset 
reset.addEventListener("click", resetBoard);

// Check for a winner
const isWinner = () => {
    for (const pattern of winPatterns) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            boxes.forEach((box) => (box.disabled = true)); // Disable all boxes
            showWinner(pos1);
            return true;
        }
    }
    return false;
};

// Handle a draw
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
};

// Display the winner
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

// Handle box click events
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            count++;
            box.disabled = true;

            if (isWinner()) return; // End game if there's a winner
            if (count === 9) gameDraw(); // Check for a draw
        }
    });
});

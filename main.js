import { shuffleArray } from "./modules/shuffleArray.js";
import { createCard } from "./modules/card.js";

// creating game container
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");

let items = [{
        id: 1,
        url: "https://clipart-library.com/images_k/cartoon-car-transparent-background/cartoon-car-transparent-background-24.png",
    },
    {
        id: 1,
        url: "https://clipart-library.com/images_k/cartoon-car-transparent-background/cartoon-car-transparent-background-24.png",
    },

    {
        id: 2,
        url: "https://www.pinclipart.com/picdir/big/17-171986_cartoon-motorbike-clipart.png",
    },
    {
        id: 2,
        url: "https://www.pinclipart.com/picdir/big/17-171986_cartoon-motorbike-clipart.png",
    },

    {
        id: 3,
        url: "https://www.pinclipart.com/picdir/big/540-5400237_houses-clipart-images-clip-black-and-white-library.png",
    },
    {
        id: 3,
        url: "https://www.pinclipart.com/picdir/big/540-5400237_houses-clipart-images-clip-black-and-white-library.png",
    },

    {
        id: 4,
        url: "https://www.pinclipart.com/picdir/big/527-5270974_drawn-phone-clip-art-iphone-iphone-png-download.png",
    },
    {
        id: 4,
        url: "https://www.pinclipart.com/picdir/big/527-5270974_drawn-phone-clip-art-iphone-iphone-png-download.png",
    },

    {
        id: 5,
        url: "https://www.pinclipart.com/picdir/big/539-5390350_-clipart.png",
    },
    {
        id: 5,
        url: "https://www.pinclipart.com/picdir/big/539-5390350_-clipart.png",
    },

    {
        id: 6,
        url: "https://www.pinclipart.com/picdir/big/0-8248_laptop-clip-art-image-laptop-clipart-png-download.png",
    },
    {
        id: 6,
        url: "https://www.pinclipart.com/picdir/big/0-8248_laptop-clip-art-image-laptop-clipart-png-download.png",
    },
];
// Game settings
const MOVES = 22;
let shuffledArray = shuffleArray(items);
let selectedCard = [];
let completed = [];
let done = 0;
let pause = false;
let moves_remaining = MOVES;

// reset the game
const resetGame = () => {
    completed = [];
    done = 0;
    pause = false;
    selectedCard = [];
    moves_remaining = MOVES;
    document.querySelectorAll(".moves_remaining")[0].innerText = MOVES;
};
// function to setup game
const setupGame = () => {
    resetGame();
    shuffledArray = shuffleArray(items);
    //   checking if this is the first render
    if (gameContainer.children.length === 0) {
        // if it is than setup the game.
        loadCards(shuffledArray);
    } else {
        // if not than reset the game - remove old card and add new ones.
        gameContainer.childNodes.forEach((card, index) => {
            card.classList.remove("added");
            card.classList.remove("flip");
            setTimeout(() => {
                gameContainer.removeChild(card);
            }, 50 * index * 1);
        });
        loadCards(shuffledArray);
    }
};

function cardEvent(card) {
    // if card is already selected than do nothing
    if (
        completed.includes(card.getAttribute("data-id")) ||
        card.classList.contains("flip")
    ) {
        return;
    }
    if (moves_remaining !== 0) {
        if (!pause) {
            if (!selectedCard.includes(card.getAttribute("data-id"))) {
                card.classList.toggle("flip");
                if (selectedCard.length === 1) {
                    pause = true;
                    selectedCard.push({
                        id: card.getAttribute("data-id"),
                        element: card,
                    });

                    // reducing moves
                    moves_remaining -= 1;
                    movesContainer.title = `You have ${moves_remaining} moves remaining!`;
                    remainingMovesContainer.innerText = moves_remaining;

                    if (selectedCard[0].id === selectedCard[1].id) {
                        // pushing the id of current card as completed.
                        completed.push(selectedCard[0].id);
                        // add wiggle animation to the correct card
                        selectedCard[0].element.classList.add("wiggle");
                        selectedCard[1].element.classList.add("wiggle");
                        setTimeout(() => {
                            // adding a delay to show the color change.
                            // adding 'done' class to cards that are completed.
                            selectedCard[0].element.classList.add("done");
                            selectedCard[1].element.classList.add("done");

                            // removing wiggle animation
                            selectedCard[0].element.classList.remove("wiggle");
                            selectedCard[1].element.classList.remove("wiggle");
                            // enabling touch
                            pause = false;
                            // setting selectedCard to empty
                            selectedCard = [];
                            // setting the card as completed
                            done += 1;

                            // checking if user wins
                            if (done === items.length / 2) {
                                // showing winning message after delay of 500 ms
                                setTimeout(() => {
                                    alert("Congratulations, You Won!");
                                }, 500);
                            }
                        }, 1500);
                    } else {
                        // this.classList.toggle("flip");
                        // add wiggle animation to the wrong card
                        selectedCard[0].element.classList.add("wiggle");
                        selectedCard[1].element.classList.add("wiggle");

                        // using timeout to show the second selected card, if card is correct, we will keep it else we will slip it back.
                        setTimeout(() => {
                            // removing wiggle animation
                            selectedCard[0].element.classList.remove("wiggle");
                            selectedCard[1].element.classList.remove("wiggle");
                            // showing the front of card again
                            selectedCard[0].element.classList.remove("flip");
                            selectedCard[1].element.classList.remove("flip");
                            // setting selectedCard to empty
                            selectedCard = [];
                            // enabling touch
                            pause = false;
                        }, 2000);
                    }
                } else {
                    selectedCard.push({
                        id: card.getAttribute("data-id"),
                        element: card,
                    });
                }
            }
        } else {
            console.log("Wait!!");
        }
    } else {
        alert("You are out of moves! Start a new game.");
    }
}
// function to add new card
const loadCards = (shuffledArray) => {
    shuffledArray.map((card, index) => {
        setTimeout(() => {
            gameContainer.appendChild(createCard(card, cardEvent));
        }, 50 * index);
    });
};

// header
const header = document.createElement("header");
header.classList.add("header");
// creating logo
const imgLogoContainer = document.createElement("div");
imgLogoContainer.classList.add("logo-container");

const imgLogo = document.createElement("img");
imgLogo.classList.add("logo");
imgLogo.setAttribute("loading", "lazy");
imgLogo.setAttribute("src", "/puzzel_match_logo.png");
imgLogoContainer.append(imgLogo);
// creating a button to reset the game
const resetBtn = document.createElement("button");
resetBtn.classList.add("reset-btn");
resetBtn.title = "Restart the Game!";
resetBtn.textContent = "New Game";
resetBtn.addEventListener("click", () => {
    const ques = confirm(
        "Your current progress will be lost if you restart the game!"
    );
    if (ques === true) {
        setupGame();
    }
});

//  moves counter
const movesContainer = document.createElement("div");
movesContainer.classList.add("moves_container");
movesContainer.innerHTML = `Moves Remaining: `;
movesContainer.title = `You have ${moves_remaining} moves remaining!`;

// Moves remaing conatiner
const remainingMovesContainer = document.createElement("span");
remainingMovesContainer.classList.add("moves_remaining");
remainingMovesContainer.innerText = MOVES;
// total moves container
const totalMovesContainer = document.createElement("span");
totalMovesContainer.innerText = `/${MOVES}`;

movesContainer.appendChild(remainingMovesContainer);
movesContainer.appendChild(totalMovesContainer);

// appending header to the screen and resetBtn to the header
header.append(imgLogoContainer);
header.append(resetBtn);
document.body.insertBefore(header, document.body.firstChild);
// appending the game to the screen
document.querySelector("#app").append(gameContainer);
document.querySelector("#app").append(movesContainer);
window.onload = function() {
    setupGame();
};

// create a button to open source code of this project
const gitBtn = document.createElement("footer");
gitBtn.classList.add("git-btn");
gitBtn.classList.add("card-fancy");
const gitLink = document.createElement("a");
gitLink.textContent = "View source code of this game.";
gitLink.classList.add("git-link");
gitLink.href = "https://github.com/AnasOnGit/puzzle-match";

gitBtn.appendChild(gitLink);
document.body.append(gitBtn);

// add click effect
const clickCard = document.querySelectorAll(".card-container");
clickCard.forEach((card) => {
    card.addEventListener("click", function() {
        // if card is already selected than do nothing
        if (completed.includes(card.getAttribute("data-id"))) {
            return;
        }

        if (!pause) {
            if (!selectedCard.includes(card.getAttribute("data-id"))) {
                this.classList.toggle("flip");
                if (selectedCard.length === 1) {
                    pause = true;
                    selectedCard.push({
                        id: card.getAttribute("data-id"),
                        element: this,
                    });
                    if (selectedCard[0].id === selectedCard[1].id) {
                        // pushing the id of current card as completed.
                        completed.push(selectedCard[0].id);
                        // add wiggle animation to the correct card
                        selectedCard[0].element.classList.add("wiggle");
                        selectedCard[1].element.classList.add("wiggle");
                        setTimeout(() => {
                            // adding a delay to show the color change.
                            // adding 'done' class to cards that are completed.
                            selectedCard[0].element.classList.add("done");
                            selectedCard[1].element.classList.add("done");

                            // removing wiggle animation
                            selectedCard[0].element.classList.remove("wiggle");
                            selectedCard[1].element.classList.remove("wiggle");
                            // enabling touch
                            pause = false;
                            // setting selectedCard to empty
                            selectedCard = [];
                            // setting the card as completed
                            done += 1;
                            // checking if user wins
                            if (done === items.length / 2) {
                                // showing winning message after delay of 500 ms
                                setTimeout(() => {
                                    alert("Congratulations, You Won!");
                                }, 500);
                            }
                        }, 1500);
                    } else {
                        // this.classList.toggle("flip");
                        // add wiggle animation to the wrong card
                        selectedCard[0].element.classList.add("wiggle");
                        selectedCard[1].element.classList.add("wiggle");

                        // using timeout to show the second selected card, if card is correct, we will keep it else we will slip it back.
                        setTimeout(() => {
                            // removing wiggle animation
                            selectedCard[0].element.classList.remove("wiggle");
                            selectedCard[1].element.classList.remove("wiggle");
                            // showing the front of card again
                            selectedCard[0].element.classList.remove("flip");
                            selectedCard[1].element.classList.remove("flip");
                            // setting selectedCard to empty
                            selectedCard = [];
                            // enabling touch
                            pause = false;
                        }, 2000);
                    }
                } else {
                    selectedCard.push({
                        id: card.getAttribute("data-id"),
                        element: this,
                    });
                }
            }
        } else {
            console.log("Wait!!");
        }
    });
});
import "../style.css";
export const createCard = (info, cardEvent) => {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("data-id", info.id);
    cardContainer.className = "card-container flip-container added";
    cardContainer.innerHTML = ` <div class="flipper card-fancy">
    <div class="front">
      <img class="qm-img" alt="Guess" src="https://www.onlygfx.com/wp-content/uploads/2018/09/4-comic-question-mark-4.png" />
    </div>
    <div class="back">
      <img class="card-img" alt="Image Clicked!" src="${info.url}" data-id='${info.id}' />
    </div>
  </div>`;

    cardContainer.addEventListener("click", () => cardEvent(cardContainer));
    return cardContainer;
};

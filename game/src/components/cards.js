import React, { useEffect, useState } from "react"; 
import Score from "./score";
import "./styles/cards.css"

const Cards = () => {
    const [numberOfCards, setNumber] = useState(4);

    useEffect(() => {

        for(let i = 0; i < numberOfCards; i++) {
            let cardSection = document.querySelector(".cardSection");
            let card = document.createElement("div")
            card.classList.add("card");
            card.addEventListener("click", () => {
                var list = document.querySelector(".cardSection");
                for (var i = list.children.length; i >= 0; i--) {
                list.appendChild(list.children[Math.random() * i | 0]);
                }
            })
            cardSection.appendChild(card);
        }
        getCharacters();

    }, [])

    async function getCharacters() {

        const requestURL = 'https://thronesapi.com/api/v2/Characters';
        const request = new Request(requestURL);
      
        const response = await fetch(request);
        const characters = await response.json();

        populateCards(characters);
    }

    function getRandomInt(min, max, saved) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let number = Math.floor(Math.random() * (max - min) + min); 

        if(number === saved) {
            getRandomInt(min, max, saved);
        }
        else {
            return number;
        }
    }

    const populateCards = (obj) => {
        const cardList = document.querySelectorAll(".card");
        let savedNumber = 53;
        for(let i = 0; i < cardList.length; i++) {
            let number = getRandomInt(0, 53, savedNumber);
            savedNumber = number;

            const img = document.createElement("img");
            img.src = obj[number].imageUrl;
            cardList[i].appendChild(img);

            const name = document.createElement("p");
            name.textContent = obj[number].fullName;
            cardList[i].appendChild(name);
        }
    }

    return (
        <div className="cardSection">
            
        </div>
    )
}

export default Cards;




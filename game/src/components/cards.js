/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react"; 
import Score from "./score";
import "./styles/cards.css"

const Cards = () => {
    const [numberOfCards, setNumber] = useState(4);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const incrementScore = () => {
        setScore((score + 1));
        console.log(score);
    }

    const resetScore = () => {
        setScore(0);
    }

    useEffect(() => {
        if(score > highScore) {
            setHighScore(score)
        };
    
    }, [score, highScore])

    useEffect(() => {
        let cardList = document.querySelectorAll(".card")
        for(let i = 0; i < cardList.length; i++) {
            cardList[i].onclick = incrementScore;
        }
    }, [score])

    useEffect(() => {

        for(let i = 0; i < numberOfCards; i++) {
            let cardSection = document.querySelector(".cardSection");
            let card = document.createElement("div")
            card.classList.add("card");
            card.onclick = incrementScore;
            card.addEventListener("click", () => {
                let dataNumber = card.firstChild.dataset.idNumber;
                if(cardState[dataNumber] === false) {
                    cardState[dataNumber] = true;
                    console.log(cardState);
                }
                if(allTrue(cardState)) {
                    clearCardSection();
                    cardState = {}
                    setNumber(numberOfCards + 2)
                    console.log(numberOfCards)
                }

                var list = document.querySelector(".cardSection");
                for (var i = list.children.length; i >= 0; i--) {
                list.appendChild(list.children[Math.random() * i | 0]);
                }
            })
            cardSection.appendChild(card);
        }
        getCharacters();

    }, [numberOfCards])

    let cardState = {};

    function clearCardSection() {
        let cardSection = document.querySelector(".cardSection")
        cardSection.innerHTML = "";
    }

    function allTrue(obj) {
        const cardValues = Object.values(obj);
        return cardValues.every(element => element === true)
    }

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

        if(saved.includes(number)) {
            getRandomInt(min, max, saved);
        }
        else {
            return number;
        }
    }

    const populateCards = (obj) => {
        const cardList = document.querySelectorAll(".card");
        let savedNumbers = [];
        for(let i = 0; i < cardList.length; i++) {
            let number = getRandomInt(0, 53, savedNumbers);
            savedNumbers.push(number);
            console.log(savedNumbers);
            cardState[number] = false;

            const img = document.createElement("img");
            img.src = obj[number].imageUrl;
            img.dataset.idNumber = number;
            cardList[i].appendChild(img);

            const name = document.createElement("p");
            name.textContent = obj[number].fullName;
            cardList[i].appendChild(name);
        }
    }

    return (
        <div>
            <div>
            <p>Score: {score}</p>
            <p>High score: {highScore}</p>
            <button onClick={incrementScore}>Increment</button>
            <button onClick={resetScore}>Reset</button>
            </div>
            <div className="cardSection">
            
            </div>
        </div>
    )
}

export default Cards;




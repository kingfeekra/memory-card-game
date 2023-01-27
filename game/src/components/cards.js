/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react"; 
import Score from "./score";
import "./styles/cards.css"

const Cards = () => {
    const [numberOfCards, setNumber] = useState(4);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [cardState, setCardState] = useState({});

    const incrementScore = () => {
        setScore((score + 1));
        console.log(score);
    }

    const resetScore = () => {
        setScore(0);
    }

    const updateCardState = (obj) => {
        setCardState({
            ...cardState,
            ...obj
        })
    }

    useEffect(() => {
        if(score > highScore) {
            setHighScore(score)
        };
    
    }, [score, highScore])

    useEffect(() => {

        for(let i = 0; i < numberOfCards; i++) {
            let cardSection = document.querySelector(".cardSection");
            let card = document.createElement("div")
            card.classList.add("card");
            
            card.addEventListener("click", () => {
                let dataNumber = card.dataset.idNumber;
                if(cardState[dataNumber] === true) {
                    resetScore();
                }
                if(cardState[dataNumber] === false) {
                    let newState = {dataNumber : true};
                    updateCardState(newState);
                    console.log(cardState);
                }
                if(allTrue(cardState)) {
                    clearCardSection();
                    //setCardState({});
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

    useEffect(() => {
        let cardList = document.querySelectorAll(".card")
        for(let i = 0; i < cardList.length; i++) {
                cardList[i].addEventListener("click", () => {
                    //if(cardState[dataNumber] === false) {
                        let dataNumber = cardList[i].getAttribute("data-id-number");
                        incrementScore();
                        //console.log(cardState)
                    //}
                })
        }
    }, [score, numberOfCards])


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
            return getRandomInt(min, max, saved);
        }
        else {
            return number;
        }
    }

    let savedNumbers = [];

    const populateCards = (obj) => {
        const cardList = document.querySelectorAll(".card");
        for(let i = 0; i < cardList.length; i++) {
            let number = getRandomInt(0, 53, savedNumbers);
            savedNumbers.push(number); 
            setCardState({
                ...cardState,
                [number] : false
                
            }, console.log(cardState))
            

            const img = document.createElement("img");
            img.src = obj[number].imageUrl;
            cardList[i].appendChild(img);
            img.parentNode.dataset.idNumber = number;

            const name = document.createElement("p");
            name.textContent = obj[number].fullName;
            cardList[i].appendChild(name);

            if(i === cardList.length -1) {
                savedNumbers = [];
            }
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




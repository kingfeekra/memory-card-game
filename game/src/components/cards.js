/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react"; 
import Score from "./score";
import "./styles/cards.css"

const Cards = () => {
    const [numberOfCards, setNumber] = useState(4);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const incrementScore = () => {
        
    }

    const resetScore = () => {
        setScore(0);
    }

    useEffect(() => {
        if(score > highScore) {
            setHighScore(score)
        };
    
    }, [score])

    useEffect(() => {

        for(let i = 0; i < numberOfCards; i++) {
            let cardSection = document.querySelector(".cardSection");
            let card = document.createElement("div")
            card.classList.add("card");
            card.dataset.clicked = false;
            
            card.addEventListener("click", () => {
                let cardState = card.getAttribute("data-clicked");
                console.log(cardState);
                if(cardState === "false") {
                    card.setAttribute("data-clicked", true)
                    console.log(cardState);
                }
                if(allTrue()) {
                    clearCardSection();
                    setNumber(numberOfCards + 2)
                }
                if(cardState === "true") {
                    gameOver();
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
                cardList[i].onclick = function(){
                    setScore((score + 1));
                    console.log(score);
                }
        }
    }, [score, numberOfCards])


    function clearCardSection() {
        let cardSection = document.querySelector(".cardSection")
        cardSection.innerHTML = "";
    }

    function gameOver() {
        let cardSection = document.querySelector(".cardSection");
        cardSection.innerHTML = "";

        let div = document.createElement("div");
        div.classList.add("gameOver");

        let para = document.createElement("p");
        para.textContent = "Game Over!"
        div.appendChild(para)

        let button = document.createElement("button");
        button.textContent = "Try Again"
        button.onclick = function() {
            cardSection.innerHTML = "";
            if(numberOfCards > 4) {
            setNumber(4);
            }
            else {
                setNumber(5);
            }
            resetScore();
            console.log(numberOfCards);
        }
        div.appendChild(button);
        cardSection.appendChild(div);
    }

    function allTrue() {
        let cardStates = document.querySelectorAll(".card");
        let list = [];
        for(let i = 0; i < cardStates.length; i++) {
            let state = cardStates[i].getAttribute("data-clicked");
            list.push(state)
        }
        function checkList(list) {
            return list === "true";
        }
        return list.every(checkList);
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
            <div className="header">
            <div className="heading">
                <h1>Game of Thrones Memory Game</h1>
                <p>Get points by clicking on an image but don't click on any more than once!</p>
            </div>
            <div class="score">
                <p>Score: {score}</p>
                <p>High score: {highScore}</p>
            </div>
            </div>
            <div className="cardSection">
            </div>
        </div>
    )
}

export default Cards;




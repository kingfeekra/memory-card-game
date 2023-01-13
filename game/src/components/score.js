import React, { useEffect, useState } from "react";

const Score = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const incrementScore = () => {
        setScore(score + 1);
    }

    const resetScore = () => {
        setScore(0);
    }

    useEffect(() => {
            if(score > highScore) {
                setHighScore(score)
            };
        
    }, [score, highScore])


    return (
        <div>
            <p>Score: {score}</p>
            <p>High score: {highScore}</p>
            <button onClick={incrementScore}>Increment</button>
            <button onClick={resetScore}>Reset</button>
        </div>
    )
}

export default Score;
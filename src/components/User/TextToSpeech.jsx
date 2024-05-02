import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
    //   const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const ut = new SpeechSynthesisUtterance(text);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        setTimeout(() => {
            // synth.speak(u);
            handlePlay();
        }, 1000);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        // if (isPaused) {
        //   synth.resume();
        //   setIsPaused(true)
        // }

        // synth.speak(utterance);
        synth.speak(ut);

        // setIsPaused(true);
    };

    //   const handlePause = () => {
    //     const synth = window.speechSynthesis;

    //     synth.pause();

    //     setIsPaused(true);
    //   };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();

        // setIsPaused(false);
    };

    return (
        <div>
            <button onClick={handlePlay}>Play</button>
            {/* <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button> */}
            {/* <button onClick={handlePause}>Pause</button> */}
            <button onClick={handleStop}>Stop</button>
        </div>
    );
};

export default TextToSpeech;
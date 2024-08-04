import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import Speech from 'react-speech';
import { useNavigate } from 'react-router-dom';
import TextToSpeech from './TextToSpeech';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import './SpeechRec.css';

const Dictaphone = ({questions}) => {

    // const questions = ["Briefly explain Computer Networks ?", "What do you understand by DBMS", "Explain importance of Operating Systems", "What is AI and how is it different from Machine Learning"]
    console.log("dict",questions);
    const navigate = useNavigate();
    navigator.mediaDevices.getUserMedia(
        {
            audio: true,
            video: false,
        }
    )
        .then()
        .catch(error => {
            if (error.name === "NotAllowedError") {
                alert("You need to allow microphone access in order for this application to work.");
            }
            else {
                alert("Error usermedia!!")
                console.log("Media error : ", error);
            }
        })
    // const [card, setCardData] = useState({
    //     qno: 1,
    //     q: questions[0]
    // })

    const [idx, setIdx] = useState(0);

    const vrecControls = useVoiceVisualizer();
    const {
        startRecording,
        stopRecording,
        clearCanvas,
        saveAudioFile,
        recordedBlob,
        audioData,
        error,
        audioRef,
        isRecordingInProgress,
    } = vrecControls;

    // Get the recorded audio blob
    useEffect(() => {
        if (!recordedBlob) return;

        console.log(recordedBlob);
    }, [recordedBlob, error]);

    // Get the error when it occurs
    useEffect(() => {
        if (!error) return;

        console.log(error);
    }, [error]);

    

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [str, setstr] = useState("");
    const [sim, setSim] = useState({});
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    // const [b64,setb64]=useState("")
    const user = localStorage.getItem("username")

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    const handleStart = () => {
        setStart(performance.now());
        console.log(start);
        SpeechRecognition.startListening({
            maxAlternatives: 1,
            interimResults: true,
            continuous: true
        });
        startRecording();
    }
    const handleStop = () => {
        setEnd(performance.now());
        console.log(end);
        SpeechRecognition.stopListening();
        stopRecording();
        setstr(transcript);
        saveAudioFile(audioData);

        // const blob = new Blob([audioData], { type: 'audio/mp3' });
        // Create a download link for the Blob
        // const url = URL.createObjectURL(blob);
        // Create an anchor element
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = `${user}-${idx}`;
        // Simulate a click on the anchor element to trigger the download
        // link.click();
        // Release the object URL
        // URL.revokeObjectURL(url);
    }
    const handleReset = () => {
        resetTranscript();
        // setStart(performance.now());
        SpeechRecognition.stopListening();
        stopRecording();
        clearCanvas();
        // setSim({})
    }


    const handleSend = async () => {
        console.log("inside send");
        // handleStop()
        const stringToSend = transcript;
        setstr(stringToSend);
        console.log(transcript);
        if (end === 0) {
            setEnd(performance.now())
        }

        const anstime = end - start;
        // console.log(toString(end-start));
        const file = new Blob([audioData], { type: 'audio/wav' });
        
        handleReset();
        try {
            const response = await fetch('http://localhost:5000/getR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ string: stringToSend, time: anstime, qidx: idx, user: user })
                // body: formdata,
            });

            if (!response.ok) {
                throw new Error('Failed to send string to server');
            }

            // Handle success
            console.log('String sent successfully');
            const data = await response.json();
            setSim(data);
            console.log(data);
            idx < 9 ? setIdx(idx + 1) : navigate('/user/profile')

        } catch (error) {
            // Handle error
            console.error('Error sending string to server:', error);
        }
    }


    return (
        <div style={{ width: '100%', height: '100%', border: '2px solid black', backgroundColor: '#c1dbd9' }}>
            <div style={{ padding: '10px 10px', fontFamily: 'monospace' }}>

                <div style={{ fontFamily: 'courier new', fontWeight: '800', fontSize: '1.5rem' }}>Question : {idx + 1}</div>
                <div style={{ fontWeight: '400', fontSize: '1.5rem' }}>{questions[idx]}</div>
                <div style={{ border: '0px solid black' }}>

                    {/* <Speech
                        text={questions[idx]}
                        pitch="0.9"
                        rate="0.9"
                        volume="1"
                        lang="en-US"
                        voice="Daniel"
                    /> */}
                    <TextToSpeech text={questions[idx]} />

                </div>
                <p style={{ border: '1px solid grey', height: '200px', backgroundColor: 'white', width: '95%', borderRadius: '10px', margin: '10px 20px', padding: '10px 10px' }}>{transcript}</p>
            </div>
            <div style={{ width: '100%', height: '10%', backgroundColor: 'grey', color: 'white', padding: '10px 0 10px 0' }}>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={handleStart}>START</button>
                <button onClick={handleStop}>STOP</button>
                <button onClick={handleReset}>RESET</button>
                <button onClick={handleSend}>NEXT</button>
                <hr></hr>
                <VoiceVisualizer controls={vrecControls} ref={audioRef} backgroundColor="#03354e" gap={0.5} mainBarColor='#c1dbd9' secondaryBarColor='white' barWidth={1} isDownloadAudioButtonShown={true} height={50} width={100} isControlPanelShown={false} canvasContainerClassName='visCanvas' isProgressIndicatorShown={false} isProgressIndicatorOnHoverShown={false} />

                {/* <p>Similar : {sim}</p> */}
                {/* <p>Similar : {sim.issame}</p> */}
                {/* <p>Similarity Score : {sim.score}</p> */}
            </div>
        </div>
    );
};
export default Dictaphone;
import { useState, useEffect } from "react"
import { Image } from 'react-ui'
import img from '../../images/logo.png'
import Timer from "./Timer"
import Dictaphone from "./SpeechRec"
import Visualizer from "./Visualizer"

function InterviewPage() {

  const [questions, setQs] = useState([]);
  const [isload, setload] = useState(true);
  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    setload(true);

    await fetch('http://localhost:5000/getQA')
      .then((response) => {
        console.log(response)
        setQs(response.data);
        setload(false);
        console.log("ques",response.questions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }


    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '97.3%', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1rem', backgroundColor: '#c1dbd9', fontSize: '1.8rem', padding: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.4) 0px 3px 6px' }}>
          <Image alt="logo" src={img} css={{ height: '70px', width: 'auto' }} />
          <span style={{ padding: '4px 0 0 20px' }} >Interview Bot</span>
        </div>
        <Timer />
        <div style={{ width: '79.9%', height: '100%', border: '1px solid red', padding: '4.8% 10%' }}>
          {isload ? <div>Loading Questions... Please Wait</div> : questions && <Dictaphone questions={questions} />}
          {/* <Visualizer /> */}
        </div>

      </div>
    )
  }

  export default InterviewPage
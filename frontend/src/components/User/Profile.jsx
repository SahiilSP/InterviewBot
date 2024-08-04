
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { green } from '@mui/material/colors';

function Profile() {

  const [resultSet, setRes] = useState([]);
  // const [avgwpm, setWPM] = useState(0);
  var avgwpm = 0;
  var confscore = 0;
  var avgsimscore = 0;

  const getResult = async () => {
    try {
      const response = await fetch('http://localhost:5000/result');

      // if (!response.ok) {
      //   throw new Error('Failed to get results');
      // }

      const data = await response.json();
      console.log(data);
      setRes(data);
    } catch (error) {
      console.error('Error fetching from server:', error);
    }
  }
  useEffect(() => {
    getResult()
  }, [])

  const currusser = localStorage.getItem('username')

  return (
    <>
      <NavBar logged={true} />
      <div style={{ padding: '1rem 1rem', fontFamily: 'monospace' }}>
        <h1 style={{ fontWeight: '800' }}><span style={{ fontFamily: 'courier new', fontWeight: '600', backgroundColor: 'red' }}>{currusser}</span>  You have successfully completed the interview!</h1>
        <h1 style={{ fontWeight: '400' }}>Here is a question wise summary of your responses:</h1>
        {/* <input type='text' value={text} onChange={(e) => { setText(e.target.value) }}></input> */}
        {resultSet.map((scobj, index) => {

          return (
            <div key={index} style={{ height: '300px', marginTop:'10px',backgroundColor: '#c1dbd9', padding: '10px 10px' }}>
              <div style={{ width: '100%', height: '100%', border: '0px solid black', display: 'flex', gap: '1px' }}>
                <div className='QandA' style={{ width: '50%', height: '100%', border: '0px solid red' }}>
                  <div style={{ fontFamily: 'courier new', fontWeight: '800', fontSize: '1.3rem' }}>Question : {index + 1}</div>
                  <div style={{ fontWeight: '400', fontSize: '1.3rem' }}>{scobj.q}</div>
                  <p style={{ border: '1px solid grey', height: '60%', backgroundColor: 'white', width: '95%', borderRadius: '10px', margin: '2px 2% 0 0', padding: '10px 10px', scrollBehavior: 'auto', }}>{scobj.text}</p>
                </div>
                <div className="scores" style={{ padding: '30px 0 0 20px', height: '88%', width: '50%', border: '0px solid green', display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'monospace', fontWeight: '600', fontSize: '1.3rem' }}>
                  <div style={{ borderRadius: '10px', height: '80px', width: '47%', backgroundColor: 'white', textAlign: 'center', alignContent: 'center' }}>
                    <div>{(100 * (scobj.simscore[0] + scobj.simscore[1]) / 2).toPrecision(3)}</div>
                    <div>Answer similarity</div>
                  </div>
                  <div style={{ borderRadius: '10px', height: '80px', width: '47%', backgroundColor: 'white', textAlign: 'center', alignContent: 'center' }}>
                    <div>{scobj.qwpm}</div>
                    <div>Words Per Minute</div>
                  </div>
                  <div style={{ borderRadius: '10px', height: '80px', width: '47%', backgroundColor: 'white', textAlign: 'center', alignContent: 'center' }}>
                    <div>{(100*scobj.sentiment.score).toPrecision(3)}</div>
                    <div>Confidence Score</div>
                  </div>
                  <div style={{ borderRadius: '10px', height: '80px', width: '47%', backgroundColor: 'white', textAlign: 'center', alignContent: 'center' }}>
                    <div>{scobj.sentiment.sentiment}</div>
                    <div>Sentiment</div>
                  </div>
                </div>
              </div>

              {/*
                resultSet.map((item, index) => {

                  {/* setWPM(avgwpm + item.qwpm)  }
                  avgwpm += item.qwpm

                  return (
                    <div key={index} style={{ border: '1px solid black', backgroundColor: 'white', padding: '10px 10px' }}>
                      <p >Question  :{index + 1}</p>
                      <p >Score  :{(item.semscore * 100).toPrecision(4)}%</p>
                      <p >Similarity  :{item.issim}</p>
                      <p >WPM  :{item.qwpm}</p>
                    </div>
                  )
                })
              */}
              {/* {scobj.grammar.length > 0 ? <div>
                <h2>Some grammatical errors you may correct :</h2>
                {scobj.grammar.map((item, index) => {
                  return (
                    <>
                      <p>At Offset : {scobj.grammar.offset[0]}</p>
                      <p>Error : {scobj.grammar.bad[1]}</p>
                      <p>{scobj.grammar.description[2]}</p>
                    </>
                  )

                })}
              </div> : <></>
              } */}
            </div>
          )
        })
        }


        <div>Your average speaking speed is : {avgwpm / resultSet.length} wpm</div>

      </div>
    </>
  )
}

export default Profile
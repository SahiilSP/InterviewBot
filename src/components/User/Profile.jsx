
import React, { useState, useEffect } from 'react';

function Profile() {

  const [resultSet, setRes] = useState([]);
  // const [avgwpm, setWPM] = useState(0);
  var avgwpm = 0;

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
    <div style={{padding:'1rem 1rem'}}>
      <h1><span style={{fontFamily:'courier new',fontWeight:'600'}}>{currusser}</span>  You have successfully completed the interview!</h1>
      <h3>Here is a question wise summary of your responses:</h3>
      {/* <input type='text' value={text} onChange={(e) => { setText(e.target.value) }}></input> */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5%',backgroundColor:'#c1dbd9',padding:'10px 10px'}}>
        {
          resultSet.map((item, index) => {

            {/* setWPM(avgwpm + item.qwpm) */}
            avgwpm+=item.qwpm

            return (
              <div key={index} style={{border:'1px solid black',backgroundColor:'white',padding:'10px 10px'}}>
                <p >Question  :{index + 1}</p>
                <p >Score  :{(item.semscore * 100).toPrecision(4)}%</p>
                <p >Similarity  :{item.issim}</p>
                <p >WPM  :{item.qwpm}</p>
              </div>
            )
          })
        }
      </div>
      <div>Your average speaking speed is : {avgwpm / resultSet.length} wpm</div>

    </div>
  )
}

export default Profile
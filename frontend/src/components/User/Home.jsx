import NavBar from '../NavBar'
import { Dialog, Button, ThemeProvider } from 'react-ui'
import Instruction from './Instruction'
import Domain from '../Domain'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cnimg from '../dom_images/cn.jpg'
import osimg from '../dom_images/os.jpg'
import dbimg from '../dom_images/dbms.png'
import aimlimg from '../dom_images/aiml.jpg'
import ccimg from '../dom_images/cc.jpg'
import dsaimg from '../dom_images/dsa.jpg'
import webdimg from '../dom_images/webd.jpg'
import appdimg from '../dom_images/appd.jpg'

function Home() {
    const navigate = useNavigate()

    const user = localStorage.getItem('username')
    const instructionSet = [
        {
            ihead: "Sit in a quiet room",
            ibody: "Make sure there is no disturbance during the interview"
        },
        {
            ihead: "Do not copy",
            ibody: "Be genuine with youre answers, helps to provide feedback"
        },
        {
            ihead: "Allow access",
            ibody: "Give permission to record video and audio through webcam and mic"
        },
        {
            ihead: "Speak clearly",
            ibody: "To accurately assess your answers and provide feedback"
        },
        {
            ihead: "Be confident",
            ibody: "Start the test when you are ready. All the best!"
        },
        {
            ihead: "Be confident",
            ibody: "Start the test when you are ready. All the best!"
        },
    ]
    // const instHead = [, , , , ""]
    // const instBody = [, , , , ""]

    const domainSet = ["Computer Networks", "Operating Systems", " DBMS", "AI/ML", "Cloud Computing", "DSA", "Web Development", "App Development"]
    const domainImageSet = [cnimg, osimg, dbimg, aimlimg, ccimg, dsaimg, webdimg, appdimg]

    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);


    const handleClick = () => {
        close()
        navigate('/user/interview')
    }

    const dialogComponents = {
        DialogContent: {
            backgroundColor: '#212122',
            color: 'white',
            borderRadius: 8,
            padding: '2% 0.7% 2% 1.2%',
            fontFamily: 'monospace',
            width: '80%'
        },
        DialogOverlay: {
            backgroundColor: 'rgba(1,1,1,0.7)',
            width:'100%'
        }
    }

    return (
        <>
            <NavBar logged={true} />
            <div style={{ width: '100%', textAlign: 'left', backgroundColor: '#c1dbd9', borderTop: '2px solid black', boxShadow: 'rgba(0, 0, 0, 0.4) 0px 3px 6px' }}>
                <h1 style={{ fontFamily: 'Courier New', fontWeight: '600', marginLeft: '2rem', marginBottom: '1rem' }}>Welcome, <span style={{ color: '#03354e', fontWeight: '600' }}>{user}</span>!</h1>
            </div>

            <div style={{ width: '97.8%', paddingLeft: '2%', border: '0 solid black' }}>
                <u><h1 style={{ fontWeight: '350' }}>Take a mock interview <span style={{ fontWeight: '400', color: 'red' }}>NOW</span>. Follow these steps:</h1></u>
                <div style={{ width: '98%', border: '0px solid red', height: '100%', margin: '0 0', display: 'flex', flexWrap: 'wrap', gap: '5%', justifyContent: 'space-around' }}>

                    {/*<Instruction key={1} text={instructionSet[1]} num={1}/>
                     <Instruction />
                    <Instruction /> */}
                    {
                        instructionSet.map((inst, index) => {
                            return <Instruction text={inst} key={index} num={index + 1} />
                        })
                    }

                </div>

            </div>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '5%' }}>
                <Button type="button" onClick={open} style={{ height: '50px', fontWeight: '500', fontSize: '2rem', padding: '2% 1%', borderRadius: '5px', backgroundColor: '#ff2400', fontFamily: 'monospace' }}>Take Mock Interview</Button>
            </div>
            <ThemeProvider components={dialogComponents}>

                <Dialog isOpen={showDialog} onDismiss={close}>
                    <p style={{ fontWeight: '500', fontSize: '1.4rem' }}>Read the instructions carefully before proceeding:</p>
                    <ul style={{ fontWeight: '350', fontSize: '1.1rem' }}>
                        <li>The duration will be of the interview is 30 minutes.</li>
                        <li>Make sure your mic is working properly and there is no background noise.</li>
                        <li>Wait till the assistant completely asks the question.</li>
                        <li>Click the START button before answering the question.</li>
                        <li>You have the chance to restart your answer, click the RESET button.</li>
                        <li>Click the NEXT button to save your answer and move to the next question.</li>
                        <li>Do not hesitate to SKIP the question if you are unable to answer.</li>
                    </ul>
                    <p style={{ fontWeight: '500', fontSize: '1.4rem' }}>ALL THE BEST !</p>
                    <Button type="button" onClick={handleClick} style={{ height: '40px', fontWeight: '400', fontSize: '1.3rem', padding: '2% 1%', borderRadius: '5px', backgroundColor: '#b0fc38', fontFamily: 'monospace',boxShadow:'0 0 10px 1px green' }}>
                        Start Interview
                    </Button>
                </Dialog>
            </ThemeProvider>


            <div style={{ backgroundColor: 'rgb(247 250 252 / 1)', width: '97.3%', marginTop: '5%', padding: '10px 20px 60px 20px' }}>
                <h1 style={{ width: '100%', textAlign: 'center', fontWeight: '600', fontFamily: 'Courier New' }}>Questions will be based on following Domains</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                    {/* <Domain /> */}
                    {domainSet.map((dom, index) => {
                        return <Domain text={dom} dimg={domainImageSet[index]} key={index} />
                    })}

                </div>
            </div>
        </>
    )
}

export default Home;



{/* <div style={{ height: '200px', overflow: 'hidden', border: '1px solid black', backgroundColor: 'white', borderRadius: '5px' }}>
    <Stack direction="vertical">
        <Image alt="CN" src="../dom_images/cn.jpg" css={{ height: '135px', width: '300px' }} />
        <Text as="h3" css={{ backgroundColor: 'rgba(0,0,200,0.5)', height: '65px', textAlign: 'center', paddingTop: '10px', fontWeight: '500' }}>Computer Networks</Text>
    </Stack>
</div> */}
 
import React, { Component } from "react";
import { Stack,Text } from "react-ui";
 
class Timer extends Component {
    constructor(props) {
        super(props);
 
        // We need ref in this, because we are dealing
        // with JS setInterval to keep track of it and
        // stop it when needed
        this.Ref = React.createRef();
 
        // The state for our timer
        this.state = {
            // timer: "00|00|00",
            hh:"00",
            m:"00",
            s:"00"
        };
    }
 
    getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
 
    startTimer = (e) => {
        let { total, hours, minutes, seconds } = this.getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            this.setState({
                // timer:
                //     (hours > 9 ? hours : "0" + hours) +
                //     "|" +
                //     (minutes > 9 ? minutes : "0" + minutes) +
                //     "|" +
                //     (seconds > 9 ? seconds : "0" + seconds),
                
                   hh: (hours > 9 ? hours : "0" + hours),
                    m:  (minutes > 9 ? minutes : "0" + minutes),
                    s: (seconds > 9 ? seconds : "0" + seconds),
            });
        }
    };
 
    clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        this.setState({ 
            // timer: "00|30|00" 
            hh:"00",
            m:"30",
            s:"00"
        });
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (this.Ref.current) clearInterval(this.Ref.current);
        const id = setInterval(() => {
            this.startTimer(e);
        }, 1000);
        this.Ref.current = id;
    };
 
    getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you extend to add more time
        deadline.setSeconds(deadline.getSeconds() + 1800);
        return deadline;
    };
 
    // We can use componentDidMount so that when the component
    // mount the timer will start as soon as possible
    componentDidMount() {
        this.clearTimer(this.getDeadTime());
    }
 
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    onClickReset = () => {
        this.clearTimer(this.getDeadTime());
    };
 
    render() {
        return (
            <div style={{ textAlign: "center", float:"right" ,width:'17%',backgroundColor:'#03354e',padding:'8px 8px',borderRadius:'10px',color:"white",position:'relative',top:'-77px',right:'12px' }}>
                <Stack justify="space-evenly" align="center" >
                        <Stack direction="vertical">
                            <Text size={22}>{this.state.hh}</Text>
                            <Text size={15}>Hours</Text>
                        </Stack>
                        <div style={{width:'1px',height:'45px',backgroundColor:'white'}}></div>
                        <Stack direction="vertical">
                            <Text size={22}>{this.state.m}</Text>
                            <Text size={15}>Minutes</Text>
                        </Stack>
                        <div style={{width:'1px',height:'45px',backgroundColor:'white'}}></div>
                        <Stack direction="vertical">
                            <Text size={22}>{this.state.s}</Text>
                            <Text size={15}>Seconds</Text>
                        </Stack>

                </Stack>

                {/* <h2>{this.state.hh}</h2> */}
                {/* <button onClick={this.onClickReset}>Reset</button> */}
            </div>
        );
    }
}
 
export default Timer;
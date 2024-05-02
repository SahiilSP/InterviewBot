import { Stack, Text } from 'react-ui'

function Instruction(props) {
    return (
        <>
            <div style={{ width: '26%', padding: '20px 0', border: '0 solid black', boxShadow: 'rgba(3, 102, 214, 0.5) 0px 0px 0px 3px', marginTop: '5%', backgroundColor: 'rgb(247 250 252 / 1)', display: 'flex',justifyContent:'space-around' }}>
                <div style={{ margin:'15px 10px 0 -23px',textAlign: 'center', width: '67px', height: '54px', borderRadius: '27px', backgroundColor: 'rgba(3, 102, 214, 0.95)', fontWeight: '500', fontSize: '2rem' }}>{props.num}</div>
                {/* <Stack justify="flex-start" align="center" gap={40} style={{ marginLeft: '-22px' }}> */}


                {/* <div style={{width:'1px',height:'80px',backgroundColor:'black'}}></div> */}
                <Stack direction="vertical" gap={2}>
                    <Text as="label" size={28} css={{fontFamily:'monospace',letterSpacing:'-1px'}}>{props.text.ihead}</Text>
                    <Text size={20} color="grey">{props.text.ibody}.</Text>
                </Stack>

                {/* </Stack> */}
            </div>
        </>
    )
}

export default Instruction
import { Stack, Image, Text } from 'react-ui'


function Domain(props) {

    
    return (
        <div style={{ height: '200px',overflow:'hidden', border: '1px solid black', backgroundColor: 'white', borderRadius: '5px' ,marginTop:'5%',boxShadow:'0px 0px 10px 4px #48abe0'}}>
            <Stack direction="vertical" gap={0}>
                <Image alt={props.text} src={props.dimg} css={{ height: '150px', width: '300px',objectFit:'cover' }} />
                <Text as="h3" css={{ backgroundColor: 'rgba(0,0,200,0.5)', height: '50px', textAlign: 'center', paddingTop: '10px', fontWeight: '800',fontSize:'1.4rem',fontFamily:'monospace' }}>{props.text}</Text>
            </Stack>
        </div>
    )
}

export default Domain

import Navbar from './navbar';
import Head from './head';
import Container from 'react-bootstrap/Container'

let layout = (props) => {
    if(props.structure == false){
        return(
            <div>
                <Head />
                <Navbar />
                {props.children}
            </div>
            )
    }
    return(
    <div>
        <Head />
        <Navbar />
        <Container>
        {props.children}
        </Container>
    </div>
    )
}

export default layout;
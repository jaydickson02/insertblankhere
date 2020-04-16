
import Navbar from './navbar';
import Head from './head';
import Container from 'react-bootstrap/Container'
import Footer from './footer'

let layout = (props) => {

    if(props.structure == false){
        return(
            <div>
                <Head />
                <Container>
                <Navbar activeLink={props.activeLink}/>
                </Container>
                {props.children}
                <Footer />
            </div>
            )
    }

    return(
        <div>
            <Head />
            <Container>
            <Navbar activeLink={props.activeLink}/>
            {props.children}
            </Container>
            <Footer />
        </div>
    )
}

export default layout;
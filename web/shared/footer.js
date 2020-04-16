
import Navbar from 'react-bootstrap/Navbar'

let footer = () => {

    return(
    <Navbar bg='light' sticky='bottom' className="justify-content-center" style={{marginTop:'15px'}}>
            <Navbar.Text>
            © 2020. Built by Jay Dickson.
            </Navbar.Text>
    </Navbar>
    )
}

export default footer;
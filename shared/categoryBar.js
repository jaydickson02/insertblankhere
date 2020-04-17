import Nav from 'react-bootstrap/Nav';
import Link from 'next/link'

let categoryBar = () => {

  //Setup to take props and dynamically generate categories
    return(
        <Nav style={{paddingBottom: '12px'}}>
        <Nav.Item>
          <Nav.Link href="/articles/all">Recent</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/articles/science">Science</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/articles/development">Development</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/articles/movies">Movies</Nav.Link>
        </Nav.Item>
      </Nav>
    )
}

export default categoryBar;


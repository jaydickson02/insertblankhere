// index.js
import Link from 'next/link'
import groq from 'groq'
import client from '../shared/client'
import imageUrlBuilder from '@sanity/image-url';

//Components
import Layout from '../shared/layout'

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

const Index = (props) => {
    const { posts = [] } = props
    console.log(posts)
   
    return (
      
      <Layout activeLink={'/'}>
        
        <Jumbotron style={{backgroundImage: urlFor(posts[0].mainImage).url()}}>
          <h1>{posts[0].title}</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Link href="/article/[slug]" as={`/article/${posts[0].slug.current}`}>
                <a className="text-white">
                  <Button variant="primary">            
                      Read
                  </Button>
                </a>
            </Link>
          </p>
        </Jumbotron>
        <Row>
        {posts.map(
          ({ _id, title = '', slug = '', _updatedAt = '', mainImage = ''}) =>
            slug && (
              <Col sm={12} md={6} lg={4}>
              <Container>
              <Card key={_id} style={{ width: '18rem', marginBottom: '25px'}}>
              <Card.Img variant="top" src={urlFor(mainImage).url()} style={{height:'180px'}}/>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {new Date(_updatedAt).toDateString()}
                </Card.Text>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Link href="/article/[slug]" as={`/article/${slug.current}`}>
                  <a className="text-white">
                    <Button variant="primary">            
                        Read
                    </Button>
                  </a>
                </Link>
              </Card.Body>
              </Card>
              </Container>
              </Col>
            )
        )}
        </Row>
      </Layout>
    )
}

Index.getInitialProps = async () => ({
    posts: await client.fetch(groq`
      *[_type == "post"]|order(publishedAt desc)
    `)
})

export default Index
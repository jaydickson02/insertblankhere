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
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

const Index = (props) => {

    //Organisation of featured posts
    let { posts = [] } = props
    posts = posts.slice(0, 10);

    let jumboPost = posts[0]

    let cardPosts = posts.slice(1,4);

    let listPosts = posts.slice(5,10);

   
    return (
      
      <Layout activeLink={'/'}>
        
        <Jumbotron className ='jumbotron bg-dark text-white'>
          <h1>{jumboPost.title}</h1>
          <p>
            {jumboPost.description}
          </p>
          <p>
            <Link href="/article/[slug]" as={`/article/${jumboPost.slug.current}`}>
                <a className="text-white">
                  <Button variant="primary">            
                      Read
                  </Button>
                </a>
            </Link>
          </p>
        </Jumbotron>

        
        <Row>
          <Col lg={8}>
        {cardPosts.map(
          ({ _id, title = '', slug = '', _updatedAt = '', mainImage = '', description = ''}) =>
            slug && (
                
                  <Card key={_id} style={{marginBottom:'20px'}} >
                    
                        <Card.Body className="text-dark">
                        <Link href="/article/[slug]" as={`/article/${slug.current}`}>
                    <a>
                        <Card.Title className="text-dark" as='h2'>
                          {title}
                        </Card.Title>

                        </a>
                  </Link>
                  <small className="text-muted">{new Date(_updatedAt).toDateString()}</small>
                          <Card.Text>
                            {description}
                          </Card.Text>
                        </Card.Body>
                    <Link href="/article/[slug]" as={`/article/${slug.current}`}>
                    <a>
                        <div style={{textAlign:'center'}}>
                          <Card.Img 
                            src={urlFor(mainImage).width(1600).height(600).url()} 
                            style={{padding: '10px'}}

                            className='rounded'
                          >

                          </Card.Img>
                        </div>
                    </a>
                  </Link>
                  </Card>
            )
        )}
        </Col>

        <Col>
          <div style={{textAlign:'center'}}>
            <h3>Recent Articles</h3>
          </div>
          <ListGroup variant="flush">
          {listPosts.map(
            ({ _id, title = '', slug = '', _updatedAt = '', mainImage = '', description = ''}) =>
            slug && (
              <ListGroup.Item key={_id}>
                <Link href="/article/[slug]" as={`/article/${slug.current}`}>
                  <a>
                    {title}
                  </a>
                </Link>
                </ListGroup.Item>
            )
         )}
          </ListGroup>
        </Col>

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
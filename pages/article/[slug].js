// [slug].js
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import client from '../../shared/client';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Link from 'next/link';

//Components
import Layout from '../../shared/layout';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

const serializers = {
  types: {
    code: ({ node }) => {
      if (!node || !node.code) { return null }
        const {language, code} = node 
        return (
          <SyntaxHighlighter language={language || 'text'} style={atomOneDark}>
            {code}
          </SyntaxHighlighter>
        )
    }
  }
}

const Post = (props) => {
  const {
    title = 'no article',
    name,
    categories,
    authorImage,
    heroImage,
    body = []
  } = props

  if(title == 'no article'){
    return(
      <Layout structure={false}>
        <Container style={{height:'60vh'}}>
          <h1>Article not found!</h1>
          <h4>Check the URL for errors or head back to the <Link href={'/'}><a>Home Page</a></Link></h4>
        </Container>
      </Layout>
    )
  } 

  return (
    <Layout structure={false} activeLink={'/'}>
      <img src={urlFor(heroImage).width(3000).height(1000).url()} style={{maxWidth: '100%'}}></img>

    <Container>
    <article>
      <h1 style={{marginTop:'25px', marginBottom:'30px'}}>{title}</h1>
      <Row style={{paddingBottom: '20px'}}>
        <Col>
        {authorImage && (
          <span>
            <Image src={urlFor(authorImage).width(50).url()} style={{display:'inline'}} roundedCircle/>
          </span>
          )
        }
       
        
          <span style={{margin: '15px'}}>By {name}</span>
      
          </Col>
          
        </Row>
   
        
          <Row>
              <Nav style={{paddingBottom: '30px'}}>
                  <Nav.Item><Nav.Link style={{color: 'black'}}><h6>Tags:</h6></Nav.Link></Nav.Item>
                  {categories.map(category => <Nav.Item><Nav.Link href={'/articles/' + category}><h6 key={category}>{category}</h6></Nav.Link></Nav.Item>)}
              </Nav>
          </Row>

     
      
      
      
      <BlockContent
        blocks={body}
        serializers={serializers}
        {...client.config()}
      />
    </article>
    </Container>
    <style jsx global>
    {`
      img {
        max-width: 100%;
        display: block; 
        margin-left: auto;
        margin-right: auto;
      }
    `}
    </style>
    </Layout>
    
  )
}


const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body,
  "heroImage": mainImage
}`

Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query
  return await client.fetch(query, { slug })
}

export default Post
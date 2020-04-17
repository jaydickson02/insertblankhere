import Link from 'next/link'
import groq from 'groq'
import client from '../../shared/client'
import imageUrlBuilder from '@sanity/image-url';

//Components
import Layout from '../../shared/layout'
import CategoryBar from '../../shared/categoryBar'

//Bootstrap
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

let articles = (props) => {
    
  console.log(props)
  if(props['posts'] == 'undefined'){
    return(
        <Layout structure={false} >
          <Container style={{height:'60vh'}}>
            <h1>Page not found!</h1>
            <h4>Check the URL for errors or head back to the <Link href={'/'}><a>Home Page</a></Link></h4>
          </Container>
        </Layout>
      )
}
    

    //Organisation of posts
    let { posts = [] } = props;
    
    
    
    console.log(posts)
    return(
    <Layout activeLink={'/articles/all'}>
    <CategoryBar/>
    {posts.map(
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
      </Layout>
    )

}


let query= groq`*[_type == "category" && title == $search]{
    "posts": *[_type == "post" && references(^._id)]|order(publishedAt desc)
 }`


articles.getInitialProps = async function (context) {
    // It's important to default the value so that it doesn't return "undefined"
    let { search = "" } = context.query
    
    search = search.charAt(0).toUpperCase() + search.substring(1);

    if(search == 'All'){
      let posts = await client.fetch(groq`*[_type == "post"]|order(publishedAt desc)`)
      return ({'posts': posts})
    }
   
    let posts = await client.fetch(query, { search })
    
    console.log(posts.length)

    if(posts.length < 1){
      return({'posts': 'undefined'})
    } else {
      return(posts[0])
    }
    
  }

export default articles;
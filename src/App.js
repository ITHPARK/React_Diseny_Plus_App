import styled from 'styled-components'
import Nav from './components/Nav';
import Banner from './components/Banner'
import Category from './components/Category'
import Row from './components/Row'
import request from './api/request';
import './App.css';

function App() {
  return (
    <Container>
      <Nav></Nav>
      <Banner></Banner>  
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={request.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={request.fetchTopRated}/>
      <Row title="Action Movies" id="AM" fetchUrl={request.fetchActionMovies}/>
      <Row title="Comedy Now" id="CM" fetchUrl={request.fetchComedyMovies}/>
    </Container>
  );
}

export default App;


const Container = styled.div`

  padding: 0 calc(3.5vw + 5px);
  min-height: calc(100vh - 250px);
  display: block;
  position: relative; 
  top: 72px; 
  overflow-x: hidden;  

  &:after {
    content: ""; 
    position: absolute; 
    background: url("/images/home-background.png") center center/cover no-repeat fixed; 
    inset: 0; 
    opacity: 1;
    z-index: -1;
  }

`
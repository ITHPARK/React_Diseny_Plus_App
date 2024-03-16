import styled from 'styled-components'
import Nav from './components/Nav';
import Banner from './components/Banner'
import './App.css';

function App() {
  return (
    <Container>
      <Nav></Nav>
      <Banner></Banner>  
    </Container>
  );
}

export default App;


const Container = styled.div`

  padding: - calc(3.5vw + 5px);
  min-height: calc(100vh - 250px);
  display: block;
  position: relative; 
  top: 72px; 
  overflow-x: hiedden;  

  &:after {
    content: ""; 
    position: absolute; 
    background: url("/images/home-background.png") center center/cover no-repeat fixed; 
    inset: 0; 
    opacity: 1;
    z-index: -1;
  }

`
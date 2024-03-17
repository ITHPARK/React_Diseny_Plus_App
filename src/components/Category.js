import React, { useEffect, useState}  from 'react';
import styled from 'styled-components';


function Category() {
  return (
    
    <Container>
      <Wrap>
        <img src="/images/viewers-disney.png" alt="디즈니 로고"/>
        <video autoPlay loop muted>
          <source src="/videos/disney.mp4" /> 
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-marvel.png" alt="마블 로고"/>
        <video autoPlay loop muted>
          <source src="/videos/marvel.mp4" /> 
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-national.png" alt="내셔널 로고"/>
        <video autoPlay loop muted>
          <source src="/videos/national-geographic.mp4" /> 
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-pixar.png" alt="픽사 로고"/>
        <video autoPlay loop muted>
          <source src="/videos/pixar.mp4" /> 
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-starwars.png" alt="스타워즈 로고"/>
        <video autoPlay loop muted>
          <source src="/videos/star-wars.mp4" /> 
        </video>
      </Wrap>
    </Container>
    
    
  )
}

export default Category

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns : repeat(1, 1fr);
  }
`;

const Wrap = styled.div`
  padding-top : 56.25%;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px; 
  box-shadow: rgba(0 ,0, 0, 0.69) 0px 26px 30px -10px, rgba( 0, 0, 0, 0.73) 0px 16px 10px -10px ;
  cursor: pointer;
  overflow: hidden;
  transition: all 250ms; cubic-bezier(0.25, 0.46, 0.45, 0.94);

  img  {
    width: 100%;
    heightL 100%;
    display: block;
    position: absolute;
    inset: 0; 
    object-fit: cover;
    opacity: 1;
    transition: opacity 500ms ease-in-out 0s;
    z-index: 1;
  }

  video{ 
    width: 100%:;
    height: 100%;
    position: absolute;
    top: 0px; 
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: 0px 40px 58px -16px rgba(0 ,0, 0, 0.8), 0px 30px 22px -10px rgba( 0, 0, 0, 0.72); transition: scale(1.05); border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }

`;
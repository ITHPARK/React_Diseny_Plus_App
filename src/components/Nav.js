import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Nav() {
    
    //현재 브라우저의 스크롤 값을 구할 state
    const [show, setShow] = useState(false);

    useEffect(() => {

      //컴포넌트가 Didmount 됐을 때
      window.addEventListener('scroll', () => {
          if(window.scrollY > 50){
              setShow(true);
          }else {
              setShow(false);
          }
          
      })

      //컴포넌트가 unmout 됐을 때
      return () => {
        window.removeEventListener('scroll', () => {});
      }

      //컴포넌트가 update 됐을 때 (의존성 배열) => 배열안에 값이 바뀔 때마다 컴포넌트를 다시 렌더링 (빈 값일 시 최초 1번만 렌더링됨 )
    }, [])
    


  return (
    <NavWrapper show={show}>
        <Logo>
            <img 
                alt="Disney Plus Logo"
                src="/images/logo.svg"
                onClick={() => {window.location.href = "/"}}
            />
        </Logo>
    </NavWrapper>
  )
}

export default Nav

const NavWrapper = styled.nav`
    padding: 0 36px; display: flex; justify-content: space-between; align-items: center; position: fixed; top: 0; left: 0; right: 0; height: 70px; background-color: ${props => props.show ? "#090b13" : "transparent"}; z-index: 3; 
`

const Logo = styled.a`
    padding: 0; margin-top: 4px; width: 80px; max-height: 70px; display: inline-block; font-size: 0; 
    img {
        display: block; width: 100%;
    }
`
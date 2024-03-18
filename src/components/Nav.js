import React, { useEffect, useState, } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function Nav() {
    
    //현재 브라우저의 스크롤 값을 구할 state
    const [show, setShow] = useState(false);

    //현재 경로를 나타냄
    const{ pathname } = useLocation();

    //영화 검색
    const [searchValue, setSearchValue] = useState("");

    //검색창에 검색어를 칠때 결과값에 따라서 경로이동을 해주게 할 함수
    const navigate = useNavigate();


    useEffect(() => {

      //컴포넌트가 Didmount 됐을 때
      window.addEventListener('scroll', handleScroll)

      //컴포넌트가 unmout 됐을 때
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }

      //컴포넌트가 update 됐을 때 (의존성 배열) => 배열안에 값이 바뀔 때마다 컴포넌트를 다시 렌더링 (빈 값일 시 최초 1번만 렌더링됨 )
    }, [])



    const handleScroll = () => {
        if(window.scrollY > 50){
            setShow(true);
        }else {
            setShow(false);
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);

        //검색어를 입력할 때 마다 /search 경로로 이동시켜줌
        navigate(`/search?q=${e.target.value}`);
        
    }

    
    
  return (
    <NavWrapper show={show}>
        <Logo>
            <img 
                alt="Disney Plus Logo"
                src="/images/logo.svg"
                onClick={() => {window.location.href = "/"}}
            />
        </Logo>

        {pathname === "/" ? 
            (<Login>Login</Login>) : 
            (
                <Input 
                    value={searchValue}
                    onChange={handleChange}
                    className='nav_input'
                    type="text"
                    placeholder="검색해주세요."
                />
            ) 
        }

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
const Login = styled.a`
    padding: 8px 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    backgorund-color: rgba(0, 0, 0, 0.6);
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
    
`

const Input = styled.input`
    padding: 5px;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.582);
    border: none;
    border-radius: 5px;
`
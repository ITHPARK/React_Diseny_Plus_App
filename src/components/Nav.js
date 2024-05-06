import React, { useEffect, useState, } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import {useDispatch, useSelector}  from'react-redux';
import { setUser, removeUser } from '../store/userSlice';

function Nav() {

    //이미 로그인을 한 기록이 있으면 새로고침해도 userData에 데이터가 남게 처리
    // const initialUserDate = localStorage.getItem('userData') ? 
    //스트링 데이터를 다시 localStorage 객체로 변환
    // JSON.parse(localStorage.getItem('userData')) : {}
    
    //현재 브라우저의 스크롤 값을 구할 state
    const [show, setShow] = useState(false);

    //현재 경로를 나타냄
    const{ pathname } = useLocation();

    //영화 검색
    const [searchValue, setSearchValue] = useState("");

    //구글 로그인 유저 데이터를 담을 state
    // const [userData, setuserData] = useState(initialUserDate);

    //검색창에 검색어를 칠때 결과값에 따라서 경로이동을 해주게 할 함수
    const navigate = useNavigate();

    //firebase 앱에서 현재 인증된 사용자의 정보를 반환 
    const auth = getAuth();

    //GoogleAuthProvider의 새로운 인스턴스를 생성하고 이를 이용해 로그인 처리 제공자로 사용가능
    const provider = new GoogleAuthProvider();

    const dispatch = useDispatch();

    const userData = useSelector(state => state.user);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                if(pathname === "/"){
                    navigate("/main");
                }
            }else {
                navigate("/");
            }
        })

        //아래 변수들이 변경될 때 다시 로드 
    }, [auth, navigate, pathname]);
    


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

    const handleAuth = () => {

        //사용자가 google로그인을 할수 있게 하는 로그인 팝업
        signInWithPopup(auth, provider)

        //로그인 완료 후 처리
        .then(result => {
            // setuserData(result.user);

            //로그인 데이터를 store객체에 삽입
            dispatch(setUser({
                id: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL

            }));

            //로컬스토리지에 데이터를 저장
            //JSON.stringify를 이용하여 텍스트롤 변환해준 후 저장을 해주면 된다.
            localStorage.setItem("userData", JSON.stringify(result.user));


        })

        //에러처리
        .catch(error => {console.error(error)})
    }   

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            //유저 정보를 다시 빈 객체로 변경해주고 루트페이지(로그인 페이지)로 이동
            // setuserData({});
            navigate("/");
            dispatch(removeUser());
        })
        .catch(error => {
            //에러처리
            console.error(error)
        });
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
            (
            <Login
                onClick={handleAuth }
            >Login</Login>
            ) : 
            (
                <div>
                    <Input 
                        value={searchValue}
                        onChange={handleChange}
                        className='nav_input'
                        type="text"
                        placeholder="검색해주세요."
                    />

                    <SignOut>
                        <UserImg src={userData.photoURL} alt={userData.displayName}/>
                        <DropDown>
                            <span onClick={handleSignOut}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </div>
            ) 
        }

    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;


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
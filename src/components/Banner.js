import React, { useEffect, useState}  from 'react'
import styled from 'styled-components'
import axios from '../api/axios';
import request from '../api/request';
import "./Banner.css";

function Banner() {

  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);


   useEffect(() => {
    fetchData();
   }, []);

   /*
    const fetchData = () => {
      const response = axios.get(request.fetchNowPlaying);
      console.log(response)
    }

    위처럼 코드를 작성하게되면 console에서는 Promise pending을 출력하게 된다.
    이유는 위처럼 동기식으로 처리하게 되는 코드를 작성하는경우 api 데이터를 받기도 전에 콘솔에 출력을 해버려서 해당 현상이 생기는 것이다.
    이 문제를 해결하기 위해서는 async, await 또는 .then() 이 둘의 비동기 함수를 사용하여 처리해야한다.
   */

    const fetchData = async() => {

      //현재 상영중인 영화 정보를 가져오기 
      const response = await axios.get(request.fetchNowPlaying);
      console.log(response)

      //여러 영화 중 랜덤으로 영화 하나의 ID가져오기 (난수를 생성하여 data.result 배열의 길이와 곱하고 소수점은 버려서 나온 수를 인덱스 값으로 넣어준다.)  
      const movieId = response.data.results[ Math.floor(Math.random() * response.data.results.length) ].id;
      
      //특정 영화의 더 상세 정보 가져오기
      
      const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
        //movieDetail 명을 가진 객체에 data 속성이 추가된 것이다. 즉 movieDetail은 axios.get(`movie/${movieId}` 데이터를 받은 객체의 data속성 인것이다

        params: {append_to_response: "videos"}
        // append_to_response 매개변수를 추가하여 'videos' 값을 전달
        // 세부 정보 요청에 추가적인 파라미터를 지정하여 응답에 비디오 데이터도 포함시키도록 서버에 요청하는 것
      })

      console.log(movieDetail);

      setMovie(movieDetail);

    }
    //async는 함수 정의 할때 써주고 await는 요청을 보내는 곳에 작성해주면 된다. 그럼 데이터를 요청한 곳에서 응답을 줄 경우 다음 코드를 실행한다.

    const truncate = (str, n) => {
      return str?.length > n ? str.substring(0, n) + "..." : str;
    }

    if(isClicked) {
      return (
        <div>
          <Container>
            <HomeContainer>
              <Iframe
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                width="640"
                height="360"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></Iframe> 
            </HomeContainer>
          </Container>
         <button onClick={() => setIsClicked(false)}>X</button>
        </div>
      )

    }else {
      return (
        <header 
          className='banner'
          style ={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "top center",
            backgroundSize: "cover"
          }}
        >
          <div className='banner_contents'>
            <h1 className='banner_title'>
              {movie.title || movie.name || movie.original_name}
            </h1>
    
            <div className='banner_buttons'>
              {movie?.videos?.results[0]?.key && 
              /*
                1. movie 객체가 존재하고, movie 객체의 속성 중 videos가 존재하고,
                2. videos 객체의 속성 중 results가 존재하고,
                3. results 배열의 첫 번째 요소가 존재하고,
                4. 첫 번째 요소의 key 속성이 존재하면 그 값을 반환하고, 아니면 undefined를 반환.
    
                만약 movie, videos, results 중 하나라도 존재하지 않는다면, undefined가 반환.
              */
                <button
                 className='banner_button play'
                 onClick={() => setIsClicked(true)}
                >
                  Play
                </button>
              }
            </div>
            <p className='banner_description'>
              {truncate(movie.overview , 100)}
            </p>
          </div>
          <div className='banner_fadeBottom'/>
        </header>
      )
    }
}

export default Banner


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-firectionl: cloumn;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`; 

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  opacity: 0.65;
  border: none;
  z-index: -1;

  &::after {
    width: 100%;
    heightL: 100%;
    content: "";
    position: absolute;
    top: 0; 
    left: 0;
  }
`


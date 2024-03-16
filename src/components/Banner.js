import React, { useEffect, useState}  from 'react'
import axios from '../api/axios';
import request from '../api/request';

function Banner() {

  const [movie, setMovie] = useState([]);


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
      })

      console.log(movieDetail);

      setMovie(movieDetail);

    }
    //async는 함수 정의 할때 써주고 await는 요청을 보내는 곳에 작성해주면 된다. 그럼 데이터를 요청한 곳에서 응답을 줄 경우 다음 코드를 실행한다.


   
  
  return (
    <div>Banner</div>
  )
}

export default Banner
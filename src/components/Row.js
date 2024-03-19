
import React, { useEffect, useState, useCallback}  from 'react'
import styled from 'styled-components'
import axios from '../api/axios';
import MovieModal from './MovieModal/index';
import "./Row.css";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";



function Row({title, id, fetchUrl}) {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setmovieSelection] = useState({})


  //영화정보 받아오기
  const fetchMovieData = useCallback(async() => {
    const response = await axios.get(fetchUrl);

    setMovies(response.data.results);
    //movie state에 영화 정보값을 저장

  }, [fetchUrl])
  //1. useCallback을 사용하여 fetchUrl이 바뀌어야만 함수를 다시 생성. 바뀌지 아니면 메모이제이션 된 함수를 사용

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])
  //2. fetchMovieData의 값이 바뀌면 컴포넌트를 다시생성. 아니면 메모이제이션 된 함수를 사용

  const handleClick = (movie) => {
    setModalOpen(true)
    setmovieSelection(movie)
  }
  


  return (
    <div>
      <h2>{title}</h2>

      <Swiper
        //install Swiper modules
        
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}//loop 기능 사용 여부
        navigation //arrow 버튼 사용 유무
        pagination={{clickable: true}} //페이지 버튼 보이게 할지
        breakpoints={{
          1378: { //너비가 1378xp보다 클 때 
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 3,
          },
        }}
      >
      {movies.map(movie => (
        <SwiperSlide>
          <Wrap>
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => {
                handleClick(movie);
              }}
            />
          </Wrap>
        </SwiperSlide>
       ))}
      </Swiper>
      

      {/* setModalOpen의 값 존재 여부 확인 true인지 false인지 확인 */}
      {modalOpen &&
        
       <MovieModal 
        {...movieSelected}
        setModalOpen = {setModalOpen}
       />
      }

    </div>
  )
}

export default Row

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`

`;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px,
              rgb(0 0 0/73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacity 500ms ease-in-out;
    z-index:1;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
       rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
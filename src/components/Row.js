import React, { useEffect, useState, useCallback}  from 'react'
import axios from '../api/axios';


function Row({title, id, fetchUrl}) {

  const [movies, setMovies] = useState([])

  const fetchMovieData = useCallback(async() => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl])
  //1. useCallback을 사용하여 fetchUrl이 바뀌어야만 함수를 다시 생성. 바뀌지 아니면 메모이제이션 된 함수를 사용

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])
  //2. fetchMovieData의 값이 바뀌면 컴포넌트를 다시생성. 아니면 메모이제이션 된 함수를 사용


  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider_arrow_left'>
          <span className='arrow'>{"<"}</span>
        </div>

        <div id={id} className='row_posters'>
          {movies.map(movie => (
           
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              className='row_poster'
              alt={movie.name}
            />
          ))}
        </div>

        <div className='slider_arrow_right'>
          <span className='arrow'>{">"}</span>
        </div>
      </div>
    </div>
  )
}

export default Row
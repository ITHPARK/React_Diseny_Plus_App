import React, { useEffect, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import axios from "../../api/axios";
import "./SearchPage.css";




const SearchPage = () => {

  const [searchResults, setSearchResults] = useState([]);

  //페이지 이동을 위한 함수 Link태그로도 사용가능
  const navigate = useNavigate();

  //검색어를 입력할 때 마다 /search?q=검색어 값을 반환
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  //검색할 때 나온 /search?q=??? 경로에서 q= 뒷 부분만 걸러내는 작업
  let query = useQuery();

  //입력할 때 마다 바뀌는 입력값
  const searchTerm = query.get("q");

  //입력후 500ms 뒤에 입력값이 변경되는 함수
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
 


  //searchTerm이 변경될 때 컴포넌트를 다시 렌더링
  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm])
  
  const fetchSearchMovie = async(searchTerm) => {
    
    //에외처리 구문
    try{
      //serchTerm 값으로  데이터 요청 보내기.
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(response.data.results);
      
    }catch (error) {
      //try 블럭 코드를 실행 할 수 없을 때 
      console.log(error);
    }
  }

  if(searchResults.length > 0 ) {
    //검색 데이터가 있을 때
    return (
      <section className='search_container'>
        {
          searchResults.map((movie) => {
            console.log( movie.backdrop_path)
            //이미지가 있고 타입이 영화가 아닐때는 ui를 보여주지 않음.
            if(movie.backdrop_path !== null && movie.media_type !== "person") {
              const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className="movie" key={movie.id}>
                  {/* 영화 상세 페이지로 이동 */}
                  <div className='movie_column_poster' onClick={() => navigate(`/${movie.id}`)}>
                    <img 
                      src={movieImageUrl}
                      alt="movie"
                      className='movie_poster'
                    />
                  </div>
                </div>
              ) 
            }
          })
        }
      </section> 
    )
  }else {
    //검색 데이터가 없을 때
    return(
      <section className='no_results'>
        <div className='no_results_text'>
          <p>
            찾고자하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
      
    )
  }
}

export default SearchPage
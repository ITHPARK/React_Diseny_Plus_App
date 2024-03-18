import React, { useEffect, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../../api/axios";




const SearchPage = () => {

  const [searchResult, setSearchResult] = useState([]);

  console.log(1);

  //검색어를 입력할 때 마다 /search?q=검색어 값을 반환
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  //검색할 때 나온 /search?q=??? 경로에서 q= 뒷 부분만 걸러내는 작업
  let query = useQuery();
  const searchTerm = query.get("q");


  //searchTerm이 변경될 때 컴포넌트를 다시 렌더링
  useEffect(() => {
    if(searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  
  }, [searchTerm])
  
  const fetchSearchMovie = async(searchTerm) => {
    
    //에외처리 구문
    try{
      //serchTerm 값으로  데이터 요청 보내기.
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResult(response.data.results);
      
    }catch (error) {
      //try 블럭 코드를 실행 할 수 없을 때 
      console.log(error);
    }

  }


  return (
    <div>index</div>
  )


}

export default SearchPage
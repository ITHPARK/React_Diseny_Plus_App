import React, { useEffect, useState, } from 'react';


export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      /*
        keyup 입력이 생기면 500ms 뒤에 state를 업데이트 한다.
        500ms전에 새로운 입력이 생기면 clearTimeout 실행으로 handler를 종료하고 새로운 handler 함수가 실행된다.
      */

      const handler = setTimeout(() => {
        setDebounceValue(value);
      }, delay)
    
      return () => {
        //타입아웃 함수 종료
        clearTimeout(handler);
      }

      //아래 의존성 배열의 값이 바뀔 때 마다 컴포넌트 재실행
    }, [value, delay]); 
    
    //최종 입력값 출력
    return debounceValue;
}
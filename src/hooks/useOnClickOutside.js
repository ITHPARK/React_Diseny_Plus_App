
import React, { useEffect, useState, useCallback, useRef, }  from 'react'

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {

        //modal밖을 클릭했을 때 모달을 닫게 해주는 함수
        const listener = (event) => {
            console.log(ref.current.contains(event.target));
           
            //현재 클릭한 요소의 ref가 존재하지 않거나 ref의 자식 요소면 모달을 안 닫는다.
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }

            //모달 밖에 요소니 모달을 닫아준다.
            handler();
        };
        
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    }, [ref, handler])
}



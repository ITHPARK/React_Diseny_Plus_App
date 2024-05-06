import React, { useEffect, useState, useCallback, useRef,  }  from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import "./MovieModal.css";

const MovieModal = ({
    // {...movieSelected}
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}) => {

    //div.modal의 DOM에 직접 접근하기 위한 ref
    const ref = useRef();

    //모달 밖을 클릭했을 때 모달창을 닫게해주는 custom hooks
    useOnClickOutside(ref, () => {

        //이게 handler
        setModalOpen(false);

    });

    return (
        <div className='presentation' role="presentation">
            <div className='wrpper_modal'>
                <div className='modal' ref={ref}>
                    <span 
                        className='modal_close'
                        onClick={() => {setModalOpen(false)}}
                    >X</span>

                    <img
                        className='modal_poster_img'
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} 
                        alt="modal_image"
                    />

                    <div className='modal_content'>
                        <p className='modal_details'>
                            <span className='modal_user_perc'>100% for you </span> {" "}
                            {release_date ? release_date : first_air_date}
                        </p>

                        <h2 className='modal_title'>{title ? title: name}</h2>
                        <p className='modal_overview'> 평점: {vote_average} </p>
                        <p className='modal_overview'> {overview} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;
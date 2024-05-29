import React from 'react'
import Header from '../components/Header'
import { ImgStore } from '../store/ImgStore';

function Community() {

    const { likeIcon, talkIcon, eyesIcon } = ImgStore();

    return (
        <div className='overflow-hidden relative'>
            <Header />
            <div className='max-w-pc mx-auto px-5 lg:p-0'>
                <div className='flex justify-between my-5'>
                    <h2 className=' text-2xl font-bold'>자유 게시판</h2>
                    <button className=' bg-orange-200 w-20 rounded-md'>글쓰기</button>
                </div>
                <div className='flex justify-between flex-col lg:flex-row'>
                    <span>전체 2150건</span>
                    <div className='my-1 lg:my-0'>
                        <span className='mr-2 lg:mx-2'>인기순</span>
                        <span className='lg:mx-2'>최신순</span>
                    </div>
                    <input className='border border-black' type='text'></input>
                </div>
                <ul>
                    <li className='flex flex-col border-t border-b border-black py-5 mt-5'>
                        <span className=' text-lg'>제목</span>
                        <span className='text-slate-400'>글내용</span>
                        <div className='flex justify-between flex-col lg:flex-row'>
                            <div>
                                <span className=' after:inline-block after:bg-black after:w-px after:h-1/2 after:mx-1'>작성자</span>
                                <span>2023. 04. 11 18:11</span>
                            </div>
                            <div className='flex'>
                                <div className='flex mr-2 lg:ml-2 lg:mr-0'>
                                    <img src={likeIcon}></img>
                                    <span>15</span>
                                </div>
                                <div className='flex mr-2 lg:ml-2 lg:mr-0'>
                                    <img src={talkIcon}></img>
                                    <span>15</span>
                                </div>
                                <div className='flex mr-2 lg:ml-2 lg:mr-0'>
                                    <img src={eyesIcon}></img>
                                    <span>15</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Community
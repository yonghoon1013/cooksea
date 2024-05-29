import React, { useState } from 'react'
import { ImgStore } from '../store/ImgStore'



function MyRecipe() {

    const {testImg, miniHeart, talkIcon} = ImgStore();

    const [test,setTest] = useState([{
        ca : "한식",
        name : "콩불"
    },{
        ca : "중식",
        name : "콩불"
    },{
        ca : "일식",
        name : "콩불"
    },{
        ca : "양식",
        name : "콩불"
    }])

  return (
    <div className='flex-1 '>
        <h2 className='text-2xl font-bold mb-3'>나의 레시피 목록</h2>
        <ul className=''>
            {test.map((item,index)=>(
                            <li className={`flex py-5 border-t border-black  px-3 lg:px-0 ${index === test.length - 1 ? "border-b" : ""}`}>
                            <div className='w-20 aspect-square'>
                                <img className='w-full h-full object-cover' src={testImg}></img>
                            </div>
            
                            <div className='flex flex-col flex-1 ml-5'>
                                <span>{item.ca}</span>
                                <span>{item.name}</span>
                                <div className='flex'>
                                    <div className='flex'>
                                        <img src={miniHeart}></img>
                                        <span className='mx-1'>23</span>
                                    </div>
                                    <div className='flex ml-3'>
                                        <img src={talkIcon}></img>
                                        <span className='mx-1'>12</span>
                                    </div>
                                </div>
                            </div>
                        </li>
            ))}
        </ul>
    </div>
  )
}

export default MyRecipe
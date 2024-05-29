import React from 'react'
import Header from '../components/Header'

import cook from '../asset/imgs/cook-img.jpg'
import share2 from '../asset/imgs/share2-icon.svg'
import heart from '../asset/imgs/heart-icon.svg'
import eyesIcon from '../asset/imgs/eyes-icon.svg'
import heartIcon from '../asset/imgs/heart-icon.svg'
import shareIcon from '../asset/imgs/share-icon.svg'
import mypage from '../asset/imgs/my.svg'
import pen from '../asset/imgs/pen.svg'
import MypageRecipe from '../components/MypageRecipe'
import MyInfo from '../mypageComponets/MyInfo'
import MyRecipe from '../mypageComponets/MyRecipe'


function Mypage() {

    return (
        <div className='overflow-hidden relative'>
            <Header />
            <div className='max-w-pc m-auto '>
                <div className=' flex flex-col min-h-screen mt-10 lg:flex-row'>
                    <div className=' lg:pr-10 lg:w-1/5'>
                        <h3 className='text-xl font-bold'>마이페이지</h3>
                        <ul className='flex overflow-x-auto whitespace-nowrap items-center my-4 border-t border-b border-black lg:whitespace-normal lg:flex-col lg:border-none lg:items-start '>
                            <li className=' leading-loose mr-3 cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>내정보</li>
                            <li className=' leading-loose mr-3 cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>내가 쓴 글</li>
                            <li className=' leading-loose mr-3 cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>주문내역</li>
                            <li className=' leading-loose mr-3 cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>문의내역</li>
                        </ul>
                    </div>
                    <MyInfo/>
                    {/* <MyRecipe/> */}
                </div>
            </div>
        </div>
    )
}

export default Mypage
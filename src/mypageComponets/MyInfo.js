import React, { useEffect, useState } from 'react'
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

import { useQuery } from 'react-query'
import axios from 'axios'
import { Store } from '../store/Store'
import ProfileImgWrite from './ProfileImgWrite'
import { ImgStore } from '../store/ImgStore'
import IntroWrite from './IntroWrite'



function MyInfo() {

    const { userGet, user, profileImgBoxToggle, imgBoxToggle, profieIntro, profieIntroToggle, setMyInfoZu } = Store();
    const { profileDefault, camera } = ImgStore();



    const myWriteRecipeGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/myWriteRecipe?userKey=${user.key}`);
    }

    const myRecipe  = useQuery(['myWriteRecipe', user ? user.key : ""], myWriteRecipeGet, {
        refetchOnWindowFocus: false,
    });


    const myFavoriteInfoGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/myFavoriteInfo?userKey=${user.key}`);
    }

    const myFavoriteInfo  = useQuery(['myFavoriteInfo', user ? user.key : ""], myFavoriteInfoGet, {
        refetchOnWindowFocus: false,
    });


    const recipeListGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/recipeGet`);
    }

    const recipeData  = useQuery('recipeList', recipeListGet, {
        refetchOnWindowFocus: false,
    });

    const myInfoGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/myInfoGet?userKey=${user.key}`);
    }

    const myInfo  = useQuery(['myInfo', user ? user.key : ""], myInfoGet, {
        refetchOnWindowFocus: false,
    });


    useEffect(()=>{
        setMyInfoZu(myInfo)
    },[myInfo.data])




    if (!myRecipe.data || !myFavoriteInfo.data || !recipeData.data || !myInfo.data) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }


    return (
        <div className='flex flex-col  flex-1 lg:ml-5 px-5 lg:p-0 '>

            <div className='flex'>
                <div className='w-1/5 relative' onClick={()=>{imgBoxToggle(!profileImgBoxToggle)}}>
                    <div className={`w-full aspect-square relative rounded-full overflow-hidden cursor-pointer`}>
                        <img className={`w-full h-full object-cover`} src={`${ myInfo.data?.data?.profileImg?.path  ? `${process.env.REACT_APP_SERVER_URL}/${myInfo.data.data.profileImg.path}` : profileDefault }`}></img>
                        <div className=' absolute top-1/2 -translate-y-1/2 w-full h-full justify-center items-center opacity-0 hidden hover:opacity-100 hover:bg-black hover:bg-opacity-50 lg:flex'><span className=' text-white'>사진등록</span></div>
                    </div>
                    <div className=' absolute -bottom-2 -right-2 lg:hidden'>
                        <img src={camera}></img>
                    </div>
                </div>

                <div className='flex-1 ml-5'>
                    <h3 className='text-2xl'>{myInfo.data.data.nick}</h3>
                    <div className='flex'>
                        <span>{`${myInfo.data.data.intro ? myInfo.data.data.intro : "한줄소개를 등록해주세요"}`}</span>
                        <img className={`ml-3 cursor-pointer`} src={pen} onClick={()=>{profieIntroToggle(!profieIntro)}}></img>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <div className='flex justify-between mb-5'>
                    <h2 className='text-2xl'>나의 레시피</h2>
                    <span>더보기</span>
                </div>
                <ul className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    {
                        myRecipe.data.data.slice(0,4).map((item,index)=>(
                            <li key={index} className='w-full'><MypageRecipe myRecipe={item} /></li>
                        ))
                    }
                </ul>
            </div>

            <div className='mt-10'>
                <div className='flex justify-between mb-5'>
                    <h2 className='text-2xl'>찜한 레시피</h2>
                    <span>더보기</span>
                </div>
                <ul className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    {
                        recipeData.data.data.filter((item)=>myFavoriteInfo.data.data.some(fav=>fav.recipeKey === item.recipeKey)).slice(0,4).map((item,index)=>(
                            <li key={index} className='w-full'><MypageRecipe myRecipe={item} /></li>
                        ))
                    }
                </ul>
            </div>
                    {
                        profileImgBoxToggle ? <ProfileImgWrite/> : ""
                    }
                    {
                        profieIntro ? <IntroWrite/> : ""
                    }

        </div>
    )
}

export default MyInfo
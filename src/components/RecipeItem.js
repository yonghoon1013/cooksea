import React from 'react'
import cook from '../asset/imgs/cook-img.jpg'
import eyesIcon from '../asset/imgs/eyes-icon.svg'
import heartIcon from '../asset/imgs/heart-icon.svg'
import shareIcon from '../asset/imgs/share-icon.svg'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RecipeItem({ recipeData }) {




    // 썸네일 이미지
    const thumbnailGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/thumbnail?recipeKey=${recipeData.recipeKey}`);
    }
    // ['thumbnail', recipeData.recipeKey] 이걸로 고유의 쿼리키를 생성해줘야 여러번 돌아감
    const thumbnail = useQuery(
        ['thumbnail', recipeData ? recipeData.recipeKey : ''],
        thumbnailGet,
        {
            refetchOnWindowFocus: false,
            enabled: !!recipeData && !!recipeData.recipeKey, // recipeData와 recipeKey가 있을 때만 실행
        }
    );

    // 즐겨찾기 조회
    const favoriteGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/favoriteGet?recipeKey=${recipeData.recipeKey}`);
    }

    const favData = useQuery(['favGet', recipeData ? recipeData.recipeKey : ''], favoriteGet, {
        refetchOnWindowFocus: false,
        enabled: !!recipeData && !!recipeData.recipeKey,
    });



    if (!recipeData || !recipeData.recipeKey || !favData.data) {
        return null;
    }


    return (
        <Link to={`/detail/${recipeData.recipeKey}`}>
            <div className='w-full shadow-md'>
                <div>
                    {
                        thumbnail.data ? <img src={`${process.env.REACT_APP_SERVER_URL}/${thumbnail.data.data.path}`} className='w-full aspect-square object-cover'></img> : <img src='' className='w-full aspect-square object-cover'></img>
                    }
                </div>

                <div className='h-auto p-3 bg-slate-50 '>
                    <div className='flex flex-col justify-between lg:flex-row'>
                        <p className='truncate'>
                            <span>{recipeData.title}</span>
                        </p>
                        <span>{recipeData.userInfo.nick}</span>
                    </div>

                    <p className='truncate'>
                        <span className='text-sm  break-all '>{recipeData.intro}</span>
                    </p>

                    <div className='flex items-center justify-end my-1'>
                        <div className='flex items-center ml-3'>
                            <img src={eyesIcon}></img>
                            <span className='text-sm'>{recipeData.view}</span>
                        </div>
                        <div className='flex items-center ml-3'>
                            <img src={heartIcon}></img>
                            <span className='text-sm'>{favData.data.data.favLeng}</span>
                        </div>
                        <div className='flex items-center ml-3'>
                            <img src={shareIcon}></img>
                            <span className='text-sm'>100</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeItem
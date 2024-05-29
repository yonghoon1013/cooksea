import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import cook from '../asset/imgs/cook-img.jpg'
import { Link } from 'react-router-dom'

function MypageRecipe({ myRecipe }) {

    // 썸네일 이미지
    const thumbnailGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/thumbnail?recipeKey=${myRecipe.recipeKey}`);
    }
    // ['thumbnail', recipeData.recipeKey] 이걸로 고유의 쿼리키를 생성해줘야 여러번 돌아감
    const thumbnail = useQuery(
        ['thumbnail', myRecipe ? myRecipe.recipeKey : ''],
        thumbnailGet,
        {
            refetchOnWindowFocus: false,
            enabled: !!myRecipe && !!myRecipe.recipeKey, // recipeData와 recipeKey가 있을 때만 실행
        }
    );



    return (
        <Link to={`/detail/${myRecipe.recipeKey}`} className='w-full h-full'>
            <div className='w-full aspect-square'>
                {
                    thumbnail.data ? <img src={`${process.env.REACT_APP_SERVER_URL}/${thumbnail.data.data.path}`} className='w-full h-full object-cover rounded-lg'></img> : <img src='' className='w-full aspect-square object-cover'></img>
                }
            </div>
            <span className='inline-block w-full py-1'>{myRecipe.title}</span>
        </Link>

    )
}

export default MypageRecipe
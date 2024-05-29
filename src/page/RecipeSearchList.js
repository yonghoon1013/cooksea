import React, { useEffect } from 'react'
import RecipeItem from '../components/RecipeItem'
import Header from '../components/Header'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Store } from '../store/Store';
import { useSearchParams } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem'


function RecipeSearchList() {
    const { userGet, user,loginCheck } = Store();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search_query');
    const categoryQuery = searchParams.get('category_query');



    const recipeListGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/recipeGet?searchQuery=${searchQuery}&&categoryQuery=${categoryQuery}`);
    }

    const recipeData  = useQuery(['recipeList', searchQuery || categoryQuery], recipeListGet, {
        refetchOnWindowFocus: false,
    });


    

    if(recipeData.isLoading){
        return <div>...로딩중</div>
    }
    return (
        <div className='overflow-hidden relative min-h-screen'>
            <Header />
            <div className=' max-w-pc mx-auto px-5 lg:p-0'>
            <CategoryItem/>
                <div className='text-end my-5'>
                    <Link className='bg-main text-white p-2 rounded-md' to={'/recipeWrite'} onClick={(e)=>{if(!loginCheck()){alert("로그인해주세요"); e.preventDefault();}}}>레시피 작성</Link>
                </div>

                <ul className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    {
                        recipeData.data.data.map((item,index)=>(
                            <li key={index}><RecipeItem recipeData={item} /></li>
                        ))
                    }
                </ul>
            </div>
            <div className='flex justify-center my-10'>
                <span>이전</span>
                <ul className='flex mx-3'>
                    <li className=' px-2 bg-yellow-800 rounded-md'>1</li>
                    <li className=' px-2'>2</li>
                    <li className=' px-2'>3</li>
                    <li className=' px-2'>4</li>
                    <li className=' px-2'>5</li>
                </ul>
                <span>다음</span>
            </div>
        </div>
    )
}

export default RecipeSearchList
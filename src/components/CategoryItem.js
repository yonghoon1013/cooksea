import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { CategoryStore } from '../store/CategoryStore';

function CategoryItem() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category_query');
    const { categioryList } = CategoryStore();


    const categoryList = async(category) =>{
        navigate(`/recipesearchlist?category_query=${category}`)
    }

    return (
        <div className='flex my-5 items-center'>
        <span className=' inline-block mr-5 font-bold whitespace-nowrap'>종류별</span>
        <ul className='flex overflow-x-auto whitespace-nowrap items-cente scrollbar-hide'>
            {
                categioryList.map((item,index)=>(
                    <li key={index} className={`${categoryQuery === item.name ? "bg-orange-600 text-white" : ""} mx-1 px-1 hover:bg-orange-600 hover:text-white rounded-lg cursor-pointer`} onClick={()=>{categoryList(item.name)}}>{item.name}</li>
                ))
            }
        </ul>
    </div>
    )
}

export default CategoryItem
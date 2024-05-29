import React, { useEffect } from 'react'
import Header from '../components/Header'
import RecipeItem from '../components/RecipeItem'
import { useQuery } from 'react-query'


// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import RecipeCategory from '../components/RecipeCategory';
import BoardItem from '../components/BoardItem';
import { Store } from '../store/Store';
import axios from 'axios';

// relative overflow-hidden
function Home() {
    const { userGet, user } = Store();

    const bestRecipeListGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/bestRecipeList`);
    }

    const recipeData  = useQuery('bestRecipeList', bestRecipeListGet, {
        refetchOnWindowFocus: false,
    });


    
    if (!recipeData.data) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }
    return (
        <div className=' overflow-hidden relative'>
            <Header />

            <div className=' max-w-pc m-auto'>
                {/* <div className='w-full aspect-video bg-orange-500'>
                    이벤트 슬라이드
                </div> */}

                <section className='my-10 px-5 lg:p-0'>
                    <h3 className='text-xl font-bold mb-3'>베스트레시피</h3>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            }
                        }}
                    >
                        {
                            recipeData.data.data.map((item,index)=>(
                                <SwiperSlide key={index}><RecipeItem recipeData={item} /></SwiperSlide>
                            ))
                        }
                    </Swiper>
                </section>


                <section className='my-10 px-5 lg:p-0'>
                    <h3 className='text-xl font-bold mb-3'>카테고리</h3>
                    <RecipeCategory />
                </section>


                <section className='my-10 px-5 lg:p-0'>
                    <h3 className='text-xl font-bold mb-3'>게시판</h3>
                        <div className=' lg:flex justify-between'>
                        <BoardItem />
                        {/* <BoardItem /> */}
                        </div>
                </section>
            </div>

        </div>

        
    )
}

export default Home
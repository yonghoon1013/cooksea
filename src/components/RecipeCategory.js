import React from 'react'
import cook from '../asset/imgs/cook-img.jpg'

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { CategoryStore } from '../store/CategoryStore';
import { Link } from 'react-router-dom';


function RecipeCategory() {


    const { categioryList } = CategoryStore();



    return (
        <div className='relative '>
            <div className='w-3/4 mx-auto'>
                <Swiper className=' !static'
                    navigation={true} modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={4}
                    breakpoints={{
                        768: {
                            slidesPerView: 6,
                        },
                        1024: {
                            slidesPerView: 8,
                        }
                    }}>
                    {
                        categioryList.map((item, index) => (
                            <SwiperSlide key={index} className=''>
                                <li className='w-16 mx-auto text-center'>
                                    <Link to={`recipesearchlist?category_query=${item.name}`}>
                                        < div >
                                        <img src={item.img} className='w-full aspect-square object-cover rounded-full'></img>
                                    </div>
                                <div>
                                    <span className=' text-xs font-semibold'>{item.name}</span>
                                </div>
                            </Link>
                                </li>
            </SwiperSlide>
            ))
                        }

        </Swiper>

            </div >
        </div >
    )
}

export default RecipeCategory
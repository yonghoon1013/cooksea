import React from 'react'
import { Store } from '../store/Store';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';


function IntroWrite() {
    const queryClient = useQueryClient();
    const { user, profieIntro, profieIntroToggle } = Store();


    const profieIntroUpdate = (introData) => {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/profileIntro`, introData)
    }

    const { mutate: profileIntro } = useMutation(profieIntroUpdate, {
        onSuccess: () => {
            queryClient.invalidateQueries(['myInfo', user ? user.key : ""]);
            profieIntroToggle(!profieIntro);
        },
        refetchOnWindowFocus: false
    });


    const profieIntroPost = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("userKey", user.key)
        const objData = Object.fromEntries(formData);
        profileIntro(objData)
    }

    return (
        <div className=' fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 '>
            <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full aspect-video lg:w-1/2'>
                <form onSubmit={(e) => {profieIntroPost(e) }} className='absolute w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col'>
                    <div className=' w-full mb-5 cursor-pointer'>
                        <textarea className='w-full border border-black resize-none' name='intro' rows={4} ></textarea>
                    </div>
                    <div className='flex justify-center'>
                        <button className='mx-5'>등록</button>
                        <div className=' cursor-pointer mx-5' onClick={() => {profieIntroToggle(!profieIntro)}}>취소</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IntroWrite
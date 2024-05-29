import React from 'react'
import { Store } from '../store/Store'
import { ImgStore } from '../store/ImgStore'
import axios from 'axios';
import { useQuery } from 'react-query';


function CommentItem({commnetData, recipeData, comDel}) {

    const { userGet, user } = Store();
    const { heartIcon, redHeart, emptyHeart,profileDefault } = ImgStore();

    const fetchProfileImage = async (userKey) => {
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/myInfoGet?userKey=${userKey}`);
    };
    
    const useProfileImage = (userKey) => {
        return useQuery(['profileImage', userKey], () => fetchProfileImage(userKey), {
            enabled: !!userKey,
            refetchOnWindowFocus: false,
        });
    };

    const { data: profileImage, isLoading } = useProfileImage(commnetData.userKey);



        /* eslint-disable no-restricted-globals */
        const comDelOne = async (commentItem) => {
            if (user ? user.key : "") {
                if (commentItem.userKey === user.key) {
                    if (confirm("정말 삭제하시겠습니까?")) {
                        comDel(commentItem.commentKey)
                    }
                } else {
                    alert("작성자만 삭제가 가능합니다.")
                }
            } else {
                alert("로그인 해주세요")
            }

        }
        

    return (
        <div className='flex'>
            <div className='w-16'>
                <div className='w-full aspect-square'>
                    {
                        !isLoading&&<img className='w-full h-full object-cover rounded-full' src={profileImage.data.profileImg ? `${process.env.REACT_APP_SERVER_URL}/${profileImage.data.profileImg.path}` : profileDefault} />
                    }
                </div>
            </div>

            <div className='ml-3 flex-col flex-1'>
                <div className='flex justify-between'>
                    <div>
                        <span className={`${recipeData.userInfo.key === commnetData.userKey ? "bg-main text-white rounded-lg p-1" : ""} text-sm`}>{commnetData.userNick}</span>
                        <span className='mx-3'>{commnetData.time}</span>
                    </div>
                    <div>
                        <span className='mx-2 cursor-pointer' onClick={() => { comDelOne(commnetData) }}>삭제</span>
                        <span className='mx-2 cursor-pointer'>신고</span>
                    </div>
                </div>
                <div>
                    <span className='text-xs lg:text-base'>
                        {commnetData.content}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem
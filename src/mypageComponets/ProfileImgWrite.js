import React, { useRef, useState } from 'react'
import { ImgStore } from '../store/ImgStore';
import axios from 'axios';
import { Store } from '../store/Store';
import { useMutation, useQuery, useQueryClient } from 'react-query';


function ProfileImgWrite() {
    const { userGet, user, profileImgBoxToggle, imgBoxToggle, myInfoZu } = Store();
    const { profileDefault } = ImgStore();
    const queryClient = useQueryClient();

    const inputRef = useRef(null)
    const [profilePreview, setProfilePreview] = useState(null)
    const [profilePost, setProfilePost] = useState(null)


    const profileImgUpdate = (profileImgFormData) => {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/profileImgPost?userKey=${user.key}`, profileImgFormData)
    }

    const { mutate: profileImg } = useMutation(profileImgUpdate, {
        onSuccess: () => {
            queryClient.invalidateQueries(['myInfo', user ? user.key : ""]);
            imgBoxToggle(!profileImgBoxToggle);
        },
        refetchOnWindowFocus: false
    });





    const fileUpload = (e) =>{
        let file = e.target.files[0]

        // 파일이 존재할떄만 실행
        if(file){
            // 파일 자체를 profilePost에저장
            setProfilePost(file)

            // 객체생성
            let fileRead = new FileReader();

            // 파일 읽기가 완료되면 실행될 함수
            fileRead.onload = () => {
                // fileRead.result 파일 읽은거의 결과값
                // 결과값을 state에 담아줌
                setProfilePreview(fileRead.result)
            }
            
            // 이미지 파일을 Data URL(base64) 형식으로 읽기 시작
            fileRead.readAsDataURL(file)
        }
    }



    const profileImgPost = async(e) =>{
        e.preventDefault();

        // 프로필 이미지 파일에 대한 폼데이터 생성
        const profileImgFormData = new FormData();
        // 생성된 폼 데이터에 파일 추가하기
        profileImgFormData.append('profileImg', profilePost)

        // 서버에 폼데이터 전송
        await profileImg(profileImgFormData)

    }


    return (
        <div className=' fixed top-0 left-0 w-full h-screen z-50 bg-black bg-opacity-50 '>
            <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full aspect-video lg:w-1/2'>
                <form onSubmit={(e)=>{profileImgPost(e)}} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col'>
                    <div className=' w-28 mb-5 cursor-pointer' onClick={()=>{inputRef.current.click()}}>
                        <img className='w-full aspect-square rounded-full object-cover' src={profilePreview ? profilePreview : ( myInfoZu?.data?.data?.profileImg?.path ? `${process.env.REACT_APP_SERVER_URL}/${myInfoZu.data.data.profileImg.path}` : profileDefault )  }></img>
                        <input ref={inputRef} className=' hidden' type='file' onChange={fileUpload}></input>
                    </div>
                    <div className='flex justify-between'>
                        <button>등록</button>
                        <div className=' cursor-pointer' onClick={()=>{imgBoxToggle(!profileImgBoxToggle)}}>취소</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileImgWrite
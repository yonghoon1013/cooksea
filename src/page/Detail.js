import React, { useEffect, useState } from 'react'
import Header from '../components/Header'


import cook from '../asset/imgs/cook-img.jpg'
import share2 from '../asset/imgs/share2-icon.svg'
import heart from '../asset/imgs/heart-icon.svg'
import eyesIcon from '../asset/imgs/eyes-icon.svg'
import shareIcon from '../asset/imgs/share-icon.svg'
import mypage from '../asset/imgs/my.svg'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Store } from '../store/Store'
import { ImgStore } from '../store/ImgStore'
import CommentItem from '../components/CommentItem'


function Detail() {
    const queryClient = useQueryClient();
    const { userGet, user } = Store();
    const { heartIcon, redHeart, emptyHeart,profileDefault } = ImgStore();

    const [inputVal, setInputVal] = useState("")

    const { recipeKey } = useParams();

    // 레시피 항목
    const recipeDetailGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/recipeDetail?recipeKey=${recipeKey}`);
    }

    const recipeDetail = useQuery('recipeDetail', recipeDetailGet, {
        refetchOnWindowFocus: false,
    });


    // 썸네일 이미지
    const thumbnailGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/thumbnail?recipeKey=${recipeKey}`);
    }

    const thumbnail = useQuery('thumbnail', thumbnailGet, {
        refetchOnWindowFocus: false,
    });


    // 조리순서 이미지
    const stepImgGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/stepImg?recipeKey=${recipeKey}`);
    }

    const stepImg = useQuery('stepImg', stepImgGet, {
        refetchOnWindowFocus: false,
    });



    // 조회수 업데이트
    const viewUpdate = (recipeKey) => {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/view?recipeKey=${recipeKey}`);
    }

    const { mutate: updateView } = useMutation(viewUpdate, {
        onSuccess: () => {
            queryClient.invalidateQueries('viewUpdate');
        }
    });


    // 좋아요 업뎃
    const favoriteUpdate = (favLeng) => {
        return axios.put(`${process.env.REACT_APP_SERVER_URL}/favoriteUpdate?recipeKey=${recipeKey}&&favLeng=${favLeng}`);
    }

    const { mutate: favorite } = useMutation(favoriteUpdate, {
        onSuccess: () => {
            // Mutation이 성공한 후 bestRecipeList query를 다시 가져옴
            queryClient.invalidateQueries('bestRecipeList');
        },
        refetchOnWindowFocus: false
    });


    // 즐겨찾기 조회
    const favoriteGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/favoriteGet?recipeKey=${recipeKey}&&userKey=${user ? user.key : ""}`);
    }


        const favData = useQuery(['favGet', recipeKey, user ? user.key : ""], favoriteGet, {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                favorite(data.data.favLeng)
            }     
    });



    // 즐겨찾기 등록
    const favoritePost = (recipeKey) => {
        const postData = {
            recipeKey: recipeKey,
            userKey: user.key
        };
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/favoritePost`, postData);
    }

    const { mutate: favPost } = useMutation(favoritePost, {
        onSuccess: () => {
            queryClient.invalidateQueries('favGet');
        }
    });

    // 즐겨찾기 삭제
    const favoriteDel = (recipeKey) => {
        return axios.delete(`${process.env.REACT_APP_SERVER_URL}/favoriteDel?recipeKey=${recipeKey}&&userKey=${user.key}`);
    }

    const { mutate: favDel } = useMutation(favoriteDel, {
        onSuccess: () => {
            queryClient.invalidateQueries('favGet'); // 성공적으로 처리되면 favGet함수 호출
        }
    });



    const favUpdate = async () => {
        if (user) {
            if (favData.data.data.favValue) {
                favDel(recipeKey);
            } else {
                favPost(recipeKey);
            }
        } else {
            alert("로그인 해주세요")
        }
    }


    //코멘트 조회
    const commentGet = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/commentGet?recipeKey=${recipeKey}`);
    }

    const commentData = useQuery('commentGet', commentGet, {
        refetchOnWindowFocus: false
    });




    // 코멘트 등록
    const commentPost = (commentPostData) => {

        return axios.post(`${process.env.REACT_APP_SERVER_URL}/commentPost`, commentPostData);
    }

    const { mutate: comPost } = useMutation(commentPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('commentGet');
        }
    });

    // 코멘트 삭제
    const commentDel = (commentKey) => {
        return axios.delete(`${process.env.REACT_APP_SERVER_URL}/commentDel?commentKey=${commentKey}`);
    }

    const { mutate: comDel } = useMutation(commentDel, {
        onSuccess: () => {
            queryClient.invalidateQueries('commentGet'); // 성공적으로 처리되면 favGet함수 호출
        }
    });


    const myInfoGet = () =>{
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/myInfoGet?userKey=${recipeDetail.data?.data?.userInfo?.key ? recipeDetail.data.data.userInfo.key : ""}`);
    }

    const myInfo  = useQuery(['myInfo', recipeDetail.data?.data.userInfo.key || ""], myInfoGet, {
        refetchOnWindowFocus: false,
    });

    console.log();



    const comment = async (e) => {
        e.preventDefault();
        const commnetKey = Date.now();
        const date = new Date();
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const time = `${year}.${month}.${day}`


        const formData = new FormData(e.target);
        formData.append("commentKey", commnetKey)
        formData.append("time", time)
        formData.append("userKey", user ? user.key : "")
        formData.append("userNick", user ? user.nick : "")
        formData.append("recipeKey", recipeKey)
        const objData = Object.fromEntries(formData);

        if (user ? user.key : "") {
            if (formData.get("content")) {
                comPost(objData)
                setInputVal("")
            } else {
                alert("댓글을 입력해 주세요")
            }
        } else {
            alert("로그인 해주세요")
        }

    }




    useEffect(() => {
        updateView(recipeKey)
    }, [])




    if (stepImg.data) {
        stepImg.data.data.sort((a, b) => {
            // 이미지의 파일명에서 _숫자_ 부분을 추출하여 숫자를 비교
            const numA = parseInt(a.originalname.match(/_(\d+)_/)[1]);
            const numB = parseInt(b.originalname.match(/_(\d+)_/)[1]);
            return numA - numB;
        });

    }


    if (!recipeDetail.data || !thumbnail.data || !stepImg.data || !commentData.data || !myInfo.data) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className='overflow-hidden relative'>
            <Header />
            <div className='max-w-pc mx-auto px-5 lg:p-0'>
                {/* section1 */}
                <div className='flex flex-col justify-between border-b border-black mb-10 lg:flex-row lg:py-10 '>

                    <div className='w-full lg:w-2/6'>
                        <div className='w-full aspect-square'>
                            <img className='w-full h-full object-cover' src={`${process.env.REACT_APP_SERVER_URL}/${thumbnail.data.data.path}`} alt='썸네일이미지'></img>
                        </div>
                        <div className='flex justify-center mt-4'>
                            <div className='flex w-auto p-2 bg-slate-300 mx-3 rounded-md cursor-pointer' onClick={() => { favUpdate() }}>
                                <img src={favData.data ? favData.data.data.favValue ? redHeart : emptyHeart : ""} alt='찜하기아이콘'></img>
                                <span className=''>찜하기</span>
                            </div>
                            <div className='flex w-auto p-2 bg-slate-300 mx-3 rounded-md cursor-pointer' onClick={() => { alert("준비중 입니다.") }}>
                                <img src={share2} alt='공유하기아이콘'></img>
                                <span>공유하기</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-3/5'>

                        <div className='my-2 pb-2 border-b border-black lg:my-0'>
                            <ul className='flex items-center justify-center lg:justify-normal'>
                                <li className='flex mr-3'>
                                    <img className='mr-1' src={eyesIcon} alt='조회수아이콘'></img>
                                    <span>{recipeDetail.data.data.view}</span>
                                </li>
                                <li className='flex mr-3'>
                                    <img className='mr-1' src={heartIcon} alt='즐겨찾기수아이콘'></img>
                                    <span>{favData.data ? favData.data.data.favLeng : ""}</span>
                                </li>
                                <li className='flex mr-3'>
                                    <img className='mr-1' src={shareIcon}alt='공유수 아이콘'></img>
                                    <span>10</span>
                                </li>
                            </ul>
                        </div>

                        <div className='my-3'>
                            <h3 className='text-xl font-bold mb-2'>작성자</h3>
                            <div className='flex'>
                                <div className='w-12 aspect-square mr-3'><img className='w-full h-full rounded-full' src={`${ myInfo.data?.data?.profileImg?.path  ? `${process.env.REACT_APP_SERVER_URL}/${myInfo.data.data.profileImg.path}` : profileDefault }`}alt='프로필이미지'></img></div>
                                <div className='flex flex-col'><span>{recipeDetail.data.data.userInfo.nick}</span><span>{myInfo.data.data.intro ? myInfo.data.data.intro : ""}</span></div>
                            </div>
                        </div>

                        <div className='my-3'>
                            <h3 className='text-xl font-bold my-2'>{recipeDetail.data.data.title}</h3>
                            <div className=''>
                                <span>
                                    {recipeDetail.data.data.intro}
                                </span>
                            </div>
                        </div>

                        <div className='my-3'>
                            <div className='flex items-center'>
                                <h3 className='text-xl font-bold my-2'>재료</h3>
                                <div className='flex w-auto flex-1 ml-2'>
                                    <img className='' src={mypage} alt='사람아이콘'></img>
                                    <span className=''>{recipeDetail.data.data.people}인분</span>
                                </div>
                            </div>
                            <ul className='flex flex-wrap gap-2'>
                                {
                                    recipeDetail.data.data.rawInfo.map((item, index) => (
                                        <li key={index}>
                                            <span>{item.raw}</span>
                                            <span>{item.volume}</span>
                                            <span>{item.unit}</span>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>

                    </div>

                </div>

                {/* section2 */}
                <div className=''>
                    <h3 className='mb-10 text-2xl font-bold'>조리순서</h3>
                    <ul>
                        {
                            recipeDetail.data ? recipeDetail.data.data.step.map((item, index) => (
                                <li key={index} className='flex mb-10'>
                                    <div className='w-2/6 lg:w-1/4'>
                                        <div className='w-full aspect-square'>
                                            {stepImg.data && stepImg.data.data[index] && (
                                                <img className='w-full h-full object-cover' src={`${process.env.REACT_APP_SERVER_URL}/${stepImg.data.data[index].path}`} alt='조리순서 이미지'></img>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex flex-col flex-1 ml-5'>
                                        <span className='border-b border-black p-b1'>Stap {index + 1}</span>
                                        <span className=' whitespace-normal flex-1 pt-1 text-xs leading-relaxed lg:text-base '>{item.stepText}</span>
                                    </div>
                                </li>
                            )) : ""
                        }

                    </ul>
                </div>

                {/* section3 */}
                <div>
                    <ul className=''>
                        {
                            commentData.data.data.map((item, index) => (
                                <li key={index} className={` py-5 bg-white border-t border-black ${index === commentData.data.data.length - 1 ? "border-b border-black" : ""}`}>
                                    <CommentItem commnetData={item} recipeData={recipeDetail.data.data} comDel={comDel} />
                                </li>
                            ))
                        }
                    </ul>

                    <form className='flex flex-col my-20 lg:p-10 lg:bg-slate-400' onSubmit={(e) => { comment(e) }}>
                        <div className='mb-5'>
                            <span>댓글 {commentData.data.data.length}</span>
                        </div>
                        <div className=' flex-1 flex'>
                            <textarea className='border border-black resize-none flex-1' name='content' value={inputVal} onChange={(e) => { setInputVal(e.target.value) }} cols={30} rows={3}></textarea>
                            <button className='w-20 bg-slate-700'>등록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Detail
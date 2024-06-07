import React, { useEffect, useState } from 'react'
import search from '../asset/imgs/search-icon.png'
import mypage from '../asset/imgs/mypage.svg'
import { Link } from 'react-router-dom'
import { Store } from '../store/Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImgStore } from '../store/ImgStore';
import { CategoryStore } from '../store/CategoryStore';


function Header() {
    const { userGet, user, loginCheck, searchInput, searchValueUpdate } = Store();
    const { logo, logo2 } = ImgStore();
    const navigate = useNavigate();
    const { categioryList } = CategoryStore();

    const [HamToggle, setHamToggle] = useState(null)
    const [close, setClose] = useState(false)
    const [searchToggle, setSearchToggle] = useState(false)

    const test = async (index) => {
        setHamToggle((prevIndex) => (prevIndex === index ? null : index))
    }

    const navClick = (index) => {
        if (window.innerWidth < 1024) {
            test(index);
        }
    }

    const navMuouseEnter = (index) => {
        if (window.innerWidth > 1023) {
            test(index);
        }
    }
    const navMuouseLeave = () => {
        if (window.innerWidth > 1023) {
            setHamToggle(null)
        }
    }


    const recipeSearch = async (e) => {
        e.preventDefault();
        await navigate(`/recipesearchlist?search_query=${searchInput}`)
    }




    useEffect(() => {
        userGet(JSON.parse(sessionStorage.getItem('user')))
    }, [])


        // 화면 크기 변경 시 상태 초기화
        useEffect(() => {
            const handleResize = () => {
                // 원하는 상태 초기화
                setSearchToggle(false);
            };
    
            // 이벤트 리스너 추가
            window.addEventListener('resize', handleResize);
    
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);


    return (
        <div className=''>
            <div className='bg-white'>
                <div className='flex justify-between p-5  lg:py-5 lg:max-w-pc lg:mx-auto'>
                    <div>
                        <Link to={'/'}><img src={logo}></img></Link>
                    </div>
                    <div className='flex w-1/4 justify-between lg:w-auto'>
                        <img src={search} className='lg:hidden' onClick={() => { setSearchToggle(!searchToggle) }}></img>
                        <form className={`${searchToggle ? "flex absolute w-full left-0 top-0 p-5 bg-white justify-center" : "hidden"} z-10 lg:flex`} onSubmit={(e) => { recipeSearch(e) }}>
                            <div className='flex items-center'>
                                <input className=' border-black border-2 lg:border-b lg:border-solid lg:border-black lg:outline-none' type='text' name='searchValue' value={searchInput} onChange={(e) => { searchValueUpdate(e.target.value) }} placeholder='검색어입력'></input>
                                <button className=' w-8'><img src={search} className='w-full'></img></button>
                                {searchToggle ? <div onClick={() => { setSearchToggle(!searchToggle) }}>X</div> : ""}
                            </div>
                        </form>
                        <div>
                            <Link to={'/mypage'} className='lg:hidden' onClick={(e)=>{if(!user){e.preventDefault(); alert("로그인이 필요합니다.")}}}><img src={mypage}></img></Link>

                            {
                                loginCheck() ? <div className='hidden lg:block'>
                                    <Link to={'/mypage'} className='inline-block mx-5'>{user.nick}님</Link>
                                    <span className=' cursor-pointer' onClick={() => { sessionStorage.removeItem('user'); userGet(JSON.parse(sessionStorage.getItem('user'))); navigate('/'); }}>로그아웃</span>
                                </div>
                                    :
                                    <div className='hidden lg:block'>
                                        <Link to={'/login'} className='inline-block mx-5'>로그인</Link>
                                        <Link to={'/signupterms'} className=''>회원가입</Link>
                                    </div>
                            }
                        </div>

                        <div className=' relative w-7 bg-white aspect-square lg:hidden' onClick={() => { setClose(!close) }}>
                            <span className=' absolute w-full top-0 p block h-1 bg-black'></span>
                            <span className=' absolute w-full top-1/2 block h-1 bg-black'></span>
                            <span className=' absolute w-full top-full block  h-1 bg-black'></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' bg-main'>
                <div className={`bg-white z-50 w-full min-h-screen h-full absolute top-0 -right-full duration-1000 lg:bg-main lg:max-w-pc lg:mx-auto lg:min-h-full lg:h-auto lg:right-0 lg:static lg:w-full ${close ? "right-0" : ""} md:w-2/4`} >
                    <div className=' p-5 lg:p-0'>
                        <div className=' text-end text-3xl lg:hidden' onClick={() => { setClose(!close) }}>X</div>
                        <div className='flex justify-between flex-col lg:flex-row'>
                            <ul className='lg:flex lg:w-full lg:flex-1 lg:justify-between'>
                                <li className=' flex-1 text-2xl relative p-5 lg:text-base' onClick={() => { navClick(0) }} onMouseEnter={() => navMuouseEnter(0)} onMouseLeave={() => { navMuouseLeave() }}>
                                    <Link className='lg:text-white' to={'/list'}>레시피</Link>
                                    <span className={` float-right lg:hidden ${HamToggle === 0 ? "rotate-90" : ""}`}>→</span>
                                    <ul className={`${HamToggle === 0 ? "block" : "hidden"} z-40 lg:absolute lg:top-full lg:bg-white  w-full`}>
                                        {
                                            categioryList.map((item, index) => (
                                                <li key={index} className={`text-base lg:p-2 lg:border-t lg:border-l lg:border-r ${categioryList.length - 1 === index ? "lg:border-b" : ""} lg:hover:bg-main lg:hover:text-white`}><Link className='inline-block w-full h-full' to={`/recipesearchlist?category_query=${item.name}`}>{item.name}</Link></li>
                                            ))
                                        }
                                    </ul>
                                </li>
                                <li className=' flex-1 text-2xl relative p-5 lg:text-base' onClick={() => { navClick(1) }} onMouseEnter={() => navMuouseEnter(1)} onMouseLeave={() => { navMuouseLeave() }}>
                                    <p className='lg:text-white cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>커뮤니티</p>
                                    <span className={` float-right lg:hidden ${HamToggle === 1 ? "rotate-90" : ""}`}>→</span>
                                    <ul className={`${HamToggle === 1 ? "block" : "hidden"} z-40 lg:absolute lg:top-full lg:bg-white  w-full`} onClick={()=>{alert("준비 중 입니다.")}}>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:hover:bg-main lg:hover:text-white cursor-pointer'>자유</li>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:hover:bg-main lg:hover:text-white cursor-pointer'>요리</li>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:border-b lg:hover:bg-main lg:hover:text-white cursor-pointer'>팁</li>
                                    </ul>
                                </li>
                                <li className=' flex-1 text-2xl relative p-5 lg:text-base' onClick={() => { navClick(2) }} onMouseEnter={() => navMuouseEnter(2)} onMouseLeave={() => { navMuouseLeave() }}>
                                    <p className='lg:text-white cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>쇼핑</p>
                                    <span className={` float-right lg:hidden ${HamToggle === 2 ? "rotate-90" : ""}`}>→</span>
                                    <ul className={`${HamToggle === 2 ? "block" : "hidden"} z-40 lg:absolute lg:top-full lg:bg-white  w-full`} onClick={()=>{alert("준비 중 입니다.")}}>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:hover:bg-main lg:hover:text-white cursor-pointer'>전체</li>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:hover:bg-main lg:hover:text-white cursor-pointer'>채소</li>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:hover:bg-main lg:hover:text-white cursor-pointer'>육류</li>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:hover:bg-main lg:hover:text-white cursor-pointer'>생선</li>
                                        <li className='text-base lg:p-2 lg:border-t lg:border-l lg:border-r lg:border-b lg:hover:bg-main lg:hover:text-white'>곡물</li>
                                    </ul>
                                </li>
                            </ul>
                            <p className='text-2xl p-5 cursor-pointer lg:text-base lg:text-white' onClick={()=>{alert("준비 중 입니다.")}}>문의하기</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Header
import axios from 'axios'
import React from 'react'
import { Store } from '../store/Store';
import { Link, useNavigate } from 'react-router-dom';
import { ImgStore } from '../store/ImgStore';


function Login() {
    const { userGet, user } = Store();
    const { logo } = ImgStore();
    const navigate = useNavigate();

    const loginGet = async(e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);  
        const objData = Object.fromEntries(formData);

        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/login?loginId=${objData.id}&&loginPw=${objData.pw}`)

        if(res.data){
            sessionStorage.setItem("user", JSON.stringify( {key: `${res.data.key}`, id: `${res.data.id}`, nick:`${res.data.nick}` }));
            navigate('/')
        } else{
            alert("아이디 혹은 비밀번호가 틀렸습니다.");
        }

    }

    return (
        <div className=''>
            <div className=' min-w-mobile max-w-login mx-auto px-2'>
                <h2 className='pt-28 flex justify-center'><Link to={'/'}><img src={logo}></img></Link></h2>
                <form className='flex flex-col' onSubmit={(e)=>{loginGet(e)}}>
                    <div className='flex flex-col mt-10 mb-5'>
                        <input className='border border-b-slate-400 p-3' type='text' name='id' placeholder='아이디'></input>
                        <input className='border border-b-slate-400 my-2 p-3' type='password' name='pw' placeholder='패스워드'></input>
                        <button className=' bg-slate-400 p-3'>로그인</button>
                    </div>
                    <Link to={'/signupterms'} className=' text-end'>회원가입</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ImgStore } from '../store/ImgStore';

function Signup() {
    const navigate = useNavigate();
    const { logo } = ImgStore();

    const [effIdValue, setEffIdValue] = useState();
    const [effPwValue, setEffPwValue] = useState();

    const [idCheckValue, setIdCheckValue] = useState();
    const [nickCheckValue, setNickCheckValue] = useState();
    const [pwCheckValue, setPwCheckValue] = useState();

    const [pw, setPw] = useState();
    const [pw2, setPw2] = useState();


    const signupPost = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("key", Date.now())
        const objData = Object.fromEntries(formData);

        if (effIdValue || idCheckValue || effPwValue || pwCheckValue || nickCheckValue) {

        } else {
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/sign`, objData);
                sessionStorage.setItem("user", JSON.stringify({ key: `${res.data.key}`, id: `${res.data.id}`, nick: `${res.data.nick}` }));
                navigate('/')
            } catch (err) {
                alert("죄송합니다 서버 점검중입니다.")
            }

        }
    }

    // ID
    const validationIdCheck = async (e) => {
        await idCheck(e.target.value)
        const eff = /^[a-z][a-z0-9]{3,20}$/;
        if (eff.test(e.target.value)) {
            setEffIdValue(false);
        } else {
            setEffIdValue(true);
        }
    }

    const idCheck = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/idCheck?id=${id}`)
        setIdCheckValue(res.data);
    }


    // PW
    const pwCheck = (e) => {
        if (pw === pw2) {
            setPwCheckValue(false)
        } else {
            setPwCheckValue(true)
        }
    }

    const validationPwCheck = async (e) => {
        const eff = /^(?=.*[!@~])[a-z][a-z0-9!@~]{6,20}$/;
        if (eff.test(e.target.value)) {
            setEffPwValue(false);
        } else {
            setEffPwValue(true);
        }
    }

    // NICK
    const nickCheck = async (e) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/nickCheck?nick=${e.target.value}`)
        setNickCheckValue(res.data);
    }



    return (
        <div className='min-w-mobile max-w-login mx-auto px-2'>
            <h2 className=' flex justify-center mt-10'><Link to={'/'}><img src={logo}></img></Link></h2>
            <form onSubmit={(e) => { signupPost(e) }}>
                <div className='flex flex-col my-3'>
                    <span className='mb-2'>아이디</span>
                    <input className={`border border-black rounded-md p-2 ${effIdValue || idCheckValue ? "border-red border-2 focus:outline-none focus:border-red  focus:border-2" : ""}`} required type='text' name='id' placeholder='아이디' onBlur={(e) => { validationIdCheck(e); }}></input>
                    <span className='text-xs mt-1'>아이디는 소문자와 영문자를 포함한 4 ~ 20자 사이만 가능합니다.</span>
                    <span className='text-red text-xs mt-1'>{effIdValue || idCheckValue ? "사용 할 수 없는 아이디입니다." : ""}</span>
                </div>
                <div className='flex flex-col my-3'>
                    <span className='mb-2'>비밀번호</span>
                    <input className={`border border-black rounded-md p-2 focus:outline-none focus:border-2 ${effPwValue ? "border-red border-2 focus:outline-none focus:border-red  focus:border-2" : ""}`} type='password' name='pw' placeholder='비밀번호' required onBlur={(e) => { pwCheck(e); validationPwCheck(e); }} onChange={(e) => { setPw(e.target.value); }}></input>
                    <span className='text-xs mt-1'>비밀번호는 문자,숫자,특수문자를 포함한 7 ~ 20자 사이만 가능합니다.</span>
                    <span className='text-red text-xs mt-1'>{effPwValue ? "사용 할 수 없는 비밀번호 입니다." : ""}</span>
                </div>
                <div className='flex flex-col my-3'>
                    <span className='mb-2'>비밀번호 재 확인</span>
                    <input className={`border border-black rounded-md p-2 focus:outline-none focus:border-2 ${pwCheckValue ? "border-red border-2 focus:outline-none focus:border-red  focus:border-2" : ""}`} type='password' placeholder='비밀번호 확인' required onBlur={(e) => { pwCheck(e); }} onChange={(e) => { setPw2(e.target.value); }}></input>
                    <span className={`text-red text-xs mt-1`}>{pwCheckValue ? "비밀번호가 일치하지 않습니다." : ""}</span>
                </div>
                <div className='flex flex-col my-3'>
                    <span className='mb-2'>닉네임</span>
                    <input className={`border border-black rounded-md p-2 ${nickCheckValue ? "border-red border-2 focus:outline-none focus:border-red  focus:border-2" : ""}`} required type='text' name='nick' placeholder='닉네임' onBlur={(e) => { nickCheck(e) }}></input>
                    <span className='text-red text-xs mt-1'>{nickCheckValue ? "이미 존재하는 닉네임입니다." : ""}</span>
                </div>
                <div className=''>
                    <button className={`w-full p-3 text-white font-bold text-xl bg-main `} value="submit">가입하기</button>
                </div>
            </form>
        </div>
    )
}
export default Signup
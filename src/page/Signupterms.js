import React, { useEffect, useState } from 'react'
import TermsItem from '../components/TermsItem'
import { Store } from '../store/Store';
import { Link, useNavigate } from 'react-router-dom';
import { ImgStore } from '../store/ImgStore';

function Signupterms() {
    const { checkLi, setCheckLi, tkCheck, all, allCheck } = Store();
    const { logo } = ImgStore();
    const navigate = useNavigate();

    const [termsList, setTermsList] = useState([
        {
            "id": "term1",
            "op": true,
            "title": "요리해먹장 이용약관",
            "content": [
                {
                    "subTitle": "여러분을 환영합니다.",
                    "subContent": "요리해먹장 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 요리해먹장 서비스의 이용과 관련하여 요리해먹장 서비스를 제공하는 요리해먹장 주식회사(이하 ‘요리해먹장’)와 이를 이용하는 요리해먹장 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 요리해먹장 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 요리해먹장 서비스를 이용하시거나 요리해먹장 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다."
                },
                {
                    "subTitle": "다양한 요리해먹장 서비스를 즐겨보세요.",
                    "subContent": "요리해먹장는 www.naver.com을 비롯한 요리해먹장 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다. 여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 요리해먹장 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항, 요리해먹장 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게 확인하실 수 있습니다. 요리해먹장는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를 구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가 있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다. 요리해먹장 서비스에는 기본적으로 본 약관이 적용됩니다만 요리해먹장가 다양한 서비스를 제공하는 과정에서 부득이 본 약관 외 별도의 약관, 운영정책 등을 적용하는 경우(예, 요리해먹장페이, V LIVE 등)가 있습니다. 그리고 요리해먹장 계열사가 제공하는 특정 서비스의 경우에도(예, LINE, SNOW등) 해당 운영 회사가 정한 고유의 약관, 운영정책 등이 적용될 수 있습니다. 이러한 내용은 각각의 해당 서비스 초기 화면에서 확인해 주시기 바랍니다."
                },
            ]
        },
        {
            "id": "term2",
            "op": true,
            "title": "개인정보 수집 및 이용약관",
            "content": [
                {
                    "subTitle": "",
                    "subContent": "개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다."
                },
                {
                    "subTitle": "다양한 요리해먹장 서비스를 즐겨보세요.",
                    "subContent": "요리해먹장는 www.naver.com을 비롯한 요리해먹장 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다. 여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 요리해먹장 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항, 요리해먹장 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게 확인하실 수 있습니다. 요리해먹장는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를 구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가 있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다. 요리해먹장 서비스에는 기본적으로 본 약관이 적용됩니다만 요리해먹장가 다양한 서비스를 제공하는 과정에서 부득이 본 약관 외 별도의 약관, 운영정책 등을 적용하는 경우(예, 요리해먹장페이, V LIVE 등)가 있습니다. 그리고 요리해먹장 계열사가 제공하는 특정 서비스의 경우에도(예, LINE, SNOW등) 해당 운영 회사가 정한 고유의 약관, 운영정책 등이 적용될 수 있습니다. 이러한 내용은 각각의 해당 서비스 초기 화면에서 확인해 주시기 바랍니다."
                },
            ]
        },
        {
            "id": "term3",
            "op": false,
            "title": "3번째 약관",
            "content": [
                {
                    "subTitle": "",
                    "subContent": "개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다."
                },
                {
                    "subTitle": "다양한 요리해먹장 서비스를 즐겨보세요.",
                    "subContent": "요리해먹장는 www.naver.com을 비롯한 요리해먹장 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다. 여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 요리해먹장 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항, 요리해먹장 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게 확인하실 수 있습니다. 요리해먹장는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를 구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가 있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다. 요리해먹장 서비스에는 기본적으로 본 약관이 적용됩니다만 요리해먹장가 다양한 서비스를 제공하는 과정에서 부득이 본 약관 외 별도의 약관, 운영정책 등을 적용하는 경우(예, 요리해먹장페이, V LIVE 등)가 있습니다. 그리고 요리해먹장 계열사가 제공하는 특정 서비스의 경우에도(예, LINE, SNOW등) 해당 운영 회사가 정한 고유의 약관, 운영정책 등이 적용될 수 있습니다. 이러한 내용은 각각의 해당 서비스 초기 화면에서 확인해 주시기 바랍니다."
                },
            ]
        }
    ])


    const allCheckUpdate = () => {
        allCheck();
        setCheckLi(Array(termsList.length).fill(!all))
    }

    
    const reqCheck = () => {
        return termsList.filter((item, index) => item.op).every((item, index) => checkLi[index])
    };
    
    
    useEffect(() => {
        setCheckLi(Array(termsList.length).fill(false))
    }, [])





    return (
        <form className='min-w-mobile max-w-login mx-auto px-2' onSubmit={()=>{navigate('/signup')}}>
            <h2 className='mb-10 flex justify-center mt-10'><Link to={'/'}><img src={logo} alt='로고이미지'></img></Link></h2>
            <div>
                <input className='hidden' type='checkbox' id='1' checked={all} onChange={(e) => { allCheckUpdate(e) }} ></input>
                <label className={`relative pl-10 flex items-center cursor-pointer  ${all ? 'before:bg-checked' : 'before:bg-unchecked'} before:inline-block before:w-9 before:h-9 before:bg-no-repeat before:absolute before:left-0`} htmlFor='1' >
                    <span className='inline-block'>모두 동의</span>
                </label>
                <div className='mt-5 ml-10 max-h-40'>
                    <span className=' text-xs'>실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.</span>
                </div>
            </div>
            <ul>
                {
                    termsList.map((item, index) => (
                        <li key={index}><TermsItem props={item} num={index} /></li>
                    ))
                }
            </ul>
            <div className='pb-10'>
                <button className={`w-full p-3 text-white font-bold text-xl ${reqCheck()
                    ? "bg-main" : "bg-slate-400"}`} disabled={!reqCheck()}>다음</button>
            </div>
        </form>
    )
}

export default Signupterms
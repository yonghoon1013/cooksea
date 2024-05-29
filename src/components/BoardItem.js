import React from 'react'

function BoardItem() {
    return (
        <div className='border mb-5 lg:w-49% lg:mb-0 '>
            <div className=' bg-slate-400 p-2 flex justify-between items-center'>
                <span>자유 게시판</span>
                <span className='text-xs cursor-pointer' onClick={()=>{alert("준비 중 입니다.")}}>더보기</span>
            </div>
            <div className='p-2 bg-white'>
                <ul>
                    <li className='leading-relaxed  '>
                        <span className='hover:text-blue-500 cursor-pointer'>오늘 날씨가 좋네요</span>
                        <span className='text-xs text-blue-500 inline-block mx-1'>5</span>
                    </li>
                    <li className='leading-relaxed  '>
                        <span className='hover:text-blue-500 cursor-pointer'>오늘하루도 화이팅입니다</span>
                        <span className='text-xs text-blue-500 inline-block mx-1'>1</span>
                    </li>
                    <li className='leading-relaxed  '>
                        <span className='hover:text-blue-500 cursor-pointer'>이게 뭘까요??</span>
                        <span className='text-xs text-blue-500 inline-block mx-1'>1</span>
                    </li>
                    <li className='leading-relaxed  '>
                        <span className='hover:text-blue-500 cursor-pointer'>소스 추천좀 해주세요!</span>
                        <span className='text-xs text-blue-500 inline-block mx-1'>1</span>
                    </li>
                    <li className='leading-relaxed  '>
                        <span className='hover:text-blue-500 cursor-pointer'>안녕하세요</span>
                        <span className='text-xs text-blue-500 inline-block mx-1'>1</span>
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default BoardItem
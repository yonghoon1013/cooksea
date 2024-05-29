import React, { useEffect, useState } from 'react'
import { Store } from '../store/Store';

function TermsItem({ props, num }) {
    const { checkLi, setCheckLi, tkCheck, allCheck, allCheck2 } = Store();
    const [check,setCheck] = useState(checkLi[num])


    const aa = (e) => {
        setCheck(!check)
        tkCheck(num)

    }


    useEffect(()=>{
        allCheck2(checkLi.every((item)=>item === true))
    },[checkLi])



    return (
        <div className='my-10'>
            <input className='hidden' type='checkbox' id={props.id} required={props.op} checked={checkLi[num] || false} onChange={aa}></input>
            <label className={`relative pl-10 flex items-center cursor-pointer ${ checkLi[num] ? 'before:bg-checked' : 'before:bg-unchecked'} before:inline-block before:w-9 before:h-9 before:bg-no-repeat before:absolute before:left-0`} htmlFor={props.id} >
                <span className='flex items-center'><span className='mr-1 text-xs'>{props.op ? "[필수]" : "[선택]"}</span>{props.title}</span>
            </label>
            <div className='mt-5 border border-black ml-10 p-3 max-h-40 overflow-y-scroll'>
                <div>
                    {
                        props.content.map((item,index) => (
                            <div className='mb-3' key={index}>
                                <h3 className='mb-1 font-bold'>{item.subTitle}</h3>
                                <p className='text-xs leading-5 text-gray-500'>{item.subContent}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TermsItem
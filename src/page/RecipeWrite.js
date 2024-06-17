import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { ImgStore } from '../store/ImgStore';
import axios from 'axios';
import { Store } from '../store/Store';

function RecipeWrite() {
    const { user } = Store();
    const { imgPlus, plus } = ImgStore();
    const navigate = useNavigate();


    const [test, setTest] = useState([{ id: Date.now() + 10, num: 0 }])
    const [oderState, setOderState] = useState([{ id: Date.now(), num: 0, previewImg: null, postImg: null }])

    const [thumbnailPostImg, setThumbnailPostImg] = useState('');
    const [previewImg, setPreviewImg] = useState('');


    const inputRef = useRef([]);


    const rawAdd = () => {
        setTest([...test, { id: Date.now() + 10, num: test.length }])
    }

    const rawDel = (e, id) => {
        setTest(prevTest => prevTest.filter((item) => item.id !== id));
        e.preventDefault()
    }

    const oderAdd = () => {
        setOderState([...oderState, { id: Date.now(), num: oderState.length, previewImg: null }])
    }

    const oderDel = (e, id) => {
        setOderState(prev => prev.filter((item) => item.id !== id));
        e.preventDefault()
    }

    const fileTest = (e) => {
        let file = e.target.files[0]

        if (file) {
            setThumbnailPostImg(file)
            let fileRead = new FileReader();

            fileRead.onload = () => {
                setPreviewImg(fileRead.result)
            }

            fileRead.readAsDataURL(file)
        }
    }


    const oderFile = (e, id) => {
        let file = e.target.files[0];

        if (file) {
            let fileRead = new FileReader();
            fileRead.onload = () => {
                // 새로운 배열을 생성하여 상태를 업데이트합니다.
                const updatedOderState = oderState.map(item => {
                    if (item.id === id) {
                        // id가 일치하는 객체의 img 값을 업데이트합니다.
                        return { ...item, previewImg: fileRead.result, postImg: file };
                    }
                    return item;
                });
                // 변경된 배열을 설정합니다.
                setOderState(updatedOderState);
            };
            fileRead.readAsDataURL(file);
        }

    };


    const hanCl = (index) => {
        inputRef.current[index].click();
    }

    const testSubmitt = async (e) => {
        e.preventDefault();

        if (!thumbnailPostImg) {
            alert('이미지를 선택하세요.');
            return;
        }
        for (const item of oderState) {
            if (!item.postImg) {
                alert('조리 순서 이미지를 선택하세요.');
                return;
            }
        }
        

        const recipeKey = Date.now();

        const formData = new FormData(e.target);
        const stepFormData = new FormData();
        const thumbnailformData = new FormData();

        formData.append("objKey", recipeKey)
        thumbnailformData.append("thumbnail", thumbnailPostImg, `${recipeKey}_${thumbnailPostImg.name}`);

        oderState.forEach((item, index) => {
            if (item.postImg) {
                stepFormData.append(`postImg`, item.postImg, `${recipeKey}_${index}_${item.postImg.name}`);
            }
        });

        const textData = [];

        test.forEach((item, index) => {
            const raw = formData.get(`${index}-raw`);
            const volume = formData.get(`${index}-volume`);
            const unit = formData.get(`${index}-unit`);

            textData.push({
                raw,
                volume,
                unit
            });
        });

        const stepData = [];

        oderState.forEach((item, index) => {
            const stepText = formData.get(`${item.num}-text`);

            stepData.push({
                stepText
            });
        });

        const postData = {
            category: formData.get('category'),
            people: formData.get('people'),
            title: formData.get('title'),
            intro: formData.get('intro'),
            recipeKey: formData.get('objKey'),
            view : 0,
            favorite: 0,
            userInfo : user,
            rawInfo: textData,
            step: stepData
        };

        const stepImgRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/stepImgUpload`, stepFormData);
        const thumbnailImgRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/thumbnailImgUpload`, thumbnailformData);
        const recipeRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/recipe`, postData);

        await navigate('/')

    };


    const onDragEndWrapper = (result) => {
        if (!result.destination) return;

        if (result.destination.droppableId === "droppable") {
            onDragEnd(result);
        } else if (result.destination.droppableId === "droppable2") {
            stepOnDragEnd(result);
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const originData = [...test];
        const [reorderedData] = originData.splice(result.source.index, 1);
        originData.splice(result.destination.index, 0, reorderedData);


        originData.forEach((item, index) => {
            item.num = index;
        });

        setTest(originData);
    }

    const stepOnDragEnd = (result) => {
        if (!result.destination) return;

        const originData = [...oderState];
        const [reorderedData] = originData.splice(result.source.index, 1);
        originData.splice(result.destination.index, 0, reorderedData);


        originData.forEach((item, index) => {
            item.num = index;
        });

        setOderState(originData);
    }

    useEffect(() => {
        setTest(test);
        setOderState(oderState);
    }, [])


    return (
        <DragDropContext onDragEnd={onDragEndWrapper}>
            <div className='overflow-hidden relative'>
                <Header />
                <div className='max-w-pc m-auto px-5 lg:p-0 '>
                    <h2 className=' text-2xl font-bold my-5'>레시피등록</h2>
                    <form encType="multipart/form-data" onSubmit={(e) => { testSubmitt(e) }}>
                        {/* section1 */}
                        <div className='flex mt-5 flex-col'>
                            <div className='flex-1 lg:mr-10'>
                                <div className='flex mb-3'>
                                    <span className='w-28'>레시피 제목</span>
                                    <input className='flex-1 border border-black ' type='text' name='title'></input>
                                </div>
                                <div className='flex mb-3'>
                                    <span className='w-28'>요리소개</span>
                                    <textarea className='flex-1 border border-black resize-none' name='intro' cols={30} rows={3}></textarea>
                                </div>
                                <div className='flex mb-3'>
                                    <span className='w-28'>카테고리</span>
                                    <select className='border border-black' required name='category'>
                                        <option value="">종류를 선택하세요</option>
                                        <option value="한식">한식</option>
                                        <option value="양식">양식</option>
                                        <option value="중식">중식</option>
                                        <option value="일식">일식</option>
                                        <option value="분식">분식</option>
                                        <option value="밑반찬">밑반찬</option>
                                        <option value="패스트푸드">패스트푸드</option>
                                        <option value="디저트">디저트</option>
                                    </select>
                                </div>

                                <div className='flex mb-3'>
                                    <span className='w-28'>인원</span>
                                    <select className='border border-black' required name='people'>
                                        <option value="">인원을 선택하세요</option>
                                        <option value="1">1인분</option>
                                        <option value="2">2인분</option>
                                        <option value="3">3인분</option>
                                        <option value="4">4인분</option>
                                        <option value="5+">5인분 이상</option>
                                    </select>
                                </div>

                            </div>

                            <div className='w-full lg:w-1/5'>
                                <div className='w-full aspect-square'>
                                    <img className='w-full h-full object-cover' src={previewImg ? previewImg : imgPlus} alt='썸네일사진'></img>
                                </div>
                                <div className=' text-center'>
                                    <input className='hidden' type='file' id='upload' onChange={fileTest}></input>
                                    <label className=' inline-block w-full cursor-pointer p-1 rounded-md mt-5 bg-slate-400' htmlFor='upload'>사진 등록</label>
                                </div>
                            </div>
                        </div>

                        {/* section2 */}
                        <div className='border-t border-black mt-10'>
                            <h2 className=' text-2xl font-bold my-5'>재료정보</h2>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <ul ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        {
                                            test.map((item, index) => (
                                                <li className='my-2 ' key={item.id}>
                                                    <Draggable draggableId={`${item.id}`} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div className='flex flex-col items-center py-1 lg:flex-row' ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}   >
                                                                <span className='mr-3'>재료{index + 1}</span>
                                                                <input className='border border-black mt-4 w-full lg:flex-1 lg:mr-3 lg:mt-0' name={`${item.num}-raw`} type='text' placeholder='돼지고기'></input>
                                                                <input className='border border-black mt-4 w-full lg:flex-1 lg:mr-3 lg:mt-0' name={`${item.num}-volume`} type='text' placeholder='수량'></input>
                                                                <select className='border border-black mt-4 w-full lg:flex-1 lg:mr-3 lg:mt-0' required name={`${item.num}-unit`}>
                                                                    <option value="">단위를 선택하세요</option>
                                                                    <option value="종이컵">종이컵</option>
                                                                    <option value="개">개</option>
                                                                    <option value="근">근</option>
                                                                    <option value="큰술">큰술</option>
                                                                    <option value="작은술">작은술</option>
                                                                    <option value="1꼬집">1꼬집</option>
                                                                    <option value="g">g</option>
                                                                    <option value="kg">kg</option>
                                                                    <option value="ml">ml</option>
                                                                    <option value="L">L</option>
                                                                    <option value="적당량">적당량</option>
                                                                </select>
                                                                <button className=' bg-orange-200 w-full p-1 rounded-md mt-4 lg:mt-0 lg:w-20' onClick={(e) => { rawDel(e, item.id) }}>삭제</button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </li>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>

                            <div className=' text-center mt-10'>
                                <img src={plus} className='cursor-pointer w-8 inline-block' onClick={() => { rawAdd() }} alt='플러스아이콘'></img>
                            </div>
                        </div>

                        {/* section3 */}
                        <div className='border-t border-black mt-10 mb-20'>
                            <h2 className=' text-2xl font-bold my-5'>조리순서</h2>
                            <Droppable droppableId="droppable2">
                                {(provided, snapshot) => (
                                    <ul ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        {
                                            oderState.map((item, index) => (
                                                <li key={item.id} className='flex mb-5'>
                                                    <Draggable draggableId={`${item.id}`} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div className='flex w-full flex-col items-center py-1 lg:flex-row' ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}   >
                                                                <span>Step{index + 1}</span>
                                                                <textarea className='w-full border border-black resize-none mx-5 mt-4 lg:mt-0' name={`${item.num}-text`} cols={30} rows={3}></textarea>
                                                                <div className=' w-1/6 aspect-square mt-4 lg:mt-0 lg:mr-5' onClick={() => { hanCl(index) }}>
                                                                    <img className='w-full h-full object-cover cursor-pointer' src={item.previewImg ? item.previewImg : imgPlus} alt='조리순서 이미지'></img>
                                                                    <input ref={el => (inputRef.current[index] = el)} className='hidden' id={item.id} type='file' onChange={(e) => { oderFile(e, item.id) }}></input>
                                                                </div>
                                                                <button className='bg-orange-200 w-full p-1 rounded-md mt-4 lg:mt-0 lg:w-20' onClick={(e) => { oderDel(e, item.id) }}>삭제</button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </li>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}

                            </Droppable>
                            <div className=' text-center mt-10'>
                                <img src={plus} className='cursor-pointer w-8 inline-block' onClick={() => { oderAdd() }} alt='플러스아이콘'></img>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button className='p-2 bg-main rounded-md w-40 text-white'>등록하기</button>
                        </div>

                    </form>
                </div>
            </div>
        </DragDropContext>
    )
}

export default RecipeWrite
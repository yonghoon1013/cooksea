import { create } from 'zustand';
import allFood from '../asset/imgs/all-food.jpg';
import koreaFood from '../asset/imgs/korea-food.jpg';
import JapaneseFood from '../asset/imgs/Japanese-food.jpg';
import ChineseFood from '../asset/imgs/Chinese-food.jpg';
import westernFood from '../asset/imgs/western-food.jpg';
import snackFood from '../asset/imgs/snack-food.jpg';
import sideFood from '../asset/imgs/side-dish.jpg';
import dessert from '../asset/imgs/dessert.jpg';
import fastFood from '../asset/imgs/fastfood.jpg';


export const CategoryStore = create(() => {
    // 기본 카테고리 리스트 정의
    const categioryArr = [
        {
            name: "한식",
            value: "한식",
            img: koreaFood
        },
        {
            name: "중식",
            value: "중식",
            img: ChineseFood
        },
        {
            name: "일식",
            value: "일식",
            img: JapaneseFood
        },
        {
            name: "양식",
            value: "양식",
            img: westernFood
        },
        {
            name: "분식",
            value: "분식",
            img: snackFood
        },
        {
            name: "밑반찬",
            value: "밑반찬",
            img: sideFood
        },
        {
            name: "패스트푸드",
            value: "패스트푸드",
            img: fastFood
        },
        {
            name: "디저트",
            value: "디저트",
            img: dessert
        },
    ];

    // 초기 상태 반환
    return {
        categioryArr,

        categioryList: [
            {
                name: "전체",
                value: "전체",
                img: allFood
            },
            ...categioryArr
        ],

        categioryWriteList: [
            {
                name: "종류를 선택하세요",
                value: "",
                img: null
            },
            ...categioryArr
        ]
    };
});

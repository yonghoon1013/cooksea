import {create} from 'zustand';

export const Store = create((set, get) => ({
    user : '',
    userGet(getUser){
        set((state)=>({user : getUser}))
    },
    loginCheck(){
        const { user } = get(); 
        if(user){
            return true;
        } else{
            return false;
        }
    },
    all : false,
    allCheck(){
        set((state)=>({all : !state.all}))
    },
    allCheck2(bool){
        set((state)=>({all : bool}))
    },
    checkLi : [],
    setCheckLi(checkLiArr) {
        set({checkLi : checkLiArr})
    },
    tkCheck(index) {
        set((state) => {
            const updatedCheck = [...state.checkLi];
            updatedCheck[index] = !updatedCheck[index];
            return { checkLi: updatedCheck };
        });
    },
    searchInput : "",
    searchValueUpdate(searchValue){
        set({searchInput : searchValue})
    },
    profileImgBoxToggle : false,
    imgBoxToggle(bool){
        set({profileImgBoxToggle : bool})
    },
    profieIntro : false,
    profieIntroToggle(bool){
        set({profieIntro : bool})
    },
}))
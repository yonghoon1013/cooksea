import {create} from 'zustand';

import testImg from '../asset/imgs/cook-img.jpg'
import eyesIcon from '../asset/imgs/eyes-icon.svg'
import heartIcon from '../asset/imgs/heart-icon.svg'
import redHeart from '../asset/imgs/red-heart.svg'
import emptyHeart from '../asset/imgs/empty-heart.svg'
import miniHeart from '../asset/imgs/mini-red-heart.svg'
import shareIcon from '../asset/imgs/share-icon.svg'
import share2Icon from '../asset/imgs/share2-icon.svg'
import penIcon from '../asset/imgs/pen.svg'
import talkIcon from '../asset/imgs/talk-icon.svg'
import likeIcon from '../asset/imgs/like-icon.svg'
import plus from '../asset/imgs/plus.svg'
import imgPlus from '../asset/imgs/img-plus.jpg'
import logo from '../asset/imgs/logo.png'
import logo2 from '../asset/imgs/logo2.png'
import profileDefault from '../asset/imgs/profile-default.png'
import camera from '../asset/imgs/camera.png'


export const ImgStore = create((set) => ({
    testImg : testImg,
    eyesIcon : eyesIcon,
    emptyHeart : emptyHeart,
    heartIcon : heartIcon,
    redHeart : redHeart,
    miniHeart : miniHeart,
    shareIcon : shareIcon,
    share2Icon : share2Icon,
    penIcon : penIcon,
    talkIcon : talkIcon,
    likeIcon : likeIcon,
    plus : plus,
    imgPlus: imgPlus,
    logo : logo,
    logo2 : logo2,
    profileDefault : profileDefault,
    camera : camera
}))
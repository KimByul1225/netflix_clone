import styled from "styled-components";
import { motion } from "framer-motion";

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};
// -----------------------

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const Loader = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

// ---배너 영역---

export const Banner = styled.div<{ bgphoto: string }>`
  // 배너 이미지
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0.9%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)),
    linear-gradient(to top, rgba(20, 20, 20, 1) 4%, rgba(0, 0, 0, 0) 13%),
    url(${props => props.bgphoto});
  background-size: cover;
`;

export const Title_and_Overview = styled.div`
  // 타이틀, 설명 container
  width: 55vw;
  height: 50vh;
  margin-top: 20vh;
  margin-left: 60px;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    height: 60vh;
  }
`;

export const Title = styled.h2`
  // 영화제목
  font-size: 80px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 1px 2px 3px rgb(0, 0, 0, 0.6);
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 75px;
  }
`;

export const Overview = styled.p`
  // 영화 설명
  font-size: 25px;
  font-weight: 400;
  width: 70%;
  text-shadow: 1px 2px 4px rgb(0, 0, 0, 0.7);
  margin-bottom: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 20px;
  }
`;

export const Btn_Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  min-width: 40%;
`;

export const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  background-color: ${props => props.theme.white.lighter};
  font-size: 25px;
  color: ${props => props.theme.black.darker};
  border-radius: 5px;
  text-align: center;
  margin-right: 15px;
  svg {
    margin-right: 5px;
  }
  cursor: pointer;
  :hover {
    background-color: rgba(238, 238, 238, 0.6);
  }

  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    width: 120px;
    height: 40px;
    font-size: 20px;
  }
`;

export const InfoBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 50px;
  background-color: rgba(75, 75, 75, 0.8);
  font-size: 25px;
  color: ${props => props.theme.white.lighter};
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: rgba(75, 75, 75, 0.5);
  }
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    width: 180px;
    height: 40px;
    font-size: 20px;
  }
`;

// ---------- 슬라이드 영역
export const Slider = styled.div`
  padding: 0 60px;
  height: 220px;
  position: relative;
  top: -100px;
  margin-bottom: 30px;
`;

export const Slider_Title = styled.h2`
  color: ${props => props.theme.white.lighter};
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: 500;
`;

export const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 97%;
  position: absolute;
`;

export const RowBox = styled(motion.div)<{ bgphoto: string }>`
  height: 170px;
  margin-right: 5px;
  border-radius: 3px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
  // 첫번째랑 마지막 포스터 scale 1.3 될때 잘리지않게
  &:first-child {
    transform-origin: center left !important;
  }
  &:last-child {
    transform-origin: center right !important;
  }
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    height: 135px;
  }
`;

export const RowBox_Info = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: rgba(28, 28, 28, 0.6);
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;

// ---------- 슬라이드 영역 : next,prev 버튼
export const prevBtn = styled.div`
  width: 30px;
  height: 30px;
  top: 100px;
  position: absolute;
  svg {
    fill: rgb(238, 238, 238);
    :hover {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
  z-index: 1;
  cursor: pointer;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    top: 90px;
  }
`;

export const nextBtn = styled.div`
  width: 30px;
  height: 30px;
  top: 100px;
  right: 10px;
  position: absolute;
  svg {
    fill: rgb(238, 238, 238);
    :hover {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
  z-index: 1;
  cursor: pointer;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    top: 90px;
  }
`;












// ----------Variants----
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.4 },
  exit: { opacity: 0 },
};

export const modalVariants = {
  initial: { opacity: 0 },
  click: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
};
// -----------------------

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Modal = styled(motion.div)`
  position: fixed;
  width: 55vw;
  height: 90vh;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.black.darker};
  border-radius: 5px;
  overflow: hidden;
  border-radius: 5px;
  z-index: 999 !important; // 최상위, z-index : 998 - header 영역
`;

export const Modal_Poster = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 500px;
  background-image: linear-gradient(
      to top,
      rgba(24, 24, 24, 1) 2%,
      rgba(0, 0, 0, 0) 60%
    ),
    url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    height: 350px;
  }
`;

export const Poster_prevBtn = styled.div`
  color: ${props => props.theme.white.darker};
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 19px;
  text-align: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  background-color: ${props => props.theme.black.darker};
`;

export const Poster_Title = styled.div`
  letter-spacing: 1px;
  width: 100%;
  height: 70px;
  color: ${props => props.theme.white.lighter};
  padding: 0 50px;
  font-size: 45px;
  font-weight: 700;
  position: relative;
  top: -90px;
  text-shadow: 1px 1px 2px #a8a8a8;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;

  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 32px;
    top: -75px;
    height: 40px;
    margin-bottom: 25px;
  }
`;

export const Poster_MiniTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-left: 55px;
  position: relative;
  top: -90px;
  letter-spacing: 0.8px;
  color: #bababa;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 14px;
  }
`;

export const Poster_infomation_top = styled.div`
  // 1.개봉년도  2.장르  3.평균 평점 리스트
  top: -55px;
  font-size: 22px;
  padding-left: 50px;
  position: relative;
  font-weight: 500;
  span:first-child {
    color: #46d369;
    border: 1px solid ${props => props.theme.white.darker};
    padding: 0.5px 4px;
    border-radius: 3px;
    margin-right: 10px;
  }
  p {
    display: inline;
  }
  span:last-child {
    margin-left: 10px;
  }
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 18px;
  }
`;

export const Poster_infomation_bottom = styled.div`
  padding-left: 50px;
  padding-bottom: 30px;
  padding-right: 50px;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -20px;
`;

export const Poster_overview = styled.div`
  width: 60%;
  font-size: 18px;
  line-height: 1.45;
  color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.black.darker};
  padding-right: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    -webkit-line-clamp: 1; /* 라인수 */
    font-size: 15px;
    line-height: 1.2;
  }
`;

export const Poster_acter_and_director = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  font-size: 18px;
  color: ${props => props.theme.white.lighter};
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 16px;
  }
`;

export const Poster_actor = styled.div`
  margin-bottom: 20px;
  div {
    display: inline;
  }
  span {
    color: #777777;
    margin-right: 6px;
  }
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    margin-bottom: 10px;
  }
`;

export const Poster_director = styled.div`
  span {
    color: #777777;
    margin-right: 6px;
  }
`;






export const BoxHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.2,
    y: -22,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const Wrapper = styled.div`
  margin-top: 80px;
  height: 40vh;
`;

export const Notingdiv = styled.div`
  padding-top: 250px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 20px;
  color: #808080;
  margin-bottom: 50px;
  span {
    color: ${props => props.theme.white.lighter};
  }
`;

export const Searching = styled.div`
  padding: 60px;
`;

export const Searching_Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${props => props.theme.white.darker};
  span {
    font-size: 25px;
    margin-right: 3px;
  }
`;

export const SearchRow_movie = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 96%;
  margin-bottom: 60px;
`;

export const SearchRow_series = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 96%;
  margin-bottom: 40px;
`;

export const RowBox = styled(motion.div) <{ bgphoto: string }>`
  height: 170px;
  border-radius: 3px;
  background-image: url(${props => props.bgphoto});
  background-color: ${props =>
    props.theme.black.lighter}; // bgphoto 가 없을 경우 띄워지는
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
  // 글자
  font-size: 10px;
  text-align: center;
  color: white;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    height: 135px;
  }
`;

export const RowBox_Info = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: rgba(28, 28, 28, 0.6);
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;

export const Modal_Poster = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${props =>
    props.theme.black.lighter}; // bgphoto 가 없을 경우 띄워지는
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
`;

export const Search_infomation = styled.div`
  // 1. 개봉년일 2.평점
  padding-left: 320px;
  position: relative;
  top: -40px;
  font-weight: 500;
  font-size: 20px;
  span:first-child {
    color: #46d369;
    border: 1px solid ${props => props.theme.white.darker};
    padding: 0.5px 4px;
    border-radius: 3px;
    margin-right: 10px;
  }
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    padding-left: 250px;
    top: -60px;
    font-size: 18px;
  }
`;

export const Search_overview = styled.div`
  width: 90%;
  font-size: 20px;
  margin-top: 20px;
  line-height: 1.4;
  color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.black.darker};

  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    height: 200px;
    font-size: 15px;
    line-height: 1.3;
    font-weight: 400;
    overflow: auto;
  }
`;

export const Search_MiniPoster = styled.div<{ bgphoto: string }>`
  width: 220px;
  height: 280px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 540px;
  left: 50px;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    width: 160px;
    height: 220px;
    top: 370px;
    left: 50px;
  }
`;

export const Search_OriginTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-left: 55px;
  position: relative;
  top: -90px;
  letter-spacing: 0.8px;
  color: #bababa;
  @media screen and (max-width: 1536px) {
    /* 15.6인치 노트북 기준 */
    font-size: 14px;
  }
`;

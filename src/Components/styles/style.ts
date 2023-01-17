import styled from "styled-components";
import { motion } from "framer-motion";
import noImage from "../../Images/noimage.png";

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

export const Banner = styled.div<{ bgphoto: string }>`
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

export const Title = styled.h2`
  font-size: 20px;
  color: #808080;
    margin-bottom: 50px;
  span {
    color: ${props => props.theme.white.lighter};
  }
`

export const TitleOverviewWrap = styled.div` 
  width: 55vw;
  position:  absolute;
  top: 50%;
  left: 60px;
  transform: translateY(-50%);
`;

export const BannerTitle = styled.h2`
  font-size: 80px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 1px 2px 3px rgb(0, 0, 0, 0.6);
  @media screen and (max-width: 1536px) {
    font-size: 75px;
  }
`;

export const Overview = styled.p`
  font-size: 25px;
  font-weight: 400;
  width: 70%;
  text-shadow: 1px 2px 4px rgb(0, 0, 0, 0.7);
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  @media screen and (max-width: 1536px) {
    font-size: 20px;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
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
    width: 180px;
    height: 40px;
    font-size: 20px;
  }
`;

export const Slider = styled.div`
  padding: 0 60px;
  height: 220px;
  position: relative;
  top: -100px;
  margin-bottom: 30px;
`;

export const SliderTitle = styled.h2`
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
  &:first-child {
    transform-origin: center left !important;
  }
  &:last-child {
    transform-origin: center right !important;
  }
  @media screen and (max-width: 1536px) {
    height: 135px;
  }
`;

export const RowBoxInfo = styled(motion.div)`
  opacity: 0;
  padding: 10px;
  background-color: rgba(28, 28, 28, 0.6);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;

export const PrevBtn = styled.div`
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
    top: 90px;
  }
`;

export const NextBtn = styled.div`
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
    top: 90px;
  }
`;


export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  z-index: 2;
`;

export const Modal = styled(motion.div)`
  position: fixed;
  width: 55vw;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.black.darker};
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 30px;
  z-index: 999 !important;
`;

export const ModalBackDrop = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 500px;
  background-image: linear-gradient(
      to top,
      rgba(24, 24, 24, 1) 2%,
      rgba(0, 0, 0, 0) 60%
    ),
    url(${props => props.bgphoto ? props.bgphoto : noImage});
  background-size: cover;
  background-position: center center;
  @media screen and (max-width: 1536px) {
    height: 350px;
  }
`;

export const CloseBtn = styled.div`
  color: ${props => props.theme.white.darker};
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  background-color: ${props => props.theme.black.darker};
`;

export const DetailWrap = styled.div`
  padding: 0 50px 100px 50px;
  margin-top: -80px;
`
export const PosterTitle = styled.div`
  width: 100%;
  color: ${props => props.theme.white.lighter};
  font-size: 45px;
  font-weight: 700;
  position: relative;
  text-shadow: rgb(0 0 0) 3px 3px 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  margin-bottom: 10px;
  z-index: 1000;
  @media screen and (max-width: 1536px) {
    font-size: 32px;
    top: -75px;
    height: 40px;
    margin-bottom: 25px;
  }
`;

export const PosterMiniTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  position: relative;
  letter-spacing: -0.005em;
  color: #eee;
  text-shadow: rgb(0 0 0) 3px 3px 3px;
  padding-left: 20px;
  margin-bottom: 30px;
  z-index: 1000;
  @media screen and (max-width: 1536px) {
    font-size: 14px;
  }
`;

export const PosterInfomation = styled.div`
  font-size: 30px;
  position: relative;
  font-weight: 500;
  margin-bottom: 30px;
  span:first-child {
    font-weight: 600;
    color: #fc0606;
    margin-right: 20px;
  }
  p {
    display: inline;
  }
  i {
    margin-left: 20px;
    font-size: 24px;
  }
  span:last-child {
    margin-left: 10px;
    color: #ffd501;
    font-size: 24px;
  }
  @media screen and (max-width: 1536px) {
    font-size: 18px;
  }
`;

export const PosterBox = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const PosterOverview = styled.div`
  width: 60%;
  font-size: 18px;
  line-height: 1.45;
  color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.black.darker};
  padding-right: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  @media screen and (max-width: 1536px) {
    -webkit-line-clamp: 1; 
    font-size: 15px;
    line-height: 1.2;
  }
`;

export const PosterStaff = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  font-size: 18px;
  color: ${props => props.theme.white.lighter};
  @media screen and (max-width: 1536px) {
    font-size: 16px;
  }
`;

export const PosterActor = styled.div`
  margin-bottom: 20px;
  div {
    display: inline;
  }
  span {
    color: #777777;
    margin-right: 6px;
  }
  @media screen and (max-width: 1536px) {
    margin-bottom: 10px;
  }
`;

export const PosterDirector = styled.div`
  span {
    color: #777777;
    margin-right: 6px;
  }
`;

export const SearchWrapper = styled.div`
  margin-top: 80px;
  min-height: 40vh;
`;

export const NotingWrap = styled.div`
  padding-top: 250px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
`;

export const Searching = styled.div`
  padding: 60px;
`;


export const SearchingResult = styled.div`
  font-size: 36px;
  color: #808080;
  margin-bottom: 20px;
  b {
    color: ${props => props.theme.white.lighter};
    font-size: 36px;
    font-weight: 600;
    display: inline-block;
    margin: 0 10px;
  }
`;

export const SearchingCount = styled.div`
  font-size: 20px;
  color: #808080;
  padding-left: 30px;
  margin-bottom: 50px;
  b {
    color: ${props => props.theme.white.lighter};
    font-size: 24px;
    font-weight: 600;
    display: inline-block;
    margin: 0 10px;
  }
`;

export const SearchingTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
  color: ${props => props.theme.white.darker};
  i{
    display: inline-block;
    margin-right: 10px;
  }
`;

export const SearchRowMovie = styled(motion.div)`
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

export const SearchRowBox = styled(motion.div) <{ bgphoto: string }>`
  height: 170px;
  border-radius: 3px;
  background-image: url(${props => props.bgphoto});
  background-color: ${props =>
    props.theme.black.lighter}; 
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
  color: white;
  @media screen and (max-width: 1536px) {
    height: 135px;
  }
`;


export const DetailPoster = styled.div<{ bgphoto: string }>`
  width: 300px;
  height: 450px;
  background-image: url(${props => props.bgphoto ? props.bgphoto : noImage});

  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 60px;
  left: 30px;
  z-index: 999;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 15px;
`;

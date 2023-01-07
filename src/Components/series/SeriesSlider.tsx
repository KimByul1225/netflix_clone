import { useState } from "react";
import * as style from "../styles/style";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { makeImagePath } from "../../Utils/util";
import { PathMatch, useMatch } from "react-router-dom";

import { IGetResult } from "../../Api/api";

import SeriesDetail from "./SeriesDetail";

// ----------Variants----
const RowVariants = {
  hidden: (isNext: boolean) => {
    return {
      x: isNext ? window.innerWidth : -window.innerWidth,
    };
  },
  visible: {
    x: 0,
  },
  exit: (isNext: boolean) => {
    return {
      x: isNext ? -window.innerWidth : window.innerWidth,
    };
  },
};

const BoxHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -30,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface IBannerProps {
  data: IGetResult | undefined;
  title: string;
  category: string;
}

const SeriesSlider: React.FC<IBannerProps> = ({ category, data, title }) => {
  // - 슬라이더 내에 한번에 보여주고싶은 시리즈의 개수
  const offset = 6;

  // - 슬라이드 다음, 이전으로 넘기기위한 인덱스
  const [index, setIndex] = useState(0);

  // - 슬라이드 애니메이션 방향 설정
  const [isNext, setIsNext] = useState(true);

  // - leaving : 슬라이드 내에 이동중인 애니메이션이 끝났는지 확인
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);

  // - Box 클릭시 url 이동
  const navigate = useNavigate();
  const onBoxClicked = (tv_id: number) => {
    navigate(`/series/${tv_id}`);
  };

  // "/tv/:tv_Id" URL 로 이동하였는지 확인
  const tvMatch: PathMatch<string> | null = useMatch("/series/:tv_id");

  // - nextIndex : index state 증가 함수
  const nextIndex = () => {
    if (data) {
      // 애니메이션이 아직 끝나지 않았다면
      if (leaving) return;

      const totalSeries = data.results.length;
      // 총 시리즈 개수에서 타이틀에 걸린 시리즈 1개 제외한 값
      const maxIndex = Math.floor(totalSeries / offset) - 1;

      toggleLeaving();

      // 완벽한 정수가 나오지 않을 수 있으므로 반올림처리
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
      setIsNext(() => true);
    }
  };

  // - prevIndex : index state 감소 함수
  const prevIndex = () => {
    if (data) {
      // 애니메이션이 아직 끝나지 않았다면
      if (leaving) return;
      const totalSeries = data.results.length;
      // 총 시리즈 개수에서 타이틀에 걸린 시리즈 1개 제외한 값
      const maxIndex = Math.floor(totalSeries / offset) - 1;

      toggleLeaving();

      // 완벽한 정수가 나오지 않을 수 있으므로 반올림처리
      setIndex(prev => (prev === 0 ? maxIndex - 1 : prev - 1));
      setIsNext(() => false);
    }
  };

  //index 값에 따라 6 단위의 배열로 잘라냄
  const resultsData = data?.results
    .slice(1)
    .slice(offset * index, offset * index + offset);

  return (
    <>
      {/* -- 슬라이드 영역 -- */}
      <style.Slider>
        <style.SliderTitle>{title}</style.SliderTitle>
        <AnimatePresence
          custom={isNext}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <style.Row
            key={category + index}
            variants={RowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isNext}
            transition={{ type: "tween", duration: 1 }}
          >
            {resultsData &&
              resultsData.map(data => (
                <style.RowBox
                  onClick={() => onBoxClicked(data.id)}
                  key={category + data.id}
                  variants={BoxHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(
                    data?.backdrop_path || data?.poster_path,
                    "w500"
                  )}
                >
                  <style.RowBoxInfo variants={style.infoVariants}>
                    <h4>{data.name}</h4>
                  </style.RowBoxInfo>
                </style.RowBox>
              ))}
          </style.Row>
        </AnimatePresence>
        <style.PrevBtn onClick={prevIndex}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </style.PrevBtn>
        <style.NextBtn onClick={nextIndex}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </style.NextBtn>
      </style.Slider>

      {/* -- 오버레이 영역 -- */}
      {tvMatch ? (
        <>
          <SeriesDetail tv_id={tvMatch.params.tv_id!} category={category} />
        </>
      ) : null}
    </>
  );
};

export default SeriesSlider;

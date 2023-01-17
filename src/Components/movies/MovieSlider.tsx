import React, { useState } from "react";
import * as style from "../styles/style";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { makeImagePath } from "../../Utils/util";
import { PathMatch, useMatch } from "react-router-dom";
import { IGetResult } from "../../Api/api";
import MovieDetail from "./MovieDetail";

/**
 * @description 메인(영화)페이지 각 슬라이더 컴포넌트
 */

interface IBannerProps {
  data: IGetResult | undefined;
  title: string;
  category: string;
}

const rowVariants = {
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
const boxHoverVariants = {
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


const MovieSlider: React.FC<IBannerProps> = React.memo(
  ({ category, data, title }) => {
    const offset = 6;
    const [index, setIndex] = useState(0);
    const [isNext, setIsNext] = useState(true);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const navigate = useNavigate();
    const onBoxClicked = (movieId: number) => {
      navigate(`/movies/${movieId}`);
    };
    const movieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");
    
    const nextIndex = () => {
      if (data) {
        if (leaving) {
          return;
        } else {
          const totalMovies = data.results.length;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          toggleLeaving();
          setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
          setIsNext(() => true);
        }
      }
    };

    const prevIndex = () => {
      if (data) {
        if (leaving) {
          return;
        } else {
          const totalMovies = data.results.length;
          const maxIndex = Math.floor(totalMovies / offset) - 1;
          toggleLeaving();
          setIndex(prev => (prev === 0 ? maxIndex - 1 : prev - 1));
          setIsNext(() => false);
        }
      }
    };

    const resultsData = data?.results.slice(1).slice(offset * index, offset * index + offset);

    return (
      <>
        <style.Slider>
          <style.SliderTitle>{title}</style.SliderTitle>
          <AnimatePresence
            custom={isNext}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <style.Row
              key={category + index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={isNext}
              transition={{ type: "tween", duration: 1 }}
            >
              {resultsData &&
                resultsData.map(movie => (
                  <style.RowBox
                    onClick={() => onBoxClicked(movie.id)}
                    key={category + movie.id}
                    variants={boxHoverVariants}
                    initial="initial"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    bgphoto={makeImagePath(
                      movie?.backdrop_path || movie?.poster_path,
                      "w500"
                    )}
                  >
                    <style.RowBoxInfo variants={style.infoVariants}>
                      <h4>{movie.title}</h4>
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

        {movieMatch ? (
          <>
            <MovieDetail
              id={movieMatch.params.movieId!}
              category={category}
            />
          </>
        ) : null}
      </>
    );
  }
);

export default MovieSlider;

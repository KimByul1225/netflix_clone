import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import {  IGetSearch } from "../../Api/api";
import { makeImagePath } from "../../Utils/util";
import * as style from "../styles/style";
import MovieDetail from "../movies/MovieDetail";

/**
 * @description 검색창 영화 영역 컴포넌트
 */

interface Iprops {
  keyword: string;
  movieData: IGetSearch;
}

function SearchMovie({ keyword, movieData }: Iprops) {
  const navigate = useNavigate();
  const movieClick = (movieId: number) =>
    navigate(`/search/movie/${movieId}?keyword=${keyword}`);
  const movieMatch: PathMatch<string> | null = useMatch(
    "/search/movie/:movieId"
  );

  return (
    <>
      <style.SearchingTitle>
        <i>🎬</i>
        <span>Movie</span>
      </style.SearchingTitle>
      <style.SearchRowMovie>
        {movieData?.results.map(data => (
          <style.SearchRowBox
            onClick={() => movieClick(data.id)}
            variants={style.BoxHoverVariants}
            initial="initial"
            whileHover="hover"
            transition={{ type: "tween" }}
            bgphoto={makeImagePath(
              data.backdrop_path || data.poster_path,
              "w500"
            )}
            key={`movie-${data.id}`}
          >
            <style.RowBoxInfo variants={style.infoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </style.RowBoxInfo>
          </style.SearchRowBox>
        ))}
      </style.SearchRowMovie>

      {
        movieMatch ? 
          <MovieDetail
            id={movieMatch.params.movieId!}
          />

        : 
          null
      }
    </>
  );
}

export default SearchMovie;

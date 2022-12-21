import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { IGetSearch } from "../../apis/SearchApi";
import { makeImagePath } from "../../utils/utils";
import * as S from "../../styled-components/StyledSearch";
import * as M from "../../styled-components/StyledModal";
import { useState } from "react";

interface Iprops {
  keyword: string;
  movieData: IGetSearch;
}

function SearchMovie({ keyword, movieData }: Iprops) {
  const navigate = useNavigate();
  const [m_Id, setm_Id] = useState<number>();

  const MovieClick = (movieId: number) =>
    navigate(`/search/movie/${movieId}?keyword=${keyword}`);

  const MovieMatch: PathMatch<string> | null = useMatch(
    "/search/movie/:movieId:keyword"
  );

  const onIdtarget = (id: number) => {
    setm_Id(id);
  };
  const Mdata = movieData?.results.find(item => item.id === m_Id);

  // 영화 개봉날짜
  const sub_Openday = Mdata?.release_date?.substring(0, 4);

  return (
    <>
      <S.Searching_Title>
        <span>📽️</span>Movie
      </S.Searching_Title>
      <S.SearchRow_movie>
        {movieData?.results.map(data => (
          <S.RowBox
            onClick={() => {
              onIdtarget(data.id);
              MovieClick(data.id);
            }}
            variants={S.BoxHoverVariants}
            initial="initial"
            whileHover="hover"
            transition={{ type: "tween" }}
            bgphoto={makeImagePath(
              data.backdrop_path || data.poster_path,
              "w500"
            )}
            key={`movie-${data.id}`}
          >
            <S.RowBox_Info variants={S.infoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </S.RowBox_Info>
          </S.RowBox>
        ))}
      </S.SearchRow_movie>

      {MovieMatch ? (
        <>
          <M.Overlay
            variants={M.overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => navigate(-1)}
          />
          <M.Modal
            variants={M.modalVariants}
            initial="initial"
            animate="click"
            exit="exit"
          >
            <M.Modal_Poster
              bgphoto={
                Mdata?.backdrop_path
                  ? makeImagePath(Mdata.backdrop_path + "", "w500")
                  : Mdata?.poster_path
                  ? makeImagePath(Mdata.poster_path + "", "w500")
                  : null
              }
            />
            <M.Poster_prevBtn onClick={() => navigate(-1)}>✕</M.Poster_prevBtn>
            <M.Poster_Title>
              {Mdata?.name ? Mdata.name : Mdata?.title}
            </M.Poster_Title>
            <S.Search_OriginTitle>
              {Mdata?.original_title ? Mdata?.original_title : Mdata?.name}
            </S.Search_OriginTitle>
            <S.Search_MiniPoster
              bgphoto={makeImagePath(
                Mdata?.poster_path || Mdata!.backdrop_path,
                "w500"
              )}
            />
            <S.Search_infomation>
              <span>{sub_Openday ? sub_Openday : "No Data"}</span>
              <span>
                ⭐
                {Mdata?.vote_average
                  ? (Mdata?.vote_average).toFixed(1)
                  : "not vote"}
              </span>
              <S.Search_overview>
                {Mdata?.overview === ""
                  ? "There is no overview."
                  : Mdata?.overview}
              </S.Search_overview>
            </S.Search_infomation>
          </M.Modal>
        </>
      ) : null}
    </>
  );
}

export default SearchMovie;

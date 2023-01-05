import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { IGetSearch } from "../../Api/api";
import { makeImagePath } from "../../Utils/util";
import * as style from "../styles/style";
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
    "/search/movie/:movieId"
  );
  const onIdtarget = (id: number) => {
    setm_Id(id);
  };
  const Mdata = movieData?.results.find(item => item.id === m_Id);
  const sub_Openday = Mdata?.release_date?.substring(0, 4);

  return (
    <>
      <style.Searching_Title>
        <span>📽️</span>Movie
      </style.Searching_Title>
      <style.SearchRow_movie>
        {movieData?.results.map(data => (
          <style.RowBox
            onClick={() => {
              onIdtarget(data.id);
              MovieClick(data.id);
            }}
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
            <style.RowBox_Info variants={style.infoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </style.RowBox_Info>
          </style.RowBox>
        ))}
      </style.SearchRow_movie>

      {MovieMatch ? (
        <>
          <style.Overlay
            variants={style.overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => navigate(-1)}
          />
          <style.Modal
            variants={style.modalVariants}
            initial="initial"
            animate="click"
            exit="exit"
          >
            <style.Modal_Poster
              bgphoto={
                Mdata?.backdrop_path
                  ? makeImagePath(Mdata.backdrop_path + "", "w500")
                  : Mdata?.poster_path
                  ? makeImagePath(Mdata.poster_path + "", "w500")
                  : null
              }
            />
            <style.Poster_prevBtn onClick={() => navigate(-1)}>✕</style.Poster_prevBtn>
            <style.Poster_Title>
              {Mdata?.name ? Mdata.name : Mdata?.title}
            </style.Poster_Title>
            <style.Search_OriginTitle>
              {Mdata?.original_title ? Mdata?.original_title : Mdata?.name}
            </style.Search_OriginTitle>
            <style.Search_MiniPoster
              bgphoto={makeImagePath(
                Mdata?.poster_path || Mdata!.backdrop_path,
                "w500"
              )}
            />
            <style.Search_infomation>
              <span>{sub_Openday ? sub_Openday : "No Data"}</span>
              <span>
                ⭐
                {Mdata?.vote_average
                  ? (Mdata?.vote_average).toFixed(1)
                  : "not vote"}
              </span>
              <style.Search_overview>
                {Mdata?.overview === ""
                  ? "There is no overview."
                  : Mdata?.overview}
              </style.Search_overview>
            </style.Search_infomation>
          </style.Modal>
        </>
      ) : null}
    </>
  );
}

export default SearchMovie;

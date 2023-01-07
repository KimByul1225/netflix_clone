import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IGetCredit, IGetDetail, getMovieCredit, getMovieDetail } from "../../Api/api";
import * as style from "../styles/style";
import { makeImagePath } from "../../Utils/util";
import { useEffect } from "react";

/**
 * @description 메인(영화)페이지 각 슬라이더 컴포넌트
 */

interface IDetailProps {
  category?: string;
  id: string;
}

function MovieDetail({ category, id }: IDetailProps) {
  const navigate = useNavigate();
  const {
    data: detailData,
    isLoading: detailLoading,
    refetch: refetchDetail,
  } = useQuery<IGetDetail>(["movie", `${category}_detail`, id], () =>
    getMovieDetail(id)
  );
  console.log("detailData", detailData);
  const {
    data: creditData,
    isLoading: creditLoading,
    refetch: refetchCredit,
  } = useQuery<IGetCredit>(["movie", `${category}_credit`, id], () =>
    getMovieCredit(id)
  );
  useEffect(() => {
    refetchDetail();
    refetchCredit();
  }, [id, refetchDetail, refetchCredit]); 

  const actor = creditData?.cast.slice(0, 5);
  const director = creditData?.crew.find(
    people => people.known_for_department === "Directing"
  );
  const sub_Openday = detailData?.release_date.substring(0, 4);

  return (
    <>
      {detailLoading && creditLoading ? (
        ""
      ) : (
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
            {detailData ? (
              <Helmet>
                <title>
                  {detailData.title
                    ? detailData.title
                    : detailData.original_title}
                </title>
              </Helmet>
            ) : (
              "Neonfilx"
            )}
            <style.ModalBackDrop
              bgphoto={
                detailData?.backdrop_path
                  ? makeImagePath(detailData.backdrop_path + "", "w500")
                  : detailData?.backdrop_path
                  ? makeImagePath(detailData.poster_path + "", "w500")
                  : null
              }
            />
            {/* <Detail_Wrap_poster
              style={{
                backgroundImage: `url(${makeImagePath(
                  searchMovie?.poster_path || "",
                  "w500"
                )})`,
              }}
            /> */}
            <style.CloseBtn onClick={() => navigate(-1)}>✕</style.CloseBtn>

            <style.DetailWrap>
              <style.PosterTitle>{detailData?.title}</style.PosterTitle>
              <style.PosterMiniTitle>{detailData?.title}</style.PosterMiniTitle>
              <style.PosterInfomation>
                <span>{sub_Openday}</span>
                {detailData?.genres.slice(0, 3).map((genre, index) => (
                  <p id="genrs" key={genre.id}>
                    {genre.name}
                    {index !== detailData.genres.length - 1 && " · "}
                  </p>
                ))}
                <i>
                  ⭐ 
                </i>
                <span>
                  {detailData?.vote_average ? 
                    (detailData?.vote_average).toFixed(1)
                  : 
                    "not vote"
                  }
                </span>
              </style.PosterInfomation>
              <style.PosterBox>
                <style.PosterOverview>{detailData?.overview}</style.PosterOverview>
                <style.PosterStaff>
                  <style.PosterActor>
                    <span>Casting:</span>
                    {actor?.map((cast, index) => (
                      <div key={cast.id}>
                        {cast.name ? cast.name : "No data"},
                      </div>
                    ))}
                  </style.PosterActor>
                  <style.PosterDirector>
                    <span>Director:</span>
                    {director?.name ? director?.name : "No data"}
                  </style.PosterDirector>
                </style.PosterStaff>
              </style.PosterBox>
            </style.DetailWrap>
          </style.Modal>
        </>
      )}
    </>
  );
}

export default MovieDetail;

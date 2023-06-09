import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IGetCredit, IGetDetail, getMovieCredit, getMovieDetail } from "../../Api/api";
import * as style from "../styles/style";
import { makeImagePath } from "../../Utils/util";
import { useEffect } from "react";

/**
 * @description 영화 상세 모달창
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
  } = useQuery<IGetDetail>(["movie", `${id}_detail`], () =>
    getMovieDetail(id)
  );
  
  const {
    data: creditData,
    isLoading: creditLoading,
    refetch: refetchCredit,
  } = useQuery<IGetCredit>(["movie", `${id}_credit`], () =>
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
  const subOpenday = detailData?.release_date.substring(0, 4);

  return (
    <>
      {detailLoading && creditLoading ? (
        "Loading..."
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
              "Netfilx"
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
            <style.CloseBtn onClick={() => navigate(-1)}>✕</style.CloseBtn>
            <style.DetailPoster
              bgphoto={
                detailData?.poster_path ? 
                  makeImagePath(detailData.poster_path + "", "w500")
                : 
                  null
              }
            />
            <style.DetailWrap>
              <style.PosterTitle>{detailData?.title}</style.PosterTitle>
              <style.PosterMiniTitle>{detailData?.title}</style.PosterMiniTitle>
              <style.PosterInfomation>
                <span>{subOpenday}</span>
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
                    "평점 투표 정보가 없습니다."
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

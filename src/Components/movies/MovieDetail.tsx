import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { IGetCredit, IGetDetail, getMovieCredit, getMovieDetail } from "../../Api/api";

import * as style from "../styles/style";
import { makeImagePath } from "../../utils/utils";



import { useEffect } from "react";

interface IDetailProps {
  category?: string;
  id: string;
}

function MovieDetail({ category, id }: IDetailProps) {
  const navigate = useNavigate();

  // movie detail API
  const {
    data: detailData,
    isLoading: detailLoading,
    refetch: refetchDetail,
  } = useQuery<IGetDetail>(["movie", `${category}_detail`, id], () =>
    getMovieDetail(id)
  );

  // movie credit API
  const {
    data: creditData,
    isLoading: creditLoading,
    refetch: refetchCredit,
  } = useQuery<IGetCredit>(["movie", `${category}_credit`, id], () =>
    getMovieCredit(id)
  );

  // 이전 데이터 띄워지지 않게 refetch 처리
  useEffect(() => {
    refetchDetail();
    refetchCredit();
  }, [id, refetchDetail, refetchCredit]); // id가 변경될 때마다 데이터 업데이트

  // 출연진 5명 불러오기
  const actor = creditData?.cast.slice(0, 5);
  // 감독 정보
  const director = creditData?.crew.find(
    people => people.known_for_department === "Directing"
  );
  // 영화 개봉 날짜
  const sub_Openday = detailData?.release_date.substring(0, 4);

  return (
    <>
      {detailLoading && creditLoading ? (
        ""
      ) : (
        <>
          <style.Overlay
            variants={M.overlayVariants}
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
            <style.Modal_Poster
              bgphoto={
                detailData?.backdrop_path
                  ? makeImagePath(detailData.backdrop_path + "", "w500")
                  : detailData?.backdrop_path
                  ? makeImagePath(detailData.poster_path + "", "w500")
                  : null
              }
            />
            <style.Poster_prevBtn onClick={() => navigate(-1)}>✕</style.Poster_prevBtn>
            <style.Poster_Title>{detailData?.title}</style.Poster_Title>
            <style.Poster_MiniTitle>{detailData?.title}</style.Poster_MiniTitle>
            <style.Poster_infomation_top>
              <span>{sub_Openday}</span>
              {detailData?.genres.slice(0, 3).map((genre, index) => (
                <p id="genrs" key={genre.id}>
                  {genre.name}
                  {index !== detailData.genres.length - 1 && " · "}
                </p>
              ))}
              <span>
                ⭐
                {detailData?.vote_average
                  ? (detailData?.vote_average).toFixed(1)
                  : "not vote"}
              </span>
            </style.Poster_infomation_top>
            <style.Poster_infomation_bottom>
              <style.Poster_overview>{detailData?.overview}</style.Poster_overview>
              <style.Poster_acter_and_director>
                <style.Poster_actor>
                  <span>Casting:</span>
                  {actor?.map((cast, index) => (
                    <div key={cast.id}>
                      {cast.name ? cast.name : "No data"},
                    </div>
                  ))}
                </style.Poster_actor>
                <style.Poster_director>
                  <span>Director:</span>
                  {director?.name ? director?.name : "No data"}
                </style.Poster_director>
              </style.Poster_acter_and_director>
            </style.Poster_infomation_bottom>
          </style.Modal>
        </>
      )}
    </>
  );
}

export default MovieDetail;

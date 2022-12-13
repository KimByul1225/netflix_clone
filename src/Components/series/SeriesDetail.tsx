import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import * as style from "../styles/style";

import { makeImagePath } from "../../Utils/util";

import { IGetCredit, IGetDetail, getSeriesCredit, getSeriesDetail } from "../../Api/api";

// ----------Variants----
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.4 },
    exit: { opacity: 0 },
};

const modalVariants = {
    initial: { opacity: 0 },
    click: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
};
// -----------------------

interface IDetailProps {
    category?: string;
    tv_id: string;
}

function SeriesDetail({ category, tv_id }: IDetailProps) {
    const navigate = useNavigate();

    // Detail API
    const {
        data: detailData,
        isLoading: detailLoading,
        refetch: refetchDetail,
    } = useQuery<IGetDetail>(["Series_detail", `${category}_detail`], () =>
        getSeriesDetail(tv_id)
    );

  // Credit API
    const {
        data: creditData,
        isLoading: creditLoading,
        refetch: refetchCredit,
    } = useQuery<IGetCredit>(["Series_credit", `${category}_credit`], () =>
        getSeriesCredit(tv_id)
    );

    // 출연진 5명 불러오기
    const actor = creditData?.cast.slice(0, 5);
    // 감독 정보
    const production = creditData?.crew.find(
        people =>
        people.known_for_department === "Production" ||
        people.known_for_department === "Directing"
    );
  // 개봉 날짜
    const sub_Openday = detailData?.first_air_date.substring(0, 4);

    // 이전 데이터 띄워지지 않게 refetch 처리
    useEffect(() => {
        refetchDetail();
    }, [tv_id, refetchDetail, refetchCredit]); // id가 변경될 때마다 데이터 업데이트

    return (
        <>
            {detailLoading && creditLoading ? (
                ""
            ) : (
                <>
                    <style.Overlay
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => navigate(-1)}
                    />
                    <style.Modal
                        variants={modalVariants}
                        initial="initial"
                        animate="click"
                        exit="exit"
                    >
                        {detailData ? (
                        <Helmet>
                            <title>
                            {detailData.name ? detailData.name : detailData.original_name}
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
                        <style.Poster_Title>{detailData?.name}</style.Poster_Title>
                        <style.Poster_MiniTitle>{detailData?.name}</style.Poster_MiniTitle>
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
                        <style.Poster_overview>
                            {detailData?.overview === ""
                            ? "There is no overview."
                            : detailData?.overview}
                        </style.Poster_overview>
                        <style.Poster_acter_and_director>
                            <style.Poster_actor>
                            <span>Casting:</span>
                            {actor?.length === 0
                                ? "No casting information."
                                : actor?.map(cast => (
                                    <div key={cast.id}> {cast.name},</div>
                                ))}
                            </style.Poster_actor>
                            <style.Poster_director>
                            <span>
                                {production?.known_for_department === "Production"
                                ? "Production:"
                                : production?.known_for_department === "Directing"
                                ? "Director:"
                                : null}
                            </span>
                            {production?.known_for_department === "Production"
                                ? production.name
                                : production?.known_for_department === "Directing"
                                ? production.name
                                : null}
                            </style.Poster_director>
                        </style.Poster_acter_and_director>
                        </style.Poster_infomation_bottom>
                    </style.Modal>
                </>
            )}
        </>
    );
}

export default SeriesDetail;

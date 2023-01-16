import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import * as style from "../styles/style";
import { makeImagePath } from "../../Utils/util";
import { IGetCredit, IGetDetail, getSeriesCredit, getSeriesDetail } from "../../Api/api";

/**
 * @description 시리즈(tv) 상세 모달창
 */

interface IDetailProps {
    category?: string;
    tv_id: string;
}

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

function SeriesDetail({ category, tv_id }: IDetailProps) {
    const navigate = useNavigate();
    const {
        data: detailData,
        isLoading: detailLoading,
        refetch: refetchDetail,
    } = useQuery<IGetDetail>(["Series_detail", `${tv_id}_detail`], () =>
        getSeriesDetail(tv_id)
    );
    const {
        data: creditData,
        isLoading: creditLoading,
        refetch: refetchCredit,
    } = useQuery<IGetCredit>(["Series_credit", `${tv_id}_credit`], () =>
        getSeriesCredit(tv_id)
    );

    const actor = creditData?.cast.slice(0, 5);
    const production = creditData?.crew.find(
        people =>
        people.known_for_department === "Production" ||
        people.known_for_department === "Directing"
    );
    const subOpenday = detailData?.first_air_date.substring(0, 4);

    useEffect(() => {
        refetchDetail();
    }, [tv_id, refetchDetail, refetchCredit]); 

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
                            <style.PosterTitle>{detailData?.name}</style.PosterTitle>
                            <style.PosterMiniTitle>{detailData?.name}</style.PosterMiniTitle>
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
                                    {detailData?.vote_average
                                    ? (detailData?.vote_average).toFixed(1)
                                    : "평점 투표 정보가 없습니다."}
                                </span>
                            </style.PosterInfomation>
                            <style.PosterBox>
                                <style.PosterOverview>
                                    {detailData?.overview === ""
                                    ? "There is no overview."
                                    : detailData?.overview}
                                </style.PosterOverview>
                                <style.PosterStaff>
                                    <style.PosterActor>
                                    <span>Casting:</span>
                                    {actor?.length === 0
                                        ? "No casting information."
                                        : actor?.map(cast => (
                                            <div key={cast.id}> {cast.name},</div>
                                        ))}
                                    </style.PosterActor>
                                    <style.PosterDirector>
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

export default SeriesDetail;

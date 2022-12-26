import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import * as M from "../../styled-components/StyledModal";
import { makeImagePath } from "../../utils/utils";
import { IGetSearch } from "../../apis/SearchApi";
import * as S from "../../styled-components/StyledSearch";
import { useState } from "react";

interface ISeriesprops {
  keyword: string;
  tvData: IGetSearch;
}

function SearchSeries({ tvData, keyword }: ISeriesprops) {
  const navigate = useNavigate();
  const [s_Id, sets_Id] = useState<number>();

  const seiresClick = (tv_id: number) =>
    navigate(`/search/tv/${tv_id}?keyword=${keyword}`);
  const seiresMatch: PathMatch<string> | null = useMatch(
    "/search/tv/:tv_id:keyword"
  );

  const onIdtarget = (id: number) => {
    sets_Id(id);
  };
  const Sdata = tvData?.results.find(item => item.id === s_Id);
  const sub_Openday = Sdata?.first_air_date?.substring(0, 4);

  return (
    <>
      <S.Searching_Title>
        <span>📺</span>Series
      </S.Searching_Title>
      <S.SearchRow_series>
        {tvData?.results.map(data => (
          <S.RowBox
            onClick={() => {
              onIdtarget(data.id);
              seiresClick(data.id);
            }}
            variants={S.BoxHoverVariants}
            initial="initial"
            whileHover="hover"
            transition={{ type: "tween" }}
            bgphoto={makeImagePath(
              data.backdrop_path || data.poster_path,
              "w500"
            )}
            key={`seireis-${data.id}`}
          >
            <S.RowBox_Info variants={S.infoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </S.RowBox_Info>
          </S.RowBox>
        ))}
      </S.SearchRow_series>

      {seiresMatch ? (
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
                Sdata?.backdrop_path
                  ? makeImagePath(Sdata.backdrop_path + "", "w500")
                  : Sdata?.poster_path
                  ? makeImagePath(Sdata.poster_path + "", "w500")
                  : null
              }
            />
            <M.Poster_prevBtn onClick={() => navigate(-1)}>✕</M.Poster_prevBtn>
            <M.Poster_Title>
              {Sdata?.name ? Sdata.name : Sdata?.title}
            </M.Poster_Title>
            <S.Search_OriginTitle>
              {Sdata?.original_title ? Sdata?.original_title : Sdata?.name}
            </S.Search_OriginTitle>
            <S.Search_MiniPoster
              bgphoto={makeImagePath(
                Sdata?.poster_path || Sdata!.backdrop_path,
                "w500"
              )}
            />
            <S.Search_infomation>
              <span>{sub_Openday ? sub_Openday : "No Data"}</span>
              <span>
                ⭐
                {Sdata?.vote_average
                  ? (Sdata?.vote_average).toFixed(1)
                  : "not vote"}
              </span>
              <S.Search_overview>
                {Sdata?.overview === ""
                  ? "There is no overview."
                  : Sdata?.overview}
              </S.Search_overview>
            </S.Search_infomation>
          </M.Modal>
        </>
      ) : null}
    </>
  );
}

export default SearchSeries;

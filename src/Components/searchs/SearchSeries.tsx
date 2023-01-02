import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import * as style from "../styles/style";
import { makeImagePath } from "../../Utils/util";
import { IGetSearch } from "../../Api/api";

import { useState } from "react";

interface ISeriesprops {
  keyword: string;
  tvData: IGetSearch;
}

function SearchSeries({ tvData, keyword }: ISeriesprops) {
  const navigate = useNavigate();
  const [s_Id, sets_Id] = useState<number>();

    
  const seiresClick = (tv_id: number) => {
    navigate(`/search/series/${tv_id}?keyword=${keyword}`);
  };
    
  const seiresMatch: PathMatch<string> | null = useMatch(
    "/search/series/:tv_id"
  );

  const onIdtarget = (id: number) => {
    sets_Id(id);
  };
  const Sdata = tvData?.results.find(item => item.id === s_Id);
  const sub_Openday = Sdata?.first_air_date?.substring(0, 4);

  return (
    <>
      <style.Searching_Title>
        <span>📺</span>Series
      </style.Searching_Title>
      <style.SearchRow_series>
        {tvData?.results.map(data => (
          <style.RowBox
            onClick={() => {
              onIdtarget(data.id);
              seiresClick(data.id);
            }}
            variants={style.BoxHoverVariants}
            initial="initial"
            whileHover="hover"
            transition={{ type: "tween" }}
            bgphoto={makeImagePath(
              data.backdrop_path || data.poster_path,
              "w500"
            )}
            key={`seireis-${data.id}`}
          >
            <style.RowBox_Info variants={style.infoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </style.RowBox_Info>
          </style.RowBox>
        ))}
      </style.SearchRow_series>

      {seiresMatch ? (
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
                Sdata?.backdrop_path
                  ? makeImagePath(Sdata.backdrop_path + "", "w500")
                  : Sdata?.poster_path
                  ? makeImagePath(Sdata.poster_path + "", "w500")
                  : null
              }
            />
            <style.Poster_prevBtn onClick={() => navigate(-1)}>✕</style.Poster_prevBtn>
            <style.Poster_Title>
              {Sdata?.name ? Sdata.name : Sdata?.title}
            </style.Poster_Title>
            <style.Search_OriginTitle>
              {Sdata?.original_title ? Sdata?.original_title : Sdata?.name}
            </style.Search_OriginTitle>
            <style.Search_MiniPoster
              bgphoto={makeImagePath(
                Sdata?.poster_path || Sdata!.backdrop_path,
                "w500"
              )}
            />
            <style.Search_infomation>
              <span>{sub_Openday ? sub_Openday : "No Data"}</span>
              <span>
                ⭐
                {Sdata?.vote_average
                  ? (Sdata?.vote_average).toFixed(1)
                  : "not vote"}
              </span>
              <style.Search_overview>
                {Sdata?.overview === ""
                  ? "There is no overview."
                  : Sdata?.overview}
              </style.Search_overview>
            </style.Search_infomation>
          </style.Modal>
        </>
      ) : null}
    </>
  );
}

export default SearchSeries;

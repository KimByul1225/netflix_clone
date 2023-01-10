import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import * as style from "../styles/style";
import { makeImagePath } from "../../Utils/util";
import { IGetSearch } from "../../Api/api";
import SeriesDetail from "../series/SeriesDetail";

interface ISeriesprops {
  keyword: string;
  tvData: IGetSearch;
}

function SearchSeries({ tvData, keyword }: ISeriesprops) {
  const navigate = useNavigate();
  const seiresClick = (tv_id: number) => {
    navigate(`/search/series/${tv_id}?keyword=${keyword}`);
  };
  const seiresMatch: PathMatch<string> | null = useMatch(
    "/search/series/:tv_id"
  );


  return (
    <>
      <style.SearchingTitle>
        <i>🎞</i> 
        <span>Series</span>
      </style.SearchingTitle>
      <style.SearchRow_series>
        {tvData?.results.map(data => (
          <style.SearchRowBox
            onClick={() => seiresClick(data.id)}
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
            <style.RowBoxInfo variants={style.infoVariants}>
              <h4>{data.title ? data.title : data.name}</h4>
            </style.RowBoxInfo>
          </style.SearchRowBox>
        ))}
      </style.SearchRow_series>

      {
        seiresMatch ? 
          <SeriesDetail tv_id={seiresMatch.params.tv_id!} />
        : 
          null
      }
    </>
  );
}

export default SearchSeries;

import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { getSearchMovie, getSearchTv, IGetSearch } from "../Api/api";
import SearchMovie from "../Components/searchs/SearchMovie";
import SearchSeries from "../Components/searchs/SearchSeries";

import * as style from "../Components/styles/style";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: movie_Data, refetch: movie_refetch } = useQuery<IGetSearch>(
    ["search", "movie"],
    () => getSearchMovie(keyword!),
    { enabled: !!keyword }
  );

  const { data: tv_Data, refetch: tv_refetch } = useQuery<IGetSearch>(
    ["search", "tv"],
    () => getSearchTv(keyword!),
    {
      enabled: !!keyword,
    }
  );



  useEffect(() => {
    movie_refetch();
    tv_refetch();
  }, [keyword, movie_refetch, tv_refetch]);
  
  const movieCount = movie_Data ?  movie_Data?.results.length : 0;
  const tvCount = tv_Data ?  tv_Data?.results.length : 0;
  const totalCount = movieCount +  tvCount;
 
  
  
  return (
    <>
      <style.SearchWrapper>
        <Helmet>
          <title>Search</title>
        </Helmet>
        {keyword === null ? 
          <></>
        : 
          totalCount === 0  ?
            <style.NotingWrap>
              <div>검색결과가 없습니다.</div>
              <div>
                검색창에서 다시 검색해주세요.
              </div>
            </style.NotingWrap>
          :
            <style.Searching>
              <style.SearchingResult>
                <b>" {keyword} "</b>로 검색한 결과 입니다.
              </style.SearchingResult>
              <style.SearchingCount>
                총 <b>{totalCount}</b> 건의 검색 결과가 검색 되었습니다.
              </style.SearchingCount>
              {/* 검색 결과 */}
              <SearchMovie keyword={keyword} movieData={movie_Data!} />
              <SearchSeries keyword={keyword} tvData={tv_Data!} />
            </style.Searching>
        }
      </style.SearchWrapper>
    </>
  );
}

export default Search;

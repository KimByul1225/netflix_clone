import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { getSearchMovie, getSearchTv, IGetSearch } from "../apis/SearchApi";
import SearchMovie from "../Components/Searchs/SearchMovie";
import SearchSeries from "../Components/Searchs/SearchSeries";
import * as S from "../styled-components/StyledSearch";

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

  // keyword가 변경될 때만 movie_refetch()와 tv_refetch()가 실행될 수 있도록
  useEffect(() => {
    movie_refetch();
    tv_refetch();
  }, [keyword, movie_refetch, tv_refetch]);

  return (
    <>
      <S.Wrapper>
        <Helmet>
          <title>Neonflix - Search</title>
        </Helmet>
        {keyword === null ? (
          <S.Notingdiv>
            <div>No search results found.</div>
            <div>
              Click the magnifying glass icon in the upper right to search!
            </div>
          </S.Notingdiv>
        ) : (
          // 검색 후
          <S.Searching>
            <S.Title>
              Result of searching with <span>{keyword}</span>
            </S.Title>
            {/* 검색 결과 */}
            <SearchMovie keyword={keyword} movieData={movie_Data!} />
            <SearchSeries keyword={keyword} tvData={tv_Data!} />
          </S.Searching>
        )}
      </S.Wrapper>
    </>
  );
}

export default Search;

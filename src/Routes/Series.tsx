import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import * as style from "../Components/styles/style";
import { makeImagePath } from "../Utils/util";
import SeriesSlider from "../Components/series/SeriesSlider";
import { getSeries, IGetResult } from "../Api/api";
import { useNavigate } from "react-router-dom";

/**
 * @description 시리즈 페이지
 */

function Series() {
  const navigate = useNavigate();
  const { data: pop_data, isLoading: pop_Loading } = useQuery<IGetResult>(
    ["tv", "popular"],
    () => getSeries("popular")
  );

  const { data: top_data, isLoading: top_Loading } = useQuery<IGetResult>(
    ["tv", "topRated"],
    () => getSeries("top_rated")
  );

  const { data: on_data, isLoading: on_Loading } = useQuery<IGetResult>(
    ["tv", "ontheair"],
    () => getSeries("on_the_air")
  );

  const imagePath = pop_data?.results[0].backdrop_path ? pop_data?.results[0].backdrop_path : pop_data?.results[0].poster_path;

  const nowId = pop_data?.results[0].id;
  return (
    <style.Wrapper>
      {pop_Loading && top_Loading && on_Loading ? (
        <style.Loader>Loading...</style.Loader>
      ) : (
        <>
          <Helmet>
            <title>Series</title>
          </Helmet>
          <style.Banner bgphoto={makeImagePath(imagePath || "")}>
            <style.TitleOverviewWrap>
              <style.BannerTitle>{pop_data?.results[0].name}</style.BannerTitle>
              <style.Overview>{pop_data?.results[0].overview}</style.Overview>
              <style.BtnContainer>
                <style.PlayBtn>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Play
                </style.PlayBtn>
                <style.InfoBtn onClick={() => navigate(`/series/${nowId}`)}>
                  ⓘ Information
                </style.InfoBtn>
              </style.BtnContainer>
            </style.TitleOverviewWrap>
          </style.Banner>
          <SeriesSlider
            category="on_the_air"
            title="On the Air"
            data={on_data}
          />
          <SeriesSlider
            category="top_rated"
            title="High Rated"
            data={top_data}
          />
          <SeriesSlider
            category="popular"
            title="Trending Now"
            data={pop_data}
          />
        </>
      )}
    </style.Wrapper>
  );
}

export default Series;

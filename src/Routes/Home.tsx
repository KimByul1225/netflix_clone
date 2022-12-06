import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetResult } from "../Api/api";

import * as style from "../Components/styles/style";

import MovieSlider from "../Components/movies/MovieSlider";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { makeImagePath } from "../Utils/util";

function Home() {
    // Nowplaying API
    const { data: now_data, isLoading: now_Loading } = useQuery<IGetResult>(
        ["movies", "now"],
        () => getMovies("now_playing")
    );

    // Popular(Trending Now) API
    const { data: pop_data, isLoading: pop_Loading } = useQuery<IGetResult>(
        ["movies", "popular"],
        () => getMovies("popular")
    );

    // Top Rated(High Rated) API
    const { data: top_data, isLoading: top_Loading } = useQuery<IGetResult>(
        ["movies", "top"],
        () => getMovies("top_rated")
    );

    // Top Rated(High Rated) API
    const { data: up_data, isLoading: up_Loading } = useQuery<IGetResult>(
        ["movies", "upcoming"],
        () => getMovies("upcoming")
    );

    // 배너 info > 모달 띄우는 버튼
    const navigate = useNavigate();
    const nowId = now_data?.results[0].id;

    return (
        <style.Wrapper>
        {now_Loading && pop_Loading && top_Loading && up_Loading ? (
            <style.Loader>Loaidng...</style.Loader>
        ) : (
            <>
            <Helmet>
                <title>Neonflix - Movie</title>
            </Helmet>
            {/* -- 배너 영역 --  */}
            <style.Banner
                bgphoto={makeImagePath(now_data?.results[0].backdrop_path || "")}
            >
                <style.Title_and_Overview>
                <style.Title>{now_data?.results[0].title}</style.Title>
                <style.Overview>{now_data?.results[0].overview}</style.Overview>
                <style.Btn_Container>
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
                    <style.InfoBtn onClick={() => navigate(`/movies/${nowId}`)}>
                  ⓘ Information
                </style.InfoBtn>
                </style.Btn_Container>
                </style.Title_and_Overview>
            </style.Banner>
            {/* -- 슬라이드 영역 -- */}
            <MovieSlider
                category="now_playing"
                title="Now Playing"
                data={now_data}
            />
            <MovieSlider
                category="top_rated"
                title="High Rated"
                data={top_data}
            />
            <MovieSlider
                category="popular"
                title="Trending Now"
                data={pop_data}
            />
            <MovieSlider category="upcoming" title="Coming soon" data={up_data} />
            </>
        )}
        <style.Footer>© Copyright 2023. ToyProject All rights reserved.</style.Footer>
        </style.Wrapper>
    );
}

export default Home;

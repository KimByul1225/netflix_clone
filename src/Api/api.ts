const API_KEY = "ebbf66e74bb3cfe2fa2f94d37ab8ebb5";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IResult {
    id: number;
    backdrop_path: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: string;
    name: string;
    title?: string;
}

export interface IGetResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IResult[];
    total_pages: number;
    total_results: number;
}

export interface IGetDetail {
    id: number;
    backdrop_path: string;
    poster_path: string;

    overview: string;
    vote_average: number;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    title: string;
    original_title?: string;
    name: string;
    original_name?: string;
    first_air_date: string;
    release_date: string;
}

export interface IGetCredit {
    id: number;
    cast: [
        {
            id: number;
            name: string;
            original_name: string;
            character: string;
        }
    ];
    crew: [
        {
            id: number;
            known_for_department: string;
            name: string;
        }
    ];
}

export interface ISearchResult {
    id: number;
    name?: string;
    title?: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    original_title: string;
    release_date?: string; 
    first_air_date?: string;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    
}

export interface IGetSearch {
    page: number;
    results: ISearchResult[];
    total_pages: number;
    total_results: number;
    dates: string;
    


}

export function getMovies(category: string) {
    return fetch(
        `${BASE_PATH}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
    ).then(response => {
        return response.json();
    });
}

export function getMovieDetail(id: string) {
    return fetch(
        `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=en-US`
    ).then(response => {
        return response.json();
    });
}

export function getMovieCredit(id: string) {
    return fetch(
        `${BASE_PATH}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    ).then(response => {
        return response.json();
    });
}

export function getSeries(tvCategory: string) {
    return fetch(
        `${BASE_PATH}/tv/${tvCategory}?api_key=${API_KEY}&language=en-US&page=1`
    ).then(response => {
        return response.json();
    });
}

export function getSeriesDetail(tv_id: string) {
    return fetch(
        `${BASE_PATH}/tv/${tv_id}?api_key=${API_KEY}&language=en-US`
    ).then(response => {
        return response.json();
    });
}

export function getSeriesCredit(tv_id: string) {
    return fetch(
        `${BASE_PATH}/tv/${tv_id}/credits?api_key=${API_KEY}&language=en-US`
    ).then(response => {
        return response.json();
    });
}


export function getSearchMovie(keyword: string) {
    return fetch(
        `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
    ).then(response => {
        return response.json();
    });
}

export function getSearchTv(keyword: string) {
    return fetch(
        `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    ).then(response => {
        return response.json();
    });
}


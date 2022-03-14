import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchMovie,
  getSearchTv,
  IGetMoviesResult,
  IGetTvResult,
} from "../api/api";
import MovieSlider from "../components/MovieSlider";
import TvSlider from "../components/TvSlider";

const Wrapper = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 250px;
`;

const Section = styled.div`
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
`;

const SectionTitle = styled.div`
  position: relative;
  padding-left: 20px;
  top: -120px;
  font-size: 30px;
  color: ${(props) => props.theme.white.lighter};
`;

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const searchMovie = useQuery<IGetMoviesResult>(["search", "movie"], () =>
    getSearchMovie(keyword)
  );

  const searchTv = useQuery<IGetTvResult>(["search", "tv"], () =>
    getSearchTv(keyword)
  );
  return (
    <>
      <Wrapper>
        <Section>
          <SectionTitle>Movies</SectionTitle>
          {searchMovie.data ? (
            <MovieSlider {...searchMovie.data}></MovieSlider>
          ) : null}
        </Section>
        <Section>
          <SectionTitle>Tv Shows</SectionTitle>
          {searchTv.data ? <TvSlider {...searchTv.data}></TvSlider> : null}
        </Section>
      </Wrapper>
    </>
  );
};

export default Search;

import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getLatestMovie,
  getNowPlayingMovies,
  getTopReatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IMovie,
} from "../api/api";
import { makeImagePath } from "../api/utilities";
import MovieSlider from "../components/MovieSlider";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
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

const Movie = () => {
  const latestMovie = useQuery<IMovie>(["movies", "latest"], getLatestMovie);
  const nowPlayingMovies = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  const topRatedMovies = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopReatedMovies
  );
  const upcomingMovies = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  return (
    <Wrapper>
      {latestMovie.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              latestMovie.data?.backdrop_path
                ? latestMovie.data.backdrop_path
                : latestMovie.data?.poster_path || ""
            )}
          >
            <Title>{latestMovie.data?.title}</Title>
            <Overview>{latestMovie.data?.overview}</Overview>
          </Banner>

          <Section>
            <SectionTitle>Now Playing</SectionTitle>
            {nowPlayingMovies.data ? (
              <MovieSlider {...nowPlayingMovies.data} />
            ) : null}
          </Section>

          <Section>
            <SectionTitle>Top Rated</SectionTitle>
            {topRatedMovies.data ? (
              <MovieSlider {...topRatedMovies.data} />
            ) : null}
          </Section>

          <Section>
            <SectionTitle>Upcoming</SectionTitle>
            {upcomingMovies.data ? (
              <MovieSlider {...upcomingMovies.data} />
            ) : null}
          </Section>
        </>
      )}
    </Wrapper>
  );
};

export default Movie;

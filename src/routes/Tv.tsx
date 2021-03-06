import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTv,
  getLatestTv,
  getPopularTv,
  getTopRatedTv,
  IGetTvResult,
  ITv,
} from "../api/api";
import { makeImagePath } from "../api/utilities";
import TvSlider from "../components/TvSlider";

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

const Tv = () => {
  const latestTvShow = useQuery<ITv>(["tvShows", "latest"], getLatestTv);
  const airingTv = useQuery<IGetTvResult>(["tvShows", "airing"], getAiringTv);
  const PopularTv = useQuery<IGetTvResult>(
    ["tvShows", "popular"],
    getPopularTv
  );
  const topRatedTv = useQuery<IGetTvResult>(
    ["tvShows", "topRated"],
    getTopRatedTv
  );

  return (
    <Wrapper>
      {latestTvShow.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              latestTvShow.data?.backdrop_path
                ? latestTvShow.data.backdrop_path
                : latestTvShow.data?.poster_path || ""
            )}
          >
            <Title>{latestTvShow.data?.name}</Title>
            <Overview>{latestTvShow.data?.overview}</Overview>
          </Banner>

          <Section>
            <SectionTitle>On the Air</SectionTitle>
            {airingTv.data ? <TvSlider {...airingTv.data} /> : null}
          </Section>

          <Section>
            <SectionTitle>Popular</SectionTitle>
            {PopularTv.data ? <TvSlider {...PopularTv.data} /> : null}
          </Section>

          <Section>
            <SectionTitle>Top Rated</SectionTitle>
            {topRatedTv.data ? <TvSlider {...topRatedTv.data} /> : null}
          </Section>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;

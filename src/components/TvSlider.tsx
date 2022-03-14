import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetTvResult } from "../api/api";
import { makeImagePath } from "../api/utilities";

const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 150px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const NextButton = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  height: 200px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigTv = styled(motion.div)<{ scrollY: number }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: ${(props) => props.scrollY + 100}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 30px;
  font-size: 46px;
  position: relative;
  top: -100px;
`;

const BigOverview = styled.p`
  padding: 20px 30px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -100px;
`;

const rowVars = {
  hidden: {
    x: window.innerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth + 5,
  },
};

const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};

const offset = 6;

const TvSlider: React.FunctionComponent<IGetTvResult> = ({ results }) => {
  const navigate = useNavigate();
  const bigTvMatch = useMatch("tv/:tvId");
  const { scrollY } = useViewportScroll();

  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const incraseIndex = () => {
    if (results) {
      if (leaving) return;
      toggleLeaving();
      const totalTvs = results.length - 2;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxclicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };
  const onOverlayClick = () => navigate("/tv");

  const clickedTv =
    bigTvMatch?.params.tvId &&
    results.find((tv) => tv.id + "" === bigTvMatch.params.tvId);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <>
      <SliderWrapper>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            <NextButton onClick={incraseIndex}>&#10095;</NextButton>
            {results
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={tv.id + ""}
                  key={tv.id}
                  whileHover="hover"
                  variants={boxVars}
                  initial="normal"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxclicked(tv.id)}
                  bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                >
                  <Info variants={infoVars}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </SliderWrapper>
      <AnimatePresence>
        {bigTvMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            ></Overlay>
            <BigTv layoutId={bigTvMatch.params.tvId} scrollY={scrollY.get()}>
              {clickedTv && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedTv.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedTv.name}</BigTitle>
                  <BigOverview>{clickedTv.overview}</BigOverview>
                </>
              )}
            </BigTv>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default TvSlider;

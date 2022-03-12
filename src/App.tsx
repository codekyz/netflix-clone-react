import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  background-color: rgba(253, 167, 223, 1);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  margin-top: 50px;
  padding: 5px 10px;
  color: rgba(9, 132, 227, 1);
  border-radius: 3px;
  border: none;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonVars = {
  click: {
    scale: 1.3,
    color: "rgba(225, 112, 85, 1.0)",
    transition: { duration: 0.5 },
  },
};

const boxVars = {
  hover: {
    scale: 1.1,
  },
};

const circleVars = {
  start: { opacity: 0 },
  end: { opacity: 1 },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [isSwitch, setIsSwitch] = useState(false);

  return (
    <Wrapper>
      <AnimatePresence>
        <Grid>
          {[1, 2, 3, 4].map((n) => (
            <Box
              variants={boxVars}
              whileHover={n === 1 || n === 4 ? "hover" : ""}
              onClick={() => setId(n + "")}
              key={n}
              layoutId={n + ""}
              style={
                n === 1
                  ? { transformOrigin: "bottom right" }
                  : n === 4
                  ? { transformOrigin: "top left" }
                  : {}
              }
            >
              {n === 2 ? (
                <Circle variants={circleVars} layoutId="circle" />
              ) : isSwitch && n === 3 ? (
                <Circle variants={circleVars} layoutId="circle" />
              ) : null}
            </Box>
          ))}
          {/* <Circle layoutId="circle" /> */}
        </Grid>
        <Button
          variants={buttonVars}
          whileTap="click"
          onClick={() => setIsSwitch((prev) => !prev)}
        >
          Switch
        </Button>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Box layoutId={id} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;

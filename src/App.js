import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from "react";
import IdleKnightSprite from "./sprites/knight_idle_spritesheet.png";
import MoveKnightSprite from "./sprites/knight_run_spritesheet.png";
import IdleGoblinSprite from "./sprites/full_spritesheet.png";

import { levels } from "./levels";
const Game = styled.div`
  width: 500px;
  height: 500px;
  background-color: #333;
  position: relative;
  ${(props) => props.css}
`;

const PlayTile = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: url(${(props) => props.tile.img});
  background-repeat: no-repeat;
  background-size: 450px;
  background-position-x: -${(props) => props.tile.x}px;
  background-position-y: -${(props) => props.tile.y}px;
  opacity: ${(props) => {
    if (props.tile.type.includes("item")) {
      return props.tile.shouldRender ? 1 : 0;
    }
    return 1;
  }};
  transition: ${(props) => {
    if (props.tile.type.includes("item")) {
      return props.tile.shouldAnimate ? "opacity 0.3s ease-in 0.1s" : "none";
    }
    return "none";
  }};
  ${(props) => props.css}
`;
const FloorTile = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: url(${(props) => props.tile.img});
  background-repeat: no-repeat;
  background-size: 450px;
  background-position-x: -${(props) => props.tile.x}px;
  background-position-y: -${(props) => props.tile.y}px;
  ${(props) => props.css}
`;

const CharacterBase = styled.div`
  width: 50px;
  height: 50px;
  background: url(${(props) => props.spriteImg});
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: ${(props) =>
    props.characterAnimating
      ? "top 0.375s linear 0s, left 0.375s linear 0s"
      : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: -${(props) => props.spriteCount * 50}px;
  transform: scaleX(${(props) => (props.direction === "x" ? -1 : 1)});
  ${(props) => props.css}
`;
const GoblinBase = styled.div`
  width: 50px;
  height: 50px;
  background: url(${(props) => props.spriteImg});
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: ${(props) =>
    props.characterAnimating
      ? "top 0.375s linear 0s, left 0.375s linear 0s"
      : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: -${(props) => props.spriteCount * 50}px;
  transform: scaleX(${(props) => (props.direction === "x" ? -1 : 1)});
  ${(props) => props.css}
`;
const DebugCharacter = styled.div`
  width: fit-content;
  height: 25px;
  position: absolute;
  top: ${(props) => props.y + 50}px;
  left: ${(props) => props.x}px;
  background: #ffffff99;
  border-radius: 4px;
  padding: 8px;
  z-index: 9001;
`;

function Goblin(props) {
  const [spriteCount, setSpriteCount] = useState(0);
  const [spriteImg, setSpriteImg] = useState(IdleGoblinSprite);
  const prevProps = useRef(null);
}

function Character(props) {
  const [spriteCount, setSpriteCount] = useState(0);
  const [spriteImg, setSpriteImg] = useState(IdleKnightSprite);
  const [direction, setDirection] = useState("x");
  const prevProps = useRef(null);

  useEffect(() => {
    const handle = setTimeout(() => {
      setSpriteCount(spriteCount >= 5 ? 0 : spriteCount + 1);
    }, 75);
    return () => clearTimeout(handle);
  });
  useEffect(() => {
    const { x: pLeft } = prevProps.current || {};
    if (pLeft < props.x) {
      return setDirection("right");
    }
    setDirection("x");
  }, [props.x]);
  useEffect(() => {
    setSpriteImg(MoveKnightSprite);
  }, [props.y, props.x]);
  useEffect(() => {
    let handle = 0;
    if (spriteImg !== IdleKnightSprite) {
      handle = setTimeout(() => {
        setSpriteImg(IdleKnightSprite);
      }, 375);
    }
    return () => clearTimeout(handle);
  }, [spriteImg]);
  useEffect(() => {
    prevProps.current = props;
  }, [props]);
  return (
    <>
      <CharacterBase
        {...props}
        direction={direction}
        spriteCount={spriteCount}
        spriteImg={spriteImg}
      />
      {/* <GoblinBase {...props} spriteCount={spriteCount} spriteImg={spriteImg} /> */}
      {props.debug ? (
        <DebugCharacter {...props}>
          ({props.x},{props.y})
        </DebugCharacter>
      ) : null}
    </>
  );
}

function detectCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }
}
const initState = {
  x: 400,
  y: 100,
  level: "levelOne",
  characterAnimating: true,
  inventory: [],
  characterJournal: {
    levelOne: {},
    levelTwo: {},
    levelThree: {}
  }
};
function reducer(state, { type, payload }) {
  console.log(payload);

  switch (type) {
    case "CHANGE_LEVEL":
      return { ...state, ...payload };
    case "PLAYER_MOVE":
      return { ...state, ...payload };
    case "ADD_ITEM":
      return { ...state, inventory: [...state.inventory, payload] };
    case "ADD_CHARACTER_JOURNAL":
      return {
        ...state,
        characterJournal: { ...state.characterJournal, ...payload }
      };
    case "UPDATE_JOURNAL":
      return {
        ...state,
        characterJournal: {
          ...state.characterJournal,
          [payload.level]: {
            ...state.characterJournal[payload.level],
            ...payload.entries
          }
        }
      };
    default:
      console.log("dont know ", type);
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const initLevelJournal = useRef(null);
  const previousStateLevel = useRef(null);
  useEffect(() => {
    if (state.level !== previousStateLevel.current) {
      initLevelJournal.current = state.characterJournal[state.level];
    }
  }, [state.level, state.characterJournal]);
  useEffect(() => {
    previousStateLevel.current = state.level;
  }, [state.level]);

  const handleWASD = useCallback(() => {
    function handleKeyPress({ key }) {
      let intention = {};
      if (key === "w" && state.y > 0) {
        intention = { y: state.y - 50 };
      }
      if (key === "a" && state.x > 0) {
        intention = { x: state.x - 50 };
      }
      if (key === "s" && state.y < 450) {
        intention = { y: state.y + 50 };
      }
      if (key === "d" && state.x < 450) {
        intention = { x: state.x + 50 };
      }
      const player = {
        width: 50,
        height: 50,
        x: state.x,
        y: state.y,
        ...intention
      };
      if (
        levels[state.level].playTiles
          .filter((t) => !t.tile.passable)
          .some((playTile) => detectCollision(player, playTile))
      ) {
        return;
      }

      let postAction = null;

      levels[state.level].playTiles
        .filter((t) => t.tile.action || t.tile.actions)
        .filter((playTile) => detectCollision(player, playTile))
        .map((t) => {
          postAction = t.tile.action?.postAction ?? null;
          if (t.tile.actions) {
            return t.tile.actions.map((action) => dispatch(action));
          }
          return dispatch(t.tile.action);
        });

      levels[state.level].floorTiles
        .filter((t) => t.tile.action)
        .filter((playTile) => detectCollision(player, playTile))
        .map((t) => {
          postAction = t.tile.action?.postAction ?? null;
          return dispatch(t.tile.action);
        });

      if (!postAction) {
        dispatch({ type: "PLAYER_MOVE", payload: intention });
      } else {
        // todo we should clear timeout for safteys :P
        setTimeout(() => {
          dispatch(postAction);
        }, 100);
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [state, dispatch]);
  useEffect(handleWASD, [handleWASD]);
  useEffect(() => {
    if (!state.characterJournal[state.level]) {
      dispatch({
        type: "ADD_CHARACTER_JOURNAL",
        payload: {
          [state.level]: levels[state.level].characterJournal
        }
      });
    }
  }, [state.level]);
  const [gameState, setGameState] = useState(state);
  useEffect(() => {
    const handle = setTimeout(() => setGameState(state), 50);
    return () => clearInterval(handle);
  }, [state]);
  // const gameStateRef = useRef(state);
  return useMemo(
    () => (
      <Game>
        {levels[gameState.level].floorTiles.map((floor, i) => (
          <FloorTile key={i} {...floor} />
        ))}
        <Character
          y={gameState.y}
          x={gameState.x}
          characterAnimating={gameState.characterAnimating}
          debug={true}
        />
        {levels[gameState.level].playTiles
          .map((playTile) => ({
            ...playTile,
            tile: {
              ...playTile.tile,
              shouldAnimate:
                playTile.tile.shouldRender?.(initLevelJournal.current) ?? true,
              shouldRender:
                playTile.tile.shouldRender?.(
                  gameState.characterJournal[gameState.level]
                ) ?? true
            }
          }))
          .map((playTile, i) => (
            <PlayTile key={i} {...playTile} />
          ))}
      </Game>
    ),
    [gameState]
  );
}

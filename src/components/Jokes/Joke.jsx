import { Box, makeStyles, Typography } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import { ArrowDownward } from "@material-ui/icons";
import React, { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  joke: {
    display: "flex",
    borderBottom: "2px solid #eee",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 400,
    padding: "1rem",
  },
  jokeButtons: {
    display: "flex",
    marginRight: "1rem",
    justifyContent: "center",
    width: "15%",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: "2rem",
    margin: 10,
    cursor: "pointer",
  },
  votesLabel: {
    fontSize: 20,
  },
  jokeText: {
    width: "75%",
    fontSize: "1.2rem",
  },
  jokeEmoji: {
    fontSize: "3rem",
    marginLeft: "auto",
    borderRadius: "50%",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0,0, 0.1)",
  },
}));

const Joke = (props) => {
  const { votes, text, upvote, downvote } = props;
  const classes = useStyles();

  const getEmoji = useCallback((votes) => {
    if (votes >= 9) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 6) {
      return "em em-laughing";
    } else if (votes >= 3) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 0) {
      return "em em-neutral_face";
    } else {
      return "em em-angry";
    }
  }, []);

  return (
    <Box className={classes.joke}>
      <Box className={classes.jokeButtons}>
        <ArrowUpward
          className={classes.arrowIcon}
          onClick={() => {
            upvote();
          }}
        ></ArrowUpward>
        <Typography className={classes.votesLabel}>{votes}</Typography>
        <ArrowDownward
          className={classes.arrowIcon}
          onClick={() => {
            downvote();
          }}
        ></ArrowDownward>
      </Box>
      <Box className={classes.jokeText}>{text}</Box>
      <Box lassName={classes.jokeEmoji}>
        <i className={getEmoji(votes)} />
      </Box>
    </Box>
  );
};

export default Joke;

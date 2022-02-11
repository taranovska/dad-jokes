import React, { useCallback, useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Joke from "./Joke";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  jokesList: {
    display: "flex",
    width: "80%",
    height: "80%",
  },
  jokesListSideBar: {
    backgroundColor: "#baa1e7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0,0, 0.1)",
    zIndex: 2,
    borderRadius: 7,
  },
  jokesListTitle: {
    fontSize: "3rem",
    fontWeight: 700,
    margin: 60,
    letterSpacing: 0,
    color: "white",
  },
  sideBarImage: {
    width: "50%",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0,0, 0.1)",
    borderRadius: "50%",
  },
  jokeListJokes: {
    height: "90%",
    width: "70%",
    backgroundColor: "white",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0,0, 0.1)",
    alignSelf: "center",
    overflow: "scroll",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
}));

export default function JokesList() {
  const classes = useStyles();
  const [jokes, setJokes] = useState(null);

  async function getJokes() {
    let newJokes = [];

    for (let i = 1; i < 10; i++) {
      let res = axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      newJokes.push({ id: i, text: (await res).data.joke, votes: 0 });
    }
    setJokes(newJokes);
  }

  useEffect(() => {
    getJokes();
  }, []);

  const handleVote = useCallback(
    (id, offset) => {
      let filteredJokes = jokes.filter((joke) => joke.id !== id);
      let joke = jokes.find((joke) => joke.id === id);
      joke.votes += offset;
      filteredJokes.push(joke);
      filteredJokes.sort((a, b) => b.votes - a.votes);
      setJokes(filteredJokes);
    },
    [jokes, setJokes]
  );

  if (jokes) {
    return (
      <Box className={classes.jokesList}>
        <Box className={classes.jokesListSideBar}>
          <Typography className={classes.jokesListTitle}>
            Dad
            <br />
            Jokes
          </Typography>
          <img
            className={classes.sideBarImage}
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="dryicon"
          />
        </Box>
        <Box className={classes.jokeListJokes}>
          {jokes.map((joke) => {
            return (
              <Joke
                votes={joke.votes}
                text={joke.text}
                key={joke.id}
                upvote={() => {
                  handleVote(joke.id, 1);
                }}
                downvote={() => {
                  handleVote(joke.id, -1);
                }}
              ></Joke>
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

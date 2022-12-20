import { Button, Group } from "@skbkontur/react-ui";
import { useState } from "react";
import useSWR from "swr";
import { getListCards, updateCard } from "../api";
import styles from "./TrainingPage.module.css";

export const TrainingPage = () => {
  const { data } = useSWR("/getlist", getListCards);
  const [side, setSide] = useState<"front" | "back">("front");

  if (data == null) return <span>List is empty</span>;

  const handleCardClick = () => {
    setSide((prevState) => (prevState === "back" ? "front" : "back"));
  };

  const handleButtonClick = (mode: string) => {
    let repeatAfterDate;
    //todo: realize spaced repetition algorithm
    switch (mode) {
      case "forgot":
        repeatAfterDate = new Date().toISOString();
    }
    updateCard({ repeatAfterDate: new Date().toISOString() });
  };

  return (
    <div className={styles.root}>
      <div className={styles.card} onClick={handleCardClick}>
        {side === "back" ? data[0].original : data[0].translate}
      </div>
      <Group>
        <Button onClick={() => handleButtonClick("forgot")}>Forgot</Button>
        <Button onClick={() => handleButtonClick("hard")}>Hard</Button>
        <Button onClick={() => handleButtonClick("normal")}>Normal</Button>
        <Button onClick={() => handleButtonClick("easy")}>Easy</Button>
      </Group>
    </div>
  );
};

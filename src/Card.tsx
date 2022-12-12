import { Button } from "@skbkontur/react-ui";
import { useState } from "react";
import "./App.css";
import { ResponseType } from "./responseExample";

const apiUrl = "https://wrv6ojgvlg6d2b247hrvzdrv4y0zcybj.lambda-url.eu-north-1.on.aws/Production";

export function Card() {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");

  const doTranslate = () =>
    fetch(`${apiUrl}?word=${word}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((results: ResponseType["results"]) => {
        const firstEntry = results[0].lexicalEntries[0].entries[0];
        const audioUrl = firstEntry.pronunciations.find((p) => p.dialects[0] === "American English")?.audioFile;

        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audio.play();
        }

        let tr;
        try {
          tr = firstEntry.senses[0].translations;
        } catch (e) {}

        if (tr) {
          setTranslate(tr[0].text);
        }
      });
  return (
    <>
      <div className="Card">
        <input className="Textarea" value={word} onChange={(e) => setWord(e.target.value)} />
      </div>
      <div className="Card">{translate}</div>
      <Button onClick={doTranslate}>Translate</Button>
    </>
  );
}

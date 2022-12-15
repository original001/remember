import { Button } from "@skbkontur/react-ui";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { createCard, getTranslation } from "../api";
import { Sense, TranslationResult } from "../types";
import classnames from "classnames";
import useDebounce from "../useDebounce";
import useSWR from "swr";

export function CardPage() {
  const [word, setWord] = useState("");
  const debouncedSearch = useDebounce(word, 300);

  const [chosenSense, setSense] = useState<Sense | undefined>();

  const { data: results, isLoading } = useSWR(`?word=${debouncedSearch}`, getTranslation, { revalidateOnFocus: false });

  const audioUrl = results?.[0].lexicalEntries[0].entries[0].pronunciations?.find(
    (p) => p.dialects[0] === "American English"
  )?.audioFile;

  const handleCreateCard = () =>
    createCard({
      original: word,
      translate: chosenSense?.translations?.[0].text || "",
      example: chosenSense?.examples?.[0].text,
      pronounceUrl: audioUrl,
    });

  useEffect(() => {
    if (results == null) return;

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }

    setSense(results[0].lexicalEntries[0].entries[0].senses[0]);
  }, [results]);

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.card}>
          <input
            placeholder="Type here"
            className={styles.textarea}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <div className={styles.card}>
          {isLoading && (
            <span>Loading...</span>
          )}
          {!isLoading && results?.length !== 0 && word !== "" && chosenSense && (
            <>
              <div className={styles.main}>{chosenSense.translations?.[0].text}</div>
              <div className={styles.note}>{chosenSense.examples?.[0].text}</div>
            </>
          )}
        </div>
        <div style={{ height: 30 }}></div>
        <Button size="large" use="primary" onClick={handleCreateCard}>
          Create
        </Button>
      </div>
      <div className={styles.right}>
        <div>Oxford Dictionary</div>
        <div style={{ height: 30 }}></div>
        {results?.length &&
          word !== "" &&
          results.map((result, resultIndex) => (
            <div key={resultIndex} className={styles.resultGroup}>
              {result.lexicalEntries.map((entry, entryIndex) => (
                <div key={entryIndex}>
                  <div className={styles.lexicalCategory}>{entry.lexicalCategory.text}</div>
                  {entry.entries[0].senses.map((sense) => (
                    <div
                      key={sense.id}
                      className={classnames(styles.dictItem, chosenSense?.id === sense.id && styles.active)}
                      onClick={() => setSense(sense)}
                    >
                      <div className={styles.dictItemTranslate}>
                        {sense.translations?.map((tr) => tr.text).join(", ")}
                      </div>
                      {sense.examples && <div className={styles.dictItemExample}>{sense.examples[0].text}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

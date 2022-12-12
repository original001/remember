import { Button } from "@skbkontur/react-ui";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { createCard, getTranslation } from "../api";
import { LexicalEntry, TranslationResult } from "../types";

export function CardPage() {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [results, setResults] = useState<TranslationResult[]>([]);

  const handleCreateCard = () =>
    createCard({
      original: word,
      translate,
      // example: results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text,
      pronounceUrl: results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile,
    });

  useEffect(() => {
    if (!word) return;

    getTranslation(word).then((data) => {
      setResults(data);
      const firstEntry = data[0].lexicalEntries[0].entries[0];
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
  }, [word]);
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
        <div className={styles.card}>{translate}</div>
        <div style={{ height: 30 }}></div>
        <Button size="large" use="primary" onClick={handleCreateCard}>
          Create
        </Button>
      </div>
      <div className={styles.right}>
        <div>Oxford Dictionary</div>
        <div style={{height: 30}}></div>
        {results.length &&
          results.map((result) => (
            <div className={styles.resultGroup}>
              {result.lexicalEntries.map((entry) => (
                <div>
                  <div className={styles.lexicalCategory}>{entry.lexicalCategory.text}</div>
                  {entry.entries[0].senses.map((sense) => (
                    <div className={styles.dictItem}>
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

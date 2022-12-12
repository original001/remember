import { Button } from "@skbkontur/react-ui";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { createCard, getTranslation } from "../api";
import { LexicalEntry, TranslationResult } from "../types";
import classnames from "classnames";

export function CardPage() {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [results, setResults] = useState<TranslationResult[]>([]);
  const [chosenSense, setSense] = useState<[number, number, string]>([0, 0, ""]);

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

  const [resultIndex, entryIndex, senseId] = chosenSense;
  const getTranslationText = () => {
    if (results.length === 0) {
      return "";
    }
    const senses = results[resultIndex].lexicalEntries[entryIndex].entries[0].senses;
    const chosenSense = senses.find((s) => s.id === senseId);
    if (chosenSense && chosenSense.translations) {
      return chosenSense.translations.map((tr) => tr.text).join(", ");
    }
    return "";
  };

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
        <div className={styles.card}>{getTranslationText()}</div>
        <div style={{ height: 30 }}></div>
        <Button size="large" use="primary" onClick={handleCreateCard}>
          Create
        </Button>
      </div>
      <div className={styles.right}>
        <div>Oxford Dictionary</div>
        <div style={{ height: 30 }}></div>
        {results.length &&
          results.map((result, resultIndex) => (
            <div className={styles.resultGroup}>
              {result.lexicalEntries.map((entry, entryIndex) => (
                <div>
                  <div className={styles.lexicalCategory}>{entry.lexicalCategory.text}</div>
                  {entry.entries[0].senses.map((sense) => (
                    <div
                      className={classnames(styles.dictItem, chosenSense[2] === sense.id && styles.active)}
                      onClick={() => setSense([resultIndex, entryIndex, sense.id])}
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

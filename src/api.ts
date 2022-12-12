import { TranslationResult } from "./types";

const apiUrl = "https://wrv6ojgvlg6d2b247hrvzdrv4y0zcybj.lambda-url.eu-north-1.on.aws/Production";

interface Card {
  original: string;
  translate: string;
  example?: string;
  imgUrl?: string;
  pronounceUrl?: string;
  note?: string;
}

export const getTranslation = (word: string) =>
  fetch(`${apiUrl}?word=${word}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((results: TranslationResult[]) => results);

export const createCard = (card: Card) => {
  fetch(`/create`, {
    method: "POST",
    body: JSON.stringify(card),
  });
};

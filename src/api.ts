import { TranslationResult } from "./types";

const apiUrl = "https://wrv6ojgvlg6d2b247hrvzdrv4y0zcybj.lambda-url.eu-north-1.on.aws/Production";

export interface Card {
  original: string;
  translate: string;
  repeatAfterDate: string;
  example?: string;
  imgUrl?: string;
  pronounceUrl?: string;
  note?: string;
}

export const getTranslation = (url: string) =>
  fetch(`${apiUrl}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((results: TranslationResult[]) => results);

export const createCard = (card: Card) => {
  fetch(`/create`, {
    method: "PUT",
    body: JSON.stringify(card),
  });
};

export const updateCard = (card: Partial<Card>) => {
  fetch(`/update`, {
    method: "POST",
    body: JSON.stringify(card),
  });
};

export const getListCards = (listUrl: string) => {
  return fetch(listUrl, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((res: Card[]) => res);
};

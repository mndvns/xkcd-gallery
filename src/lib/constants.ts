import ALL_COMICS from "./comics.json";
import type { Comic, XkcdJson } from "./types";

export const COMICS: Comic[] = ALL_COMICS.map((comic: XkcdJson) => {
  return {
    num: comic.num,
    img: comic.img,
    // Switch alt and title, they're backwards
    alt: comic.title,
    title: comic.alt,
    year: comic.year,
  }
});

export const COMICS_PER_PAGE = 9;

export const COMIC_PAGES_TOTAL = Math.ceil(ALL_COMICS.length - 1 / 5);

import { COMICS, COMICS_PER_PAGE } from "$lib/constants";
import type { Comic } from "$lib/types.js";

export const load = async (params) => {
  const comics: Comic[] = [];

  // If random querystring param is present, randomize comics. No pagination.
  const randomUrlParam = params.url.searchParams.get("random");
  const random = randomUrlParam ? parseInt(randomUrlParam) : null;
  if (random) {
    while (comics.length < COMICS_PER_PAGE) {
      const index = (random * (comics.length + 1)) % COMICS.length;
      const comic = COMICS[index];
      comics.push(comic);
    }
    return {
      random: true,
      comics
    }
  }

  // If search querystring param is present, filter comics. No pagination.
  const searchUrlParam = params.url.searchParams.get("search");
  const search = searchUrlParam || null;
  if (search) {
    const searchre = new RegExp(search, "i");
    for (let comic of COMICS) {
      if (searchre.test(comic.title)
        || searchre.test(comic.alt)
        || searchre.test(comic.year)) {
        comics.push(comic);
      }
    }
    return {
      search,
      comics: comics.filter((comic) => comic)
    };
  }

  // Resolve pages and pagination details
  const pageUrlParam = params.url.searchParams.get("page");
  const page = pageUrlParam ? parseInt(pageUrlParam) : null;
  const pages_length = Math.ceil(COMICS.length / COMICS_PER_PAGE);
  const current_page = page == null ? pages_length : page;
  const pages = Array(pages_length)
    .fill(0)
    .map((_, i) => i + 1)
    .slice(
      Math.max(0, Math.min(current_page - 3, pages_length - 5)),
      Math.max(5, Math.max(current_page + 2, 1))
    );
  while (comics.length < COMICS_PER_PAGE) {
    const index = (current_page * COMICS_PER_PAGE) - comics.length - 1;
    const comic = COMICS[index];
    comics.push(comic);
  }
  return {
    pages,
    pages_length,
    current_page,
    comics: comics.filter((comic) => comic)
  };
};

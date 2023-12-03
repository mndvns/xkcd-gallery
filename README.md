# xkcd-gallery

This is a simple SvelteKit demo project: a scraper and searchable gallery for XKCD.

## Features

- Pagination with keybindings (left/right arrows)
- Search comics by title, alt text, or year
- User state stored in URL
- Comic JSON fetched at build time

## Running locally

Ensure prerequisite programs are installed
- `node` and `npm`
- `just`
- `jq`

Fetch the project and install dependencies
```
git clone mndvns/xkcd-gallery
cd xkcd-gallery
npm i
```

Fetch the latest comics and output to a single JSON file
```
just sync-comics
```

Run development server
```
npm run dev
```

## License

MIT

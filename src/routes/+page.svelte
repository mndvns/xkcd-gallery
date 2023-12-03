<script	lang="ts" context="module">
  export function pageToHref(page: number) {
    return `/?page=${page}`;
  }
  export function gotoPage(page: number) {
    navigation.goto(pageToHref(page), { replaceState: true });
  }
</script>

<script	lang="ts">
  import * as navigation from "$app/navigation";
  import Pagination from "./Pagination.svelte";
  import SearchInput from "./SearchInput.svelte";
  import Comics from "./Comics.svelte";
  import type { PageData } from './$types';

  export let data: PageData;
  $: random = data.random;
  $: search = data.search;
  $: comics = data.comics;
  $: pages = data.pages;
  $: pages_length = data.pages_length || 1;
  $: current_page = data.current_page || 1;

  function onkeydown(ev: KeyboardEvent) {
    // Left/Right to go to previous/next page
    // Shift + Left/Right to go to first/last page
    if (ev.shiftKey || ev.altKey) {
      if (ev.key === "ArrowLeft") {
        gotoPage(1);
      } else if (ev.key === "ArrowRight") {
        gotoPage(pages_length);
      }
    } else {
      if (ev.key === "ArrowLeft") {
        gotoPage(Math.max(current_page - 1, 1));
      } else if (ev.key === "ArrowRight") {
        gotoPage(Math.min(current_page + 1, pages_length));
      }
    }
  };
</script>

<svelte:window on:keydown={onkeydown} />

<header>
  <h1>XKCD Gallery</h1>
  {#if random}
    <p>Showing 9 random comics.</p>
  {:else if search}
    {#if comics.length === 0}
      <p>No comics found. Try searching for something else.</p>
    {:else if comics.length > 50}
      <p>Showing 50 of {comics.length} comics.</p>
    {:else}
      <p>Showing {comics.length} comics.</p>
    {/if}
  {:else if pages}
    <Pagination pages={pages} current_page={current_page} pages_length={pages_length} />
  {/if}
  <aside>
    <SearchInput />
    <a class="random"
      href="?random"
      on:click|preventDefault={(_ev) => {
        const random = Math.floor(Math.random() * 1000_000);
        navigation.goto(`?random=${random}`, { replaceState: true });
      }}>Random</a>
  </aside>
</header>

<Comics entries={comics.slice(0, 50)} />

{#if pages}
  <Pagination pages={pages} current_page={current_page} pages_length={pages_length} />
{/if}

<style lang="scss">
  :global(:root) {
    --black: #000;
    --darkgray: #333;
    --lightgray: #aaa;
  }
  :global(html) {
    font-size: 12px;
    font-family: monospace;
  }
  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    h1 {
      font-size: 1rem;
      margin: 0;
    }
    p {
      margin: 0;
    }
    aside {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    a.random {
      border: 1px solid var(--lightgray);
      border-radius: 2px;
      color: black;
      font-size: .9rem;
      height: 1rem;
      line-height: 1rem;
      text-decoration: none;
      padding: .25rem .5rem;
      &:hover {
        border: 1px solid var(--darkgray);
      }
      &:active {
        border: 1px solid var(--black);
      }
    }
  }
</style>

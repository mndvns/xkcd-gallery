<script	lang="ts">
  import type { Comic } from "$lib/types";
  export let entries: Comic[] = [];
</script>

<main>
  {#each entries as comic, i}
    {#if comic.img !== "https://imgs.xkcd.com/comics/"}
      <article>
        <img
          alt={comic.title}
          title={comic.alt}
          src={comic.img} />
        <aside>
          <p>#{comic.num} - <b>{comic.alt}</b></p>
          <p>{comic.title}</p>
          <a href={`https://xkcd.com/${comic.num}/`}>Link</a>
        </aside>
      </article>
    {/if}
  {/each}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
  }
  article {
    display: flex;
    flex: 1;
    margin-bottom: 1rem;
    align-self: center;
    position: relative;
    aside {
      margin-left: 1rem;
      p {
        max-width: 20rem;
      }
    }
  }
</style>

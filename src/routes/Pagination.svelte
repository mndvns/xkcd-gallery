<script lang="ts">
  import PaginationLink from "./PaginationLink.svelte";
  export let pages: number[];
  export let pages_length: number;
  export let current_page: number;
</script>

<menu>
  <PaginationLink disabled={current_page === 1} page={1}>{"<<"}</PaginationLink>
  <PaginationLink disabled={current_page === 1} page={Math.max(current_page - 1, 1)}>{"<"}</PaginationLink>
  {#each pages as page}
    <PaginationLink disabled={current_page === page} page={page}>{page}</PaginationLink>
  {/each}
  <PaginationLink disabled={current_page === pages_length} page={Math.min(current_page + 1, pages_length)}>{">"}</PaginationLink>
  <PaginationLink disabled={current_page === pages_length} page={pages_length}>{">>"}</PaginationLink>
</menu>

<style lang="scss">
  menu {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0;
  }
</style>

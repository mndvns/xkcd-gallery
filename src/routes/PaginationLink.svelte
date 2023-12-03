<script lang="ts">
  import { gotoPage, pageToHref } from "./+page.svelte";
  export let page: number;
  export let disabled: boolean;
</script>

<a
  class:disabled={disabled}
  href={pageToHref(page)}
  on:click|preventDefault={(_ev) => gotoPage(page)} >
  <slot />
</a>

<style lang="scss">
  a {
    display: flex;
    justify-content: center;
    padding: 0 .25rem;
    text-decoration: none;
    &.disabled {
      color: gray;
      cursor: default;
      opacity: .3;
      pointer-events: none;
    }
  }
</style>

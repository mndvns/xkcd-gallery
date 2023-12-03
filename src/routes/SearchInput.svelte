<script	lang="ts">
  import { queryParam } from "sveltekit-search-params";
  import { writable } from "svelte/store";
  import debounce from "debounce";
  let elem: HTMLInputElement;
  const value = queryParam("search");
  const random = queryParam("random");
  const focused = writable(false);
</script>

<input
  placeholder="Search title, alt, or year"
  bind:this={elem}
  bind:value={$value}
  on:focus={() => focused.set(true)}
  on:blur={() => focused.set(false)}
  on:keyup={debounce((e) => {
    if (["Escape", "Enter"].includes(e.key)) {
      elem.blur();
    } else {
      value.set(elem.value || null)
      if (random) {
        random.set(null);
      }
    }
  }, 1000)} />

<style lang="scss">
  input {
    border: 0;
    border-bottom: 1px solid var(--lightgray);
    font-family: monospace;
    font-size: .9rem;
    height: 1rem;
    line-height: 1rem;
    outline: none!important;
    padding: .25rem;
    text-align: right;
    width: 15rem;
    &:hover {
      border-bottom: 1px solid var(--darkgray);
    }
    &:focus {
      border-bottom: 1px solid var(--black);
    }
  }
</style>

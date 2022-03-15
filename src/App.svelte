<script lang="ts">
  import { key } from "./constant";
  import { produce } from "immer";
  let includeStr = "";
  let excludeStr = "";
  let masks = [{ id: 0, mask: "" }];
  let containsStr = "";

  let dangerousToggle = false;

  function predict(e: string | Date) {
    const _date = new Date(e);
    const Ga = new Date(2021, 5, 19, 0, 0, 0, 0);
    function Ba(e: string | Date, a: string | Date) {
      var s = new Date(e),
        t = new Date(a).setHours(0, 0, 0, 0) - s.setHours(0, 0, 0, 0);
      return Math.round(t / 864e5);
    }
    function Va(e: string | Date) {
      var a,
        s = Ba(Ga, e);
      return (a = s % key.length), key[a];
    }
    return Va(_date);
  }

  const sampleObj = {
    includeStr,
    excludeStr,
    masks,
    containsStr,
  };

  function addMask() {
    masks = produce(masks, (draft) => {
      draft.push({ id: masks.length, mask: "" });
    });
  }

  function removeMask(id: number) {
    masks = produce(masks, (draft) => {
      draft.splice(id, 1);
    });
  }

  function openWordle() {
    window.open(
      "https://www.nytimes.com/games/wordle/index.html",
      "_blank",
      "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600"
    );
  }

  function clickGetGoogleTranslate(str: string) {
    const url = `https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=${str}`;
    window.open(
      url,
      "_blank",
      "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600"
    );
  }

  function getResult({
    masks,
    includeStr,
    excludeStr,
    containsStr,
  } = sampleObj) {
    let maskCond = masks.filter(
      (m) => /^([a-zA-Z\_\!]+)$/.test(m.mask) && m.mask.length >= 5
    );

    const cond = [!!includeStr, !!excludeStr, maskCond.length, !!containsStr];
    const _includeStr = includeStr.toLowerCase().split("");
    const _excludeStr = new RegExp(
      excludeStr.toLowerCase().split("").join("|")
    );
    const _maskTest = maskCond.map((m) => {
      return new RegExp(
        m.mask
          .toLowerCase()
          .replace(/\_/g, ".")
          .replace(/\!(\w)/g, "[^$1]")
      );
    });

    if (!cond.some((b) => b)) {
      return "";
    }
    const result = key.filter((l) => {
      if (cond[0]) {
        if (!_includeStr.every((c) => ~l.indexOf(c))) {
          return false;
        }
      }
      if (cond[1]) {
        if (_excludeStr.test(l)) {
          _excludeStr.lastIndex = 0;
          return false;
        }
      }
      if (cond[2]) {
        if (!_maskTest.every((m) => m.test(l))) {
          _maskTest.forEach((m) => (m.lastIndex = 0));
          return false;
        }
      }
      if (cond[3]) {
        if (!~l.toLowerCase().indexOf(containsStr.toLowerCase())) {
          return false;
        }
      }
      return true;
    }, [] as string[]);
    return result;
  }

  $: result = getResult({
    includeStr,
    excludeStr,
    masks,
    containsStr,
  });
</script>

<main>
  <div class="main">
    <div class="section">
      <label for="Dangerous warning">Get predicted wordle answer</label>
      <input
        type="checkbox"
        id="Dangerous warning"
        on:change={() => (dangerousToggle = !dangerousToggle)}
      />
    </div>
    <div class="section">
      <label for="include">Include</label>
      <input id="include" type="text" bind:value={includeStr} />
    </div>
    <div class="section">
      <label for="exclude">Exclude</label>
      <input id="exclude" type="text" bind:value={excludeStr} />
    </div>
    <div class="section">
      <label for="contains">contains</label>
      <input id="contains" type="text" bind:value={containsStr} />
    </div>
    <div class="section">
      <label for="mask"
        >Mask (empty by _, exclude with ! prefix) <button on:click={addMask}
          >add candidate option</button
        ></label
      >
      <br />
      {#each masks as mask, index}
        <input
          type="text"
          style="margin-bottom: 10px; margin-right: 10px"
          bind:value={mask.mask}
          on:input={(e) => {
            masks[index].mask = e.target.value;
          }}
        />
        {#if masks.length !== 1}
          <button
            on:click={() => {
              removeMask(index);
            }}
          >
            remove
          </button>
        {/if}
        <br />
      {/each}
    </div>
    {#if dangerousToggle}
      <div class="section">
        {predict(new Date())}
      </div>
    {/if}
    <div class="section">
      <label for="frame"> open worldle </label>
      <button id="frame" on:click={openWordle}>open</button>
    </div>

    <div class="result-section">
      {#each result as str}
        <a
          target="_blank"
          href={`https://translate.google.com/#view=home&op=translate&sl=en&tl=zh-TW&text=${str}`}
          >{str}</a
        >,
      {/each}
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: left;
    padding: 1em;
    margin: 0 auto;
    width: 70vw;
  }
  .section {
    margin: 10px;
    font-size: 20px;
  }
  input {
    font-size: 20px;
  }
  .result-section {
    margin: 10px;
    font-size: 1.5em;
    border: solid 1px black;
    width: 70vw;
    word-break: break-all;
  }
</style>

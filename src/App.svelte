<script lang="ts">
  import { key } from './constant'
  let includeStr = ''
  let excludeStr = ''
  let masks = [{ id: 0, mask: '' }]

  function openWordle() {
    window.open(
      'https://www.nytimes.com/games/wordle/index.html',
      '_blank',
      'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600'
    )
  }

  $: result = (() => {
    let maskCond = masks.filter(
      (m) => /^([a-zA-Z\_\!]+)$/.test(m.mask) && m.mask.length >= 5
    )

    const cond = [!!includeStr, !!excludeStr, maskCond.length]
    const _includeStr = includeStr.toLowerCase().split('')
    const _excludeStr = new RegExp(excludeStr.toLowerCase().split('').join('|'))
    const _maskTest = maskCond.map((m) => {
      return new RegExp(
        m.mask
          .toLowerCase()
          .replace(/\_/g, '.')
          .replace(/\!(\w)/g, '[^$1]')
      )
    })

    if (!cond.some((b) => b)) {
      return ''
    }
    const result = key
      .filter((l) => {
        if (cond[0]) {
          if (!_includeStr.every((c) => ~l.indexOf(c))) {
            return false
          }
        }
        if (cond[1]) {
          if (_excludeStr.test(l)) {
            _excludeStr.lastIndex = 0
            return false
          }
        }
        if (cond[2]) {
          if (!_maskTest.every((m) => m.test(l))) {
            _maskTest.forEach((m) => (m.lastIndex = 0))
            return false
          }
        }
        return true
      }, [] as string[])
      .join()
    console.log(result)
    return result
  })()
</script>

<main>
  <div class="main">
    <div class="section">
      <label for="include">Include</label>
      <input id="include" type="text" bind:value={includeStr} />
    </div>
    <div class="section">
      <label for="exclude">Exclude</label>
      <input id="exclude" type="text" bind:value={excludeStr} />
    </div>
    <div class="section">
      <label for="mask"
        >Mask (empty by _, exclude with ! prefix) <button
          on:click={() => {
            masks = [...masks, { id: masks.length, mask: '' }]
          }}>add candidate option</button
        ></label
      >
      <br />
      {#each masks as mask, index}
        <input
          type="text"
          style="margin-bottom: 10px"
          bind:value={mask.mask}
          on:input={(e) => {
            masks[index].mask = e.target.value
          }}
        />
        <br/>
      {/each}
    </div>
    <div class="section">
      <label for="frame"> open worldle </label>
      <button id="frame" on:click={openWordle}>open</button>
    </div>

    <div class="result-section">
      {result}
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

<script lang="ts">
  import { key } from './constant'
  let includeStr = ''
  let excludeStr = ''
  let mask = ''

  function openWordle() {
    window.open(
      'https://www.nytimes.com/games/wordle/index.html',
      '_blank',
      'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600'
    )
  }

  $: result = (() => {
    let maskCond = /^([a-zA-Z\_\!]+)$/.test(mask)

    const cond = [!!includeStr, !!excludeStr, maskCond && mask.length >= 5]
    const _includeStr = includeStr.toLowerCase().split('')
    const _excludeStr = new RegExp(excludeStr.toLowerCase().split('').join('|'))
    const _maskStr = new RegExp(
      mask
        .toLowerCase()
        .replace(/\_/g, '.')
        .replace(/\!(\w)/g, '[^$1]')
    )
    console.log(_maskStr)
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
          if (!_maskStr.test(l)) {
            _maskStr.lastIndex = 0
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
      <label for="mask">Mask (empty by _, exclude with ! prefix)</label>
      <input id="mask" type="text" bind:value={mask} />
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

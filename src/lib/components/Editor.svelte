<script lang="ts">
  export let code: string;

  let textarea: HTMLTextAreaElement;

  $: cols = Math.max(...code.split("\n").map(s => s.length))
  $: rows = code.split("\n").length;
</script>

<div
  class="flex justify-center items-start w-full h-64 bg-editor-background rounded-lg border-2 border-editor-border py-1.5 overflow-y-hidden overflow-x-hidden"
>
  <div
    class="flex flex-row justify-start items-start min-w-full min-h-full w-fit h-fit overflow-y-visible"
  >
    <div class="flex flex-col justify-start overflow-y-visible">
      {#each Array(rows) as _, i}
        <div
          class="h-5 w-5 flex text-right text-editor-variable/50 items-center justify-center text-sm"
        >
          {i+1}
        </div>
      {/each}
    </div>
    <textarea
      class="text-editor-variable w-auto h-auto overflow-y-visible bg-transparent resize-none text-sm"
      spellcheck="false"
      autocapitalize="off"
      translate="no"
      contenteditable="true"
      aria-multiline="true"
      data-language="javascript"
      bind:value={code}
      bind:this={textarea}
      cols={cols}
      rows={rows}
    ></textarea>
  </div>
</div>

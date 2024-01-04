<script lang="ts">
  import Editor from "./lib/components/Editor.svelte";
  import { createRunCodeFn } from "./lib/utils/run";

  let out = "";
  let code = "setTimeout(() => { console.log('test'); }, 500)";

  function addToOutput(...args: any[]) {
    out += `${args.join(" ")}\n`;
  }

  function clearOutput() {
    out = "";
  }

  const runCode = createRunCodeFn();
</script>

<main class="flex flex-col justify-start items-center pt-20 gap-2">
  <Editor bind:code />
  <button
    on:click={() => runCode(code, addToOutput, clearOutput)}
    class="bg-theme-blue text-editor-background px-2.5 py-1.5 rounded-lg uppercase font-bold"
    >Run Code</button
  >
  {#if out !== ""}
    <div
      class="flex text-editor-variable text-left text-sm justify-start items-start w-96 bg-editor-background rounded-lg border-2 border-editor-border py-1.5 px-2.5"
    >
      <pre>{out}</pre>
    </div>
  {/if}
</main>

<script lang="ts">
  import Editor from "./lib/components/Editor.svelte";
  import { createRunCodeFn } from "./lib/utils/run";
  import { decode, encode, parseParams, toURL } from "./lib/utils/helpers";
  import Toast from "./lib/components/Toast.svelte";
  import { notifications } from "./lib/stores/notifications";
  const { success, danger, info } = notifications;

  const urlParams = new URLSearchParams(window.location.search);

  let out = "";
  let code = decode(parseParams(urlParams)) || "console.log(42)";

  function addToOutput(...args: any[]) {
    out += `${args.join(" ")}\n`;
  }

  function clearOutput() {
    out = "";
  }

  const runCode = createRunCodeFn();

  function onRunCode() {
    runCode(code, addToOutput, clearOutput);
  }

  function onClearOutput() {
    if (out !== "") {
      info("Console cleared")
    }
    out = "";
  }

  function onShareCode() {
    const url = toURL(window.location.href, encode(code));
    navigator.clipboard
      .writeText(url)
      .then(() => success("Copied URL to clipboard!"))
      .catch(() => danger("Failed to copy URL to clipboard"));
  }
</script>

<div
  class="overflow-hidden relative w-full min-h-[30rem] h-dvh flex flex-col justify-start items-center"
>
  <div class="kanagawa-bg"></div>
  <main
    class="flex flex-col justify-start items-center w-full h-full px-1 sm:w-96 py-1 sm:py-10 sm:px-0 gap-2"
  >
    <Editor bind:code />
    <div class="flex flex-row justify-center gap-2">
      <button
        on:click={onClearOutput}
        class="bg-theme-red text-editor-background px-2.5 py-0.5 rounded-lg uppercase font-bold"
        >Clear</button
      >
      <button
        on:click={onRunCode}
        class="bg-theme-blue text-editor-background px-2.5 py-0.5 rounded-lg uppercase font-bold"
        >Run Code</button
      >
      <button
        on:click={onShareCode}
        class="bg-theme-green text-editor-background px-2.5 py-0.5 rounded-lg uppercase font-bold"
        >Share</button
      >
    </div>

    <div
        class="flex text-editor-variable h-full overflow-y-scroll text-left text-sm flex-col justify-start items-start w-full bg-editor-background rounded-lg border-2 border-editor-border py-1.5 px-2.5"
      >
        {#each out.split('\n') as line, i (i) }
          <div>{line}</div>
        {/each}
      </div>
  </main>
</div>
<Toast />

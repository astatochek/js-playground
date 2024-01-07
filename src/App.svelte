<script lang="ts">
  import Editor from "./lib/components/Editor.svelte";
  import { createRunCodeFn } from "./lib/utils/run";
  import { decode, encode, parseParams, toURL } from "./lib/utils/helpers";
  import Toast from "./lib/components/Toast.svelte";
  import { notifications } from "./lib/stores/notifications";
  const { success, danger } = notifications;

  const DURATION_MS = 5000;

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
    out = "";
  }

  function onShareCode() {
    const url = toURL(window.location.href, encode(code));
    navigator.clipboard
      .writeText(url)
      .then(() => success(`Copied URL to clipboard!`, DURATION_MS))
      .catch(() => danger("Failed to copy URL to clipboard", DURATION_MS));
  }
</script>

<div
  class="overflow-hidden relative w-full h-dvh flex flex-col justify-start items-center"
>
  <div class="kanagawa-bg"></div>
  <main
    class="flex flex-col justify-start items-center w-full px-1 sm:w-96 pt-1 sm:pt-20 sm:px-0 gap-2"
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

    {#if out !== ""}
      <div
        class="flex text-editor-variable max-h-32 overflow-y-scroll text-left text-sm justify-start items-start w-full bg-editor-background rounded-lg border-2 border-editor-border py-1.5 px-2.5"
      >
        <pre>{out}</pre>
      </div>
    {/if}
  </main>
</div>
<Toast />

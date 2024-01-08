<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";

  export let code: string;
</script>

<div
  class="w-full max-h-64 bg-editor-background rounded-lg border-2 border-editor-border overflow-auto"
>
  <CodeMirror
    class="w-full h-full text-sm"
    bind:value={code}
    lang={javascript()}
    theme={oneDark}
  />
</div>

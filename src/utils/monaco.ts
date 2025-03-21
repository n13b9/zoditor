import { type Monaco, loader } from "@monaco-editor/react";
import * as zod from "../zod";

export async function initMonaco() {
  if (typeof window === "undefined") return;
  const monaco = await loader.init();
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });
}

export async function setMonacoDeclarationTypes(monaco: Monaco, ver: string) {
  const declarationTypes = await zod.getDeclarationTypes(ver);

  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    {
      content: `declare namespace z{${declarationTypes}}`,
    },
  ]);
}

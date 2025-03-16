"use client";
import {
  Box,
  Flex,
  Button,
  Tooltip,
  ActionIcon,
  useComputedColorScheme,
} from "@mantine/core";
import Editor, { type Monaco, useMonaco } from "@monaco-editor/react";
import { CopyButton } from "../features/copyButton";
import { LuEraser } from "react-icons/lu";
import { FiAlertCircle, FiLink } from "react-icons/fi";

import { useState } from "react";
import {
  getAppDataFromLocalStorage,
  getAppDataFromSearchParams,
  getURLwithAppData,
} from "../utils/appData";
import { DEFAULT_APP_DATA, EDITOR_OPTIONS } from "../constants";
import { initMonaco, setMonacoDeclarationTypes } from "../utils/monaco";
import * as zod from "../zod";

await initMonaco();

const initialAppData =
  getAppDataFromSearchParams() ??
  getAppDataFromLocalStorage() ??
  DEFAULT_APP_DATA;

export default function Home() {
  const [schema, setSchema] = useState<string>(() => initialAppData.schema);
  const [values, setValues] = useState<Array<string>>(
    () => initialAppData.values
  );

  const monaco = useMonaco();
  const computedColorScheme = useComputedColorScheme("light");

  const schemaValidation = zod.validateSchema(schema);
  const evaluatedSchema = schemaValidation.success
    ? schemaValidation.data
    : undefined;
  const schemaError = !schemaValidation.success
    ? schemaValidation.error
    : undefined;

  return (
    <Box className="grid grid-rows-[auto_1fr] h-dvh">
      {/* <Header>
    </Header> */}
      <main className="grid grid-cols-2 max-h-full overflow-auto md:grid-cols-none md:grid-rows-2">
        <div className="flex flex-col overflow-auto border-r border-color: var(--mantine-color-neutral-2);">
          <Flex
            className="h-10 px-6 font-medium flex-shrink-0 text-primary-700 bg-primary-50"
            align="center"
            justify="space-between"
            gap="sm"
          >
            <CopyButton value={schema} />
            <Tooltip label="Clear schema" withArrow>
              <ActionIcon
                variant="light"
                aria-label="Clear schema"
                onClick={() => setSchema("")}
              >
                <LuEraser />
              </ActionIcon>
            </Tooltip>
            {schemaError && (
              <Tooltip label={schemaError}>
                <Flex align="center">
                  <FiAlertCircle color="red" size="1.125rem" />
                </Flex>
              </Tooltip>
            )}
          </Flex>
          <Editor
            className="flex-grow"
            onChange={(value) => {
              setSchema(value ?? "");
            }}
            defaultLanguage="typescript"
            options={EDITOR_OPTIONS}
            theme={computedColorScheme === "light" ? "vs" : "vs-dark"}
            value={schema}
          />
        </div>
        <div className="h-full overflow-auto border-t md:border-t-0 border-color: var(--mantine-color-neutral-2);"></div>
      </main>
    </Box>
  );
}

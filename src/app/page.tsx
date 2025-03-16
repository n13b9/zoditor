import { Box, Flex, Button, Tooltip, ActionIcon } from "@mantine/core";
import Editor, { type Monaco, useMonaco } from "@monaco-editor/react";
import { CopyButton } from "../features/copyButton";

export default function Home() {
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
            {/* <Flex gap="sm" align="center" flex={1}>
              Zod schema
              <VersionPicker
                value={version}
                onChange={async (ver) => {
                  setVersion(ver);
                }}
                disabled={isLoading}
              />
              <Button
                rel="noopener noreferrer"
                target="_blank"
                size="compact-xs"
                variant="transparent"
                component="a"
                href="https://zod.dev/"
              >
                Docs
              </Button>
            </Flex> */}
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

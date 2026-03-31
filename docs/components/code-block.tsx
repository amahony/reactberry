"use client";

import { useMemo, useState } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import { Box, Button, Text } from "reactberry/elements";

type CodeBlockProps = {
    code: string;
    language?: string;
    filename?: string;
};

const aliases: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    sh: "bash",
    zsh: "bash",
    yml: "yaml",
    md: "markdown",
};

const escapeHtml = (value: string) =>
    value.replace(
        /[&<>"']/gu,
        (character) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character,
    );

const normalizeLanguage = (language?: string) => {
    const cleaned = language
        ?.toLowerCase()
        .replace(/^language-/u, "")
        .trim();
    return cleaned ? (aliases[cleaned] ?? cleaned) : undefined;
};

if (!hljs.getLanguage("bash")) hljs.registerLanguage("bash", bash);
if (!hljs.getLanguage("css")) hljs.registerLanguage("css", css);
if (!hljs.getLanguage("javascript")) hljs.registerLanguage("javascript", javascript);
if (!hljs.getLanguage("json")) hljs.registerLanguage("json", json);
if (!hljs.getLanguage("markdown")) hljs.registerLanguage("markdown", markdown);
if (!hljs.getLanguage("plaintext")) hljs.registerLanguage("plaintext", plaintext);
if (!hljs.getLanguage("typescript")) hljs.registerLanguage("typescript", typescript);
if (!hljs.getLanguage("xml")) hljs.registerLanguage("xml", xml);
if (!hljs.getLanguage("yaml")) hljs.registerLanguage("yaml", yaml);

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const { html, label } = useMemo(() => {
        const normalized = normalizeLanguage(language);

        try {
            if (normalized && hljs.getLanguage(normalized)) {
                return { html: hljs.highlight(code, { language: normalized }).value, label: normalized };
            }

            return { html: hljs.highlightAuto(code).value, label: normalized ?? "plain text" };
        } catch {
            return { html: escapeHtml(code), label: normalized ?? "plain text" };
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <Box
            border="1px solid"
            borderColor="palette.neutrals.3"
            skin="surface"
            shape="rounded"
            overflow="hidden"
            my="0"
        >
            <Box
                px="s"
                py="xs"
                borderBottom="1px solid"
                borderColor="palette.neutrals.3"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap="s"
            >
                <Box display="flex" alignItems="center" gap="xs">
                    <Text as="span" fontSize="xs" fontWeight="700">
                        {filename ?? label}
                    </Text>
                    {filename ? (
                        <Text as="span" fontSize="xs" color="tertiary">
                            {label}
                        </Text>
                    ) : null}
                </Box>
                <Button as="button" type="button" variant="ghost" $size="xxsmall" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy"}
                </Button>
            </Box>
            <Box
                as="pre"
                p="m"
                m="0"
                overflowX="auto"
                style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    lineHeight: 1.6,
                    fontSize: 14,
                    tabSize: 2,
                    background: "#f6f8fa",
                }}
            >
                <Box
                    as="code"
                    className={`hljs language-${label.replace(/\s+/gu, "-")}`}
                    style={{ display: "block", minWidth: "fit-content", background: "transparent", padding: 0 }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </Box>
        </Box>
    );
}

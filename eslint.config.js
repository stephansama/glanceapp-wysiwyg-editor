// @ts-check
import { tanstackConfig } from "@tanstack/eslint-config";
import eslintPluginZodX from "eslint-plugin-zod-x";

export default [...tanstackConfig, eslintPluginZodX.configs.recommended];

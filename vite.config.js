// @ts-check
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(env => ({
    server: {
        proxy: {
            "/api": "https://czujniki.skni.umcs.pl",
            "/live-api": "https://czujniki.skni.umcs.pl",
        },
    },
    plugins: [react()],
    css: {
        modules: {
            generateScopedName: env.mode == "development"
                ? (className, filePath) => {
                        const fileName = path.basename(filePath, ".module.css");
                        return `${fileName}__${className}`;
                    }
                : undefined,
        },
    },
}));

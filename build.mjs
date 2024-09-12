import fs from "fs"
import path from "path"
import { build, context } from "esbuild"
import jsYaml from "js-yaml"
import { mergeDeepLeft } from "rambda"

const serve = process.argv[2] === "--serve"
const port = serve ? Number(process.argv[3]) : null
const dev = serve || process.argv[2] === "--dev"

const localeDir = path.resolve("locales")
const enLocaleDir = path.resolve(localeDir, "en")
const tcLocaleDir = path.resolve(localeDir, "tc")

/**
 * @param {string} baseDir
 * @returns {AsyncGenerator<string>}
 */
async function* iterateYamlFiles(baseDir) {
    const items = await fs.promises.readdir(baseDir)
    for (const item of items) {
        const fullPath = path.resolve(baseDir, item)
        const stat = await fs.promises.lstat(fullPath)
        if (stat.isDirectory()) {
            yield* iterateYamlFiles(fullPath)
        } else if (!stat.isSymbolicLink()) {
            const ext = path.extname(item)
            if (ext === ".yml" || ext === ".yaml") {
                yield fullPath
            }
        }
    }
}

/**
 * @param {string} file
 * @returns {Promise<any>}
 */
async function readFile(file) {
    const content = await fs.promises.readFile(file, "utf8")
    const parsed = jsYaml.load(content)
    return parsed
}

/**
 * @param {string} baseDir
 * @returns {Promise<any>}
 */
async function loadLocale(baseDir) {
    const outputs = []
    for await (const file of iterateYamlFiles(baseDir)) {
        outputs.push(await readFile(file))
    }
    const output = outputs.reduce(mergeDeepLeft, {})
    return output
}

/**
 * @param {any} content
 * @param {string} lang
 */
async function saveLocale(content, lang) {
    const outputStr = dev
        ? JSON.stringify(content, null, 4)
        : JSON.stringify(content)
    const outFile = path.resolve(
        "dist",
        dev ? `${lang}.json` : `${lang}.min.json`,
    )
    await fs.promises.writeFile(outFile, outputStr)
}

async function buildLocale() {
    const [enLocale, tcLocale] = await Promise.all([
        loadLocale(enLocaleDir),
        loadLocale(tcLocaleDir),
        fs.promises.mkdir("dist", { recursive: true }),
    ])
    await saveLocale(mergeDeepLeft(enLocale, tcLocale), "en")
    await saveLocale(mergeDeepLeft(tcLocale, enLocale), "tc")
}

const yamlPlugin = () => ({
    name: "yaml",
    setup(build) {
        build.onResolve({ filter: /\.(yml|yaml)$/ }, (args) => {
            if (args.resolveDir === "") return

            return {
                path: path.isAbsolute(args.path)
                    ? args.path
                    : path.join(args.resolveDir, args.path),
                namespace: "yaml",
            }
        })

        build.onLoad({ filter: /.*/, namespace: "yaml" }, async (args) => {
            const yamlContent = await fs.promises.readFile(args.path, "utf8")
            let parsed = jsYaml.load(yamlContent)

            return {
                contents: JSON.stringify(parsed),
                loader: "json",
            }
        })
    },
})

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
    logLevel: "info",
    entryPoints: ["src/main.ts"],
    outfile: dev ? "dist/main.js" : "dist/main.min.js",
    bundle: true,
    minify: !dev,
    format: "esm",
    sourcemap: dev ? "inline" : undefined,
    plugins: [yamlPlugin()],
}

if (serve) {
    fs.watch(localeDir, { recursive: true }, buildLocale)

    const ctx = await context(buildOptions)
    ctx.serve({
        servedir: "dist",
        port: port,
    })
    await buildLocale()
} else {
    await build(buildOptions)
    await buildLocale()
}

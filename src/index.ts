import { Plugin } from "esbuild";
import path from "path";
import fs from "fs-extra";
import yaml, { LoadOptions } from "js-yaml";
import { TextDecoder } from "util";

interface YamlPluginOptions {
  loadOptions?: LoadOptions;
  transform?: (
    data: string | number | object,
    filePath: string
  ) => object | undefined;
}

export const yamlPlugin = (options: YamlPluginOptions): Plugin => ({
  name: "yaml",
  setup(build) {
    // resolve .yaml and .yml files
    build.onResolve({ filter: /\.(yml|yaml)$/ }, (args) => {
      if (args.resolveDir === "") return;

      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "yaml"
      };
    });

    // load files with "yaml" namespace
    build.onLoad({ filter: /.*/, namespace: "yaml" }, async (args) => {
      const yamlContent = await fs.readFile(args.path);
      let parsed = yaml.load(
        new TextDecoder().decode(yamlContent),
        options?.loadOptions
      );

      if (
        options?.transform &&
        options.transform(parsed, args.path) !== undefined
      )
        parsed = options.transform(parsed, args.path);

      return {
        contents: JSON.stringify(parsed),
        loader: "json"
      };
    });
  }
});

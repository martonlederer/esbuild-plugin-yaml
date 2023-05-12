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

const DETECTOR_R = /\.ya?ml$/;

export const yamlPlugin = (options: YamlPluginOptions): Plugin => ({
  name: "yaml",
  setup(build) {
    // resolve .yaml and .yml files
    build.onResolve({ filter: DETECTOR_R }, (args) => {
      if (args.resolveDir === "") return;

      const filePath = path.isAbsolute(args.path)
        ? args.path
        : path.join(args.resolveDir, args.path);

      return {
        namespace: "file",
        path: filePath
      };
    });

    // load files with "yaml" namespace
    build.onLoad({ filter: DETECTOR_R, namespace: "file" }, async (args) => {
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

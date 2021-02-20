const { yamlPlugin } = require("../dist"),
  { assert } = require("chai"),
  { build } = require("esbuild");

describe("YAML esbuild tests", () => {
  it("Loads .yaml and .yml files", (done) => {
    test("basic")
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
  it("Applies loadOptions", (done) => {
    test("loadOptions", {
      loadOptions: {
        listener() {
          // listener for parse events
        }
      }
    })
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
  it("Transforms with transform()", (done) => {
    test("transform", {
      transform(data, filePath) {
        // transform the yaml file
        // the file content will be in the "data" field
        // the file path will be in the "filePath" field
        return { filePath, data };
      }
    })
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
});

function test(test, options) {
  return build({
    entryPoints: [`tests/basic.ts`],
    bundle: true,
    outfile: `dist/${test}.js`,
    plugins: [yamlPlugin(options)]
  }).catch(() => process.exit(1));
}

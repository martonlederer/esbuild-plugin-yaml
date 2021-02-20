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
});

function test(test) {
  return build({
    entryPoints: [`tests/${test}.ts`],
    bundle: true,
    outdir: "dist",
    plugins: [yamlPlugin()]
  }).catch(() => process.exit(1));
}

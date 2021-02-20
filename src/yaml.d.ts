// .yaml and .yml declarations
declare module "*.yaml" {
  const content: {
    [key: string]: any;
  };
  export default content;
}

export const pluginFoo = (options = {}) => ({
  name: "plugin-foo",
  setup(api) {
    api.onAfterStartDevServer(() => {
      const msg = options.message || "hello!";
      console.log(msg);
    });
  },
});

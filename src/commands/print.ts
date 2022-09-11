export default {
  name: "print",
  args: "<text>",
  run(param: string) {
    return { lineText: param, outputText: [] };
  },
};

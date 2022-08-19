export function getTextWidth(text: string, font: any) {
  const canvas = document.createElement("canvas");
  const context: any = canvas.getContext("2d");

  context.font = font || getComputedStyle(document.body).font;

  return context.measureText(text).width;
}

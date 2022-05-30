export class Canvas {
  public c = document.querySelector("canvas")!;
  public ctx = this.c.getContext("2d")!;

  constructor() {
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight;
    window.addEventListener("resize", () => {
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight;
    });
  }
}

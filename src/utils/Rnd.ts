export class Rnd {
  public static GenerateId(): string {
    return (Math.random().toString(36) + "00000000000000000").slice(2, 5 + 2);
  }
}

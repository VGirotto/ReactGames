export function msToMinutes(ms: number): string {
  let minutes: number = Math.floor(ms / 60000);
  let seconds: number = Math.floor(ms % 60000) / 1000;

  let putZeroMinutes: string = minutes < 10 ? "0" : "";
  let putZeroSeconds: string = seconds < 10 ? "0" : "";

  return `${putZeroMinutes}${minutes}:${putZeroSeconds}${seconds}`;
}

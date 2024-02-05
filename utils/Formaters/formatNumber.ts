export function formatNumber(digit: number) {
  return new Intl.NumberFormat("pt-Br").format(digit);
}

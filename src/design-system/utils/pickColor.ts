interface PickColorOptions {
  sat?: string;
  lum?: string;
}

export function pickColor(
  stringInput: string,
  { sat = "42%", lum = "42%" }: PickColorOptions = {},
): string {
  const stringUniqueHash = stringInput.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 12) - acc);
  }, 0);

  return `hsla(${stringUniqueHash % 360}, ${sat}, ${lum}, 1)`;
}
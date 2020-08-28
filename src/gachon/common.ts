function pseudoPadStart(string: string, length: number, padding: string): string {
  return padding.repeat(length - string.length) + string;
}

export function dateToString(date: Date): string {
  return (
    date.getFullYear() +
    '-' +
    pseudoPadStart((date.getMonth() + 1).toString(), 2, '0') +
    '-' +
    pseudoPadStart(date.getDate().toString(), 2, '0')
  );
}

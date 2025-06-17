import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTsExport(varName: string, data: any) {
  return `export const ${varName} = ${JSON.stringify(data, null, 2)};\n`;
}

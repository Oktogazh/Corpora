import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Define the paths to the type files
const frontendTypeFilePath = path.resolve(__dirname, './firestoreTypes.ts');
const backendTypeFilePath = path.resolve(__dirname, '../../../firebase/functions/src/firestoreTypes.ts');

// Read the content of the type files
const readFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf-8');
};

describe('Type File Comparison', () => {
  it('makes sure that the types match those used in the back end.', () => {
    const frontendContent = readFileContent(frontendTypeFilePath);
    const backendContent = readFileContent(backendTypeFilePath);

    expect(frontendContent).toBe(backendContent);
  });
});
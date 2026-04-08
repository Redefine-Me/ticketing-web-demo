/**
 * Maps stable UUID tokens to society directory names.
 * Each society gets a unique shareable link: /society?token=<uuid>
 * Add new societies here as they're onboarded.
 */

export interface SocietyToken {
  token: string;
  dirName: string;
  displayName: string;
}

export const SOCIETY_TOKENS: SocietyToken[] = [
  {
    token: "b1e2f3a4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
    dirName: "Malayalee_Student_Society",
    displayName: "Manchester Malayalee Student Society",
  },
  {
    token: "a7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    dirName: "American_Studies_Society",
    displayName: "UoM American Studies Society",
  },
  {
    token: "d3e4f5a6-7b8c-9d0e-1f2a-3b4c5d6e7f8a",
    dirName: "American_Studies_Society_regen",
    displayName: "UoM American Studies Society (regen)",
  },
  {
    token: "f9a0b1c2-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
    dirName: "UniCS",
    displayName: "UniCS",
  },
];

export function getSocietyByToken(token: string): SocietyToken | undefined {
  return SOCIETY_TOKENS.find((s) => s.token === token);
}

export function getTokenForSociety(dirName: string): string | undefined {
  return SOCIETY_TOKENS.find((s) => s.dirName === dirName)?.token;
}

export declare type IETFLanguage = {
  Type: "language" | "region" | "script" | "grandfathered" | "redundant" | "redundant-script" | "variant" | "extlang";
  Subtag: string;
  Description: string[];
  Added: string;
  endonyme: string;
  iso639v3: string;
  glottocode: string;
};
import { type UserInfo } from "firebase/auth"

export declare interface UniqueUsername {
  owner: UserInfo["uid"];
};

declare type Glottocode = string

/**
 * Lect with a reference to the latest activity
 */
export declare interface Languoid {
  id: Glottocode;
};

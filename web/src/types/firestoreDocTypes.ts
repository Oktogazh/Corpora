import { type UserInfo } from "firebase/auth"

export declare interface UniqueUsername {
  owner: UserInfo["uid"];
};

export declare interface Post {
  id: string;
  owner?: UserInfo["uid"];
  segment?: string;
  langtag?: string;
};

declare type Glottocode = string

/**
 * Lect with a reference to the latest activity
 */
export declare type Languoid = {
  id: Glottocode;
};

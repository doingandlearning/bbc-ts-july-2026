type GithubUser = {
  name: string;
  location: string;
  bio: string;
  blog: string;
  followers: number;
  avatar_url: string;
  repos: string[];
};

type MakeAllStrings<T> = { readonly [P in keyof T]: string };

type StringedUser = MakeAllStrings<GithubUser>;

type Optional<T> = {
  [P in keyof T]?: T[P] extends string | number ? T[P] : string;
};

type OptionalGithubUser = Optional<GithubUser>;

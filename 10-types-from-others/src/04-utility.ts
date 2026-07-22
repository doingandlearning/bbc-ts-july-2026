async function test() {
  return true;
}

type TestReturnType = Awaited<ReturnType<typeof test>>;

type GithubUser = {
  name: string;
  location: string;
  bio: string;
  blog: string;
  followers: number;
  avatar_url: string;
};

const data: Partial<GithubUser> = {};

data.name = "Bob";
data.location = "Brighton";

const fullData: Required<typeof data> = data;

type PartialUser = Omit<GithubUser, "followers">;

type SuppliedRegions =
  | "NI"
  | "Scotland"
  | "Wales"
  | "North"
  | "South"
  | "South East";

type Regions = Record<SuppliedRegions, string[]>;

const regions: Partial<Regions> = {};

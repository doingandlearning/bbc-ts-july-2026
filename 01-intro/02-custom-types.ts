const user: { name?: string; role?: string } = {};

user.name = "Geetha";

type NewType = {
  name?: string;
  role?: string;
};

interface NewInterface {
  name?: string;
  role?: string;
}

{
  type BirdType = {
    wings: 2;
  };

  interface BirdInterface {
    wings: 2;
  }

  const bird1: BirdType = { wings: 2 };
  const bird2: BirdInterface = { wings: 2 };
  const bird3: BirdType = bird2;

  type Owl = BirdType & { nocturnal: true };
  type Robin = BirdInterface & { nocturnal: false };

  interface Chicken extends BirdInterface {
    colourful: false;
    flies: false;
  }

  interface Peacock extends BirdInterface {
    colourful: true;
    flies: false;
  }

  interface Chicken {
    laysEggs: true;
  }

  let plucky: Chicken = {};
  let rob: Robin = { wings: 2 };

  type ValidStatusCode = 200 | 201 | 202;
}

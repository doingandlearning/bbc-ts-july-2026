type Apple = {
  type: "apple";
  isGoodForBaking: boolean;
  ripe: boolean;
  color: "red" | "green";
};

type Orange = {
  type: "orange";
  numOfSegments: number;
  ripe: boolean;
};

function pickFruit(fruit: Apple | Orange) {
  fruit;
  if ("numOfSegments" in fruit) {
    fruit;
  }
  if (fruit.type === "apple") {
    fruit;
  }
  if ((fruit as Apple).isGoodForBaking) {
    console.log("Was hit");
    fruit;
  }
}
const apple: Apple = {
  type: "apple",
  isGoodForBaking: true,
  ripe: true,
  color: "red",
};

const orange: Orange = {
  type: "orange",
  numOfSegments: 8,
  ripe: true,
};

pickFruit(orange);

// ....

type LoadingState = {
  status: "loading";
  progress?: number;
};

type SuccessState = {
  status: "success";
  data: { name: string; date: Date }[];
  timestamp: Date;
};

type ErrorState = {
  status: "error";
  error: Error;
  retryable: boolean;
};

type States = LoadingState | SuccessState | ErrorState;

function evaluateState(state: States) {
  state;
  if (state.status === "error") {
    state;
  }

  switch (state.status) {
    case "loading":
      state;
      break;
    case "error":
      state;
      break;
    case "success":
      state;
      break;
    default:
      state;
  }
}

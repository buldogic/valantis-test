import { auth } from "./auth";

export const paramsFilter = (params) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth,
    },
    body: JSON.stringify({
      action: "filter",
      params: params,
    }),
  };
};

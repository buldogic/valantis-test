import { auth } from "./auth";

export const paramsGetIds = (offset, limit) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth,
    },
    body: JSON.stringify({
      action: "get_ids",
      params: { offset, limit },
    }),
  };
};

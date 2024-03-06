import { auth } from "./auth";

export  const paramsItems = (id) =>  {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": auth,
    },
    body: JSON.stringify({
      action: "get_items",
      params: { ids: [...id] },
    }),
  }
  };
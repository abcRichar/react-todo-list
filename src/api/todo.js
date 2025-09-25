import HttpsRequest from "../utils/swrRequest.js";

export const getTodoList = async () => {
  const data = await HttpsRequest({
    url: "/api/todo",
    options: { method: "GET" },
    swrConfig: { revalidateOnFocus: false },
  });
  return data;
};

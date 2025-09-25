import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function HttpsRequest({ url, options = {}, ...swrConfig }) {
  return new Promise((resolve, reject) => {
    const { data, error, isLoading } = useSWR(url, fetcher, { ...swrConfig });
    if (error) {
      reject(error);
    }
    if (isLoading) {
      return;
    }
    if (data) {
      resolve(data, error, isLoading);
    }
  });
}

export default HttpsRequest;

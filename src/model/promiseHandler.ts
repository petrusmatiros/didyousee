async function promiseHandler(
  promise: Promise<any>,
  status: any
): Promise<any> {
  let isStatusPending = true;

  if (isStatusPending) {
    status.current = "pending";
  }

  return promise
    .then((response) => {
      status.current = "fulfilled";
      if (response.data.total_results === 0) {
        status.current = "rejected";
      }
      isStatusPending = false;
      return response;
    })
    .catch((error) => {
      console.log("Promise rejected: ", error);
      status.current = "rejected";
      isStatusPending = false;
      console.error("Promise rejected: ", error)
    });
}

export default promiseHandler;

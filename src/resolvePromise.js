function resolvePromise(promiseToResolve, promiseState) {
    promiseState.promise = promiseToResolve;
    promiseState.data = null;
    promiseState.error = null;
  
    if (promiseToResolve == null) {
      return "Promise is null...";
    }
  
    function saveDataACB(result) {
      if (promiseState.promise !== promiseToResolve) return;
      promiseState.data =
        result;
    }
    function saveErrorACB(err) {
      if (promiseState.promise !== promiseToResolve)
        return;
      promiseState.error = err;
    }
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
  }
  
  export default resolvePromise;
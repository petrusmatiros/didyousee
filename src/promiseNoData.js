function promiseNoData(promiseState) {

    if (!promiseState.promise) {
        return (<div>no data</div>);
    }
    
    if (!promiseState.data && !promiseState.error) {
        return (<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" class="spinningLoader"></img>);
    }
    
    if (promiseState.promise && promiseState.error) {
        return (<div class="promiseError">{promiseState.error.toString()}</div>);
    }
    
    if (promiseState.promise && promiseState.data) {
        return false;
    }
}

export default promiseNoData;
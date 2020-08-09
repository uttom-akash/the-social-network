const LoginPaths = ["/login"];

function isUserAlreadyInLoginPath() {
  let pathname = window.location.pathname
    ? window.location.pathname.toLowerCase()
    : "";

  return LoginPaths.findIndex((p) => p === pathname) >= 0;
}

function handleSuccessfulRequest(response) {
  return response;
}

function handleFailedRequest(error) {
  if (error.response) {
    let status = error.response.status;

    if (status === 401) {
      // localStorage.clear();
      // if (isUserAlreadyInLoginPath() === false) {
      //   window.location.reload();
      // }
    }
  }
  return Promise.reject(error);
}

export function WithInterceptors(axios) {
  axios.interceptors.response.use(handleSuccessfulRequest, handleFailedRequest);
  return axios;
}

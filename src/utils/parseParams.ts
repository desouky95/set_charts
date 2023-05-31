export function parseParams(
  validParams: Array<string>,
  params: URLSearchParams
) {
  const _params = new URLSearchParams();
  // console.log(_params)
  params.forEach((param, key, parent) => {
    if (validParams.includes(key)) {
      _params.set(key, param);
    }
  });
  return _params;
}

export const updateURLParam = (key: string, value: string) => {
  const params = new URLSearchParams();
  params.set(key, value);
  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', url);
};

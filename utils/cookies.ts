export const getIsCorrectCookie = (
  cookies: undefined | string,
  name: string,
  value: string | boolean | number
) => {
  if (cookies) {
    const split = cookies.split("=");
    const termIndex = split.indexOf(name) ?? null;

    if (typeof termIndex === "number" && split[termIndex + 1] === value) {
      return true;
    }
  }
  return false;
};

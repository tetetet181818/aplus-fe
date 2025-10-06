export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    return undefined; // skip on server
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

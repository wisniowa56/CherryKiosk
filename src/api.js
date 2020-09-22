const apiURL = "https://schoolwebapi.herokuapp.com/api";

export default async function req(method, url, { body, ...opts } = { body: null }) {
  const req = await fetch(apiURL + url, {
    method,
    body: body ? JSON.stringify(body) : null,
    ...opts
  });
  const r = await req.json();
  console.log(r);

  return r;
}

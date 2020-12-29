export async function fetchCMS(path) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}${path}`);
  const json = await res.json();

  return json;
}

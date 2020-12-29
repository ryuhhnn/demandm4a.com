export async function fetchCMS(path) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}${path}`);
    const json = await res.json();

    return json;
  } catch (e) {
    console.error("Error fetching from CMS: ", e);
    return {
      errors: ["Error fetching data from CMS."],
    };
  }
}

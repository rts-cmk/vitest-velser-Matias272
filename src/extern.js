export async function get(url) {
  const response = await fetch(url);
  return response.json();
}

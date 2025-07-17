let joke = '';
let isLoading = false;

async function getJoke() {
  isLoading = true;
  const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
  const data = await res.json();
  joke = data.joke;
  isLoading = false;
}
export { getJoke, joke, isLoading };
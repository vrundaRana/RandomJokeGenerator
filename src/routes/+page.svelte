<script>
  import { onMount } from "svelte";
  import JSConfetti from "js-confetti";

  let joke = "";
  let setup = "";
  let delivery = "";
  let jokeType = "";
  let isLoading = false;
  let buffer = "";
  let jsConfetti;

  async function getJoke() {
    isLoading = true;
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw",
    );
    const data = await res.json();

    jokeType = data.type;
    if (jokeType === "single") {
      joke = data.joke;
      setup = "";
      delivery = "";
    } else {
      joke = "";
      setup = data.setup;
      delivery = data.delivery;
    }

    isLoading = false;
  }

  function handleKey(event) {
    buffer += event.key.toUpperCase();
    buffer = buffer.slice(-3); // Keep last 3 characters
    if (buffer === "LOL") {
      triggerConfetti();
      setTimeout(() => {
        alert(
          "🎉 Congrats!! You found the hidden Easter egg! You're a true LOL legend!",
        );
      }, 3000);
    }
  }

  function triggerConfetti() {
    jsConfetti.addConfetti({
      confettiRadius: 6,
      confettiNumber: 500,
    });
  }

  onMount(() => {
    jsConfetti = new JSConfetti();
    window.addEventListener("keydown", handleKey);
    getJoke();
  });
</script>

<main
  class="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 flex justify-center items-center flex-col p-6"
>
  <h1
    class="text-6xl font-extrabold text-center m-4 p-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-lg"
  >
    <span class="text-black">🤣</span> Laugh <span class="text-white">Out</span>
    Loud! <span class="text-black">🤣</span>
  </h1>

  <div
    class="flex justify-center flex-col p-8 m-4 bg-white/10 backdrop-blur-md w-full max-w-3xl rounded-2xl shadow-2xl border border-white/20 hover:shadow-purple-500/30 transition-all duration-300 transform"
  >
    {#if jokeType === "single"}
      <p class="text-2xl font-bold text-center leading-relaxed">{joke}</p>
    {:else if jokeType === "twopart"}
      <p class="text-2xl font-bold text-center leading-relaxed">{setup}</p>
      <p class="text-2xl font-bold text-center leading-relaxed mt-4">
        {delivery}
      </p>
    {:else}
      <p class="text-2xl font-bold text-center leading-relaxed">
        Click the button to get a joke!
      </p>
    {/if}

    <button
      class="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 mx-auto cursor-pointer"
      on:click={getJoke}
    >
      Get Another Joke
    </button>

    <p class="text-sm text-white/60 text-center mt-4 italic">
      Psst... laughing out loud might unlock something fun. 😉
    </p>
  </div>
</main>

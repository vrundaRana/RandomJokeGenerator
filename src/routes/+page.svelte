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
function getHint(){
  alert("💡 Hint: Try typing LOL on your keyboard!")
}
  onMount(() => {
    jsConfetti = new JSConfetti();
    window.addEventListener("keydown", handleKey);
    getJoke();
  });
</script>

<main
  class="min-h-screen bg-linear-to-br from-amber-200 via-orange-400 to-red-600 flex justify-center items-center flex-col p-6"
>
  <h1
    class="text-6xl font-extrabold text-center m-4 p-4 text-transparent bg-clip-text bg-linear-to-r from-gray-800 via-blue-700 to-gray-900 drop-shadow-lg"
  >
    <span class="text-black wiggle">🤣</span> Laugh
    <span class="text-white">Out</span>
    Loud! <span class="text-black wiggle">🤣</span>
  </h1>

  <div
    class="flex justify-center flex-col p-8 m-4 bg-black/40 backdrop-blur-md w-full max-w-3xl rounded-2xl shadow-2xl border border-white/20 hover:shadow-purple-500/30 transition-all duration-300 transform font-['Poppins']"
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
        Loading...
      </p>
    {/if}

    <button
      class="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 mx-auto cursor-pointer focus:outline-none focus:ring-0"
      on:click={getJoke}
    >
      Get Another Joke
    </button>

    <p class="text-sm  text-center mt-4 italic">
      Psst... laughing out loud might unlock something fun. 😉
    </p>
    <button class="mt-6 px-3 py-1 text-sm bg-pink-500/30 hover:bg-pink-600/30 text-white rounded-full shadow w-fit mx-auto transition duration-200 cursor-pointer" on:click={getHint}>Hint</button>


  </div>
</main>

<style>
   @import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');

  h1 {
    font-family: 'Finger Paint', cursive;
  }
  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(20deg);
    }
    75% {
      transform: rotate(-20deg);
    }
  }
  .wiggle {
    animation: wiggle 1s ease-in-out infinite;
    display: inline-block;
  }
</style>

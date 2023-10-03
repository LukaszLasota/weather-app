<template>
  <section class="bg-blue-100 min-h-screen flex flex-col items-center justify-center p-5">
    <base-card>
      <div class="bg-white p-8 rounded-lg shadow-md max-w-2xl text-center">
        <h1 class="text-3xl font-bold mb-4">Witaj w Weather App!</h1>
        <p class="text-lg mb-4">🌦️ Twoje osobiste centrum prognoz pogody w zasięgu ręki.</p>
        <p class="mb-4">
          Weather App to Twoje okno na świat pogody, dostarczające aktualne informacje i prognozy na
          nadchodzące dni dla miejsc, które są dla Ciebie ważne. Czy planujesz weekendowy wypad za
          miasto, czy też po prostu chcesz wiedzieć, czy potrzebujesz parasola na spacer - jesteśmy
          tu, aby dostarczyć Ci najświeższe informacje pogodowe!
        </p>
        <h2 class="text-xl font-semibold mb-3">Dlaczego Weather App?</h2>
        <ul class="mb-4 text-left pl-5">
          <li class="mb-2">
            - <strong>Aktualne Informacje:</strong> Otrzymuj bieżące dane na temat temperatury,
            wilgotności i opadów w Twojej lokalizacji.
          </li>
          <li class="mb-2">
            - <strong>Prognoza na 16 Dni:</strong> Planuj z wyprzedzeniem dzięki naszym szczegółowym
            prognozom na kolejne dwa tygodnie.
          </li>
          <li class="mb-2">
            - <strong>Łatwa w Użyciu:</strong> Intuicyjny interfejs użytkownika sprawia, że
            śledzenie pogody jest proste i przyjemne.
          </li>
          <li class="mb-2">
            - <strong>Dla Twojej Lokalizacji:</strong> Dostosuj aplikację, aby śledzić pogodę w
            miejscach, które są dla Ciebie najważniejsze.
          </li>
        </ul>
        <h3 class="text-lg font-semibold mb-3">Jak to Działa?</h3>
        <ol class="mb-4 text-left pl-5">
          <li class="mb-2">
            1. <strong>Dodaj Lokalizację:</strong> Wprowadź nazwę miasta, aby uzyskać bieżące dane
            pogodowe oraz prognozy.
          </li>
          <li class="mb-2">
            2. <strong>Przeglądaj Prognozy:</strong> Przejrzyj prognozy na nadchodzące dni i bądź
            przygotowany na wszelkie warunki pogodowe.
          </li>
          <li class="mb-2">
            3. <strong>Personalizuj:</strong> Dodaj i zarządzaj różnymi lokalizacjami, aby
            błyskawicznie sprawdzać pogodę w różnych miejscach.
          </li>
        </ol>
        <h4 class="text-lg font-semibold mb-3">Dołącz do Nas!</h4>
      </div>
    </base-card>
  </section>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 300vh;
    display: flex;
    align-items: center;
  }
}
</style>

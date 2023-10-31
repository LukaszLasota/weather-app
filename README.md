# Wetaher App

Aplikacja pogodowa umożliwiająca sprawdzanie aktualnych warunków pogodowych oraz prognozy na nadchodzące dni dla różnych lokalizacji na świecie. Zbudowana przy użyciu - [Technologie](#technologie)

## Spis Treści

- [Funkcje](#funkcje)
- [Technologie](#technologie)
- [Instalacja](#instalacja)
- [Uruchomienie](#uruchomienie)
- [Werjsa live](#wersja-live)
- [Login do aplikacji](#login-aplikacja)

## Funkcje

### Wyświetlanie Aktualnej Pogody

- Dane dostępne dla zalogowanych użytkowników - [Login do aplikacji](#login-aplikacja)
- Wyszukiwanie miast które chcemy sprawdzić, możemy dodać lub usuwać miasta w zależności od naszych potrzeb i przesjć do ich pojedyńczej strony
- Prezentacja warunków pogodowych: temperatura, wilgotność, opady, na stronie wybranego miasta prognoza na najbliższy tydzień
- Dane dla wybranych miast aktualizują sie co 30 minut

## Technologie

- Vue 3
- TypeScript
- Pinia
- Tailwind
- Firebase
- VeeValidate
- Vue Router

## Instalacja

# Klonowanie repozytorium

git clone https://github.com/LukaszLasota/weather-app

# Przechodzenie do katalogu projektu

cd weather-app

# Utworzenie pliku .env ze zmiennymi środowiskowymi:

Z kluczem API do wygenerowania na stronie https://openweathermap.org/api

VITE_APP_OPENWEATHER_API_KEY=TU-NASZ-KLUCZ-API

Z danymi z naszego panelu firebase:

VITE_APP_API_KEY=DANE-Z-PANELU-FIREBASE
VITE_APP_AUTH_DOMAIN=DANE-Z-PANELU-FIREBASE
VITE_APP_PROJECT_ID=DANE-Z-PANELU-FIREBASE
VITE_APP_STORAGE_BUCKET=DANE-Z-PANELU-FIREBASE
VITE_APP_MESSAGING_SENDER_ID=DANE-Z-PANELU-FIREBASE
VITE_APP_APP_ID=DANE-Z-PANELU-FIREBASE
VITE_APP_MEASUREMENT_ID=DANE-Z-PANELU-FIREBASE

# Instalacja zależności

npm install

## Uruchomienie

npm run dev

## Wersja Live

https://weather-app.lukaszla.vot.pl/

## Testowy login do naszej aplikacja

test@test.pl
TestTest

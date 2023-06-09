# Planets website

#### Projekt oparty jest o technologie Nuxt 3, Pinia, Tailwind, Vite, Typescript

Wersje:

Nuxt: 3.2.2
Pinia: 2.0.32
Tailwind: 3.2.7

### Wymagania:

``Node.js 16.14.0``
``npm 8.15.1``


### Działanie

1. Dane pobierane są po stronie SSR.
2. Zanim zostaną pobrane, wyświetla się loader, który znika w momencie gdy dane są pobrane i przetworzone na odpowiednie obiekty i wartości.
3. Pobrane dane można sortować alfabetycznie, po okresie rotacji i przywrócić domyślny układ.
4. Wybrany typ sortowania i posortowane dane zapisywane są do localStorage i stamtąd pobierane jeśli istnieją.
5. Została zrobiona paginacja, która pobiera nowe dane z API bazując na wartości `page number`
6. Strona jest w pełni resposywna.

Boilerplate retards

Mikael Larsson & Häni Abu Zeid


### Screenshots
<img width="1622" alt="skarmavbild 2018-06-02 kl 10 09 23" src="https://user-images.githubusercontent.com/31956031/40872438-969de704-664e-11e8-9fbf-2fcfb1453d88.png">

<img width="376" alt="skarmavbild 2018-06-02 kl 10 17 46" src="https://user-images.githubusercontent.com/31956031/40872439-979e46e4-664e-11e8-805a-4ce2d152484c.png">

<img width="596" alt="skarmavbild 2018-06-02 kl 10 34 44" src="https://user-images.githubusercontent.com/31956031/40872565-aee61668-6650-11e8-8445-908f0d5ef01b.png">

<img width="880" alt="skarmavbild 2018-06-02 kl 10 11 41" src="https://user-images.githubusercontent.com/31956031/40872447-ab1084f8-664e-11e8-8995-b5a7386c916a.png">


https://github.com/swedenSnow/boilerplate_retards

## Krav

- [x] Man ska kunna skapa en användare via `POST /register`.

- [x] Man ska kunna hämta ut de 20 senaste inläggen via `GET /api/entries`.
- [x] Man ska kunna skapa ett inlägg via `POST /api/entries`.
- [x] Man ska kunna hämta ut ett enskilt specifikt inlägg via `GET /api/entries/{ID}`.
- [x] Man ska kunna ta bort ett enskilt specifikt inlägg via `DELETE /api/entries/{ID}`.
- [x] Man ska kunna uppdatera ett enskilt specifikt inlägg via `PATCH /api/entries/{ID}`.

- [x] Man ska kunna hämta alla inlägg som en användare har skrivit via en endpoint.
- [x] Man ska kunna hämta de 20 senaste kommentarerna via `GET /api/comments`.
- [x] Man ska kunna skapa en kommentar via `POST /api/comments`
- [x] Man ska kunna hämta ut en enskild specifik kommentar via `GET /api/comments/{ID}`
- [x] Man ska kunna ta bort en enskild specifik kommentar via `DELETE /api/comments/{ID}`
- [x] Man ska kunna hämta alla kommentarer kopplat till ett inlägg via en endpoint.
- [x] Man ska kunna hämta alla användare via `GET /api/users`.
- [x] Man ska kunna söka efter ett viss inlägg via vad dess titel är.
- [x] På varje endpoint där man kan få flera resurser tillbaka (t.ex. `GET /api/entries`) så ska man kunna ange hur många resurser man ska få tillbaka.
- [x] Det ska finnas ett enklare gränssnitt i HTML,CSS och JavaScript där man kan hantera att alla resurser. Formulär för att lägga till en ny resurs, knappar för att ta bort en viss resurs och formulär för att uppdatera en viss resurs. Detta betyder att man ska kunna manipulera alla resurser som finns i APIet via det grafiska gränssnittet.
- [x] Koden är korrekt indenterad, kommenterad vid behov och väl namngiven.


## Krav för VG

- [x] Koden är välstrukturerad och håller hög nivå både i gränssnittet och i det bakomliggande APIet. Det ska inte ligga kvar något "utvecklingskod" och produkten ska kännas färdig. Minimal upprepning av kod och det är tydligt vad varje del i applikationen gör. Gränssnittet är användarvänligt och lättförstått.
- [x] APIet kan även hantera att man kan gilla ett inlägg.
* Rollbaserad autentisering. Man kan ha två olika roller som en användare: `admin`/`user` och dessa har olika rättigheter. Ni begränsar användaren på något sätt så att denna inte kan t.ex. ta bort vad som helst medan en `admin` kan göra vad som helst med APIt.

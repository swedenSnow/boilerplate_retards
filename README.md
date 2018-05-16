Boilerplate retards

Mikael Larsson
Häni Abu Zeid
Gabriel Lundmark

https://github.com/swedenSnow/boilerplate_retards

## Krav

- [ ] Man ska kunna skapa en användare via `POST /register`.

- [ ] Man ska kunna hämta ut de 20 senaste inläggen via `GET /api/entries`.
- [ ] Man ska kunna skapa ett inlägg via `POST /api/entries`.
- [ ] Man ska kunna hämta ut ett enskilt specifikt inlägg via `GET /api/entries/{ID}`.
- [ ] Man ska kunna ta bort ett enskilt specifikt inlägg via `DELETE /api/entries/{ID}`.
- [ ] Man ska kunna uppdatera ett enskilt specifikt inlägg via `PATCH /api/entries/{ID}`.

- [ ] Man ska kunna hämta alla inlägg som en användare har skrivit via en endpoint.
- [ ] Man ska kunna hämta de 20 senaste kommentarerna via `GET /api/comments`.
- [ ] Man ska kunna skapa en kommentar via `POST /api/comments`
- [ ] Man ska kunna hämta ut en enskild specifik kommentar via `GET /api/comments/{ID}`
- [ ] Man ska kunna ta bort en enskild specifik kommentar via `DELETE /api/comments/{ID}`
- [ ] Man ska kunna hämta alla kommentarer kopplat till ett inlägg via en endpoint.
- [ ] Man ska kunna hämta alla användare via `GET /api/users`.
- [ ] Man ska kunna söka efter ett viss inlägg via vad dess titel är.
- [ ] På varje endpoint där man kan få flera resurser tillbaka (t.ex. `GET /api/entries`) så ska man kunna ange hur många resurser man ska få tillbaka.
- [ ] Det ska finnas ett enklare gränssnitt i HTML,CSS och JavaScript där man kan hantera att alla resurser. Formulär för att lägga till en ny resurs, knappar för att ta bort en viss resurs och formulär för att uppdatera en viss resurs. Detta betyder att man ska kunna manipulera alla resurser som finns i APIet via det grafiska gränssnittet.
- [ ] Koden är korrekt indenterad, kommenterad vid behov och väl namngiven.


## Krav för VG

* Koden är välstrukturerad och håller hög nivå både i gränssnittet och i det bakomliggande APIet. Det ska inte ligga kvar något "utvecklingskod" och produkten ska kännas färdig. Minimal upprepning av kod och det är tydligt vad varje del i applikationen gör. Gränssnittet är användarvänligt och lättförstått.
* APIet kan även hantera att man kan gilla ett inlägg.
* Rollbaserad autentisering. Man kan ha två olika roller som en användare: `admin`/`user` och dessa har olika rättigheter. Ni begränsar användaren på något sätt så att denna inte kan t.ex. ta bort vad som helst medan en `admin` kan göra vad som helst med APIt.

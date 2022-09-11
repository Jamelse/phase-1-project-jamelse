# GOT Random Quote Generator
- Great source of random quotes from the TV show, "Game of Thrones" based on the book series, "A Song of Ice and Fire" byt George R. R. Martin.

# Features

- Clicking the "Get Random GOT Quote" button at the top generates a random Game of Thrones quote from the show! The quote contains the actual quote, the character the quote came from, an image of the character (if applicable) and the house sigil for that character (if applicable).

- Contains a local JSON server that if you start up (json-server --watch db.json).

- Each random quote card you generate contains a like button. This like button when pressed will push that liked quote onto your local JSON server, then onto your liked quotes page!

- Clicking the "LIKED QUOTES" button brings up the rendered page of your local JSON sever, which is also the quotes you've liked!

- Each quote liked will display on the page will display its own container with the quote, the character that said it, and a remove button. 

- The remove button uses a DELETE request and when pressed, removes the quote from your local JSON server, and the page as well.

- The page also contains a RESET button that will refresh the page and bring you to the home page.

# Thanks + acknowledgment
-Special thanks to the creators of https://gameofthronesquotes.xyz/ and
https://api.got.show/ for their hard work on the APIS. Also thanks to my friends Bogdan and Ollie for the help.

# License 
MIT License

Copyright (c) 2022 Jacob M. Amelse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
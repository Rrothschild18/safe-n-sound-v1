# safe-n-sound-v1
# DESCRICAO DO PROJ :
Projeto feito com o intuito de aprender um pouco a como criar uma API e consumir dados do Spotifty atraves do express.js. 
A ideia original era implementar um sistema com HTML CSS JS puro no front e MongoDB e Express no back para realizar a transferencia de musicas do Spotify para o Youtube ou vice-versa.

Infelizmente ficou extremamente dificil implementar um Front End capaz de gerar animacoes, fazer requisoes HTTP, e armazenar estados sem um framework para o CSS e pro JS. Acabou que descontinuei o projeto.


# TODO LIST
1 - Criar BD no MongoDB, cadastrar usuario e pensar quais outras informacoes relevantes para realizar a a transferencias das musicas de uma plataforma para outra.

2 - Aprender e implementar a lib Pass.port.js para autenticar requisicoes do front para o back, e tambem realizar login atraves de Redes Sociais (Gmail, Youtube)

3 - Implementar todo o Front End da pagina de transferir musicas

4 - Autenticar tds as rotas

5 - Refatorar todo JS do Front

6 - Adicionar um .ENV

# Acredito que eu va implementar o front usando React, estudando pra isso

# Como rodar:
Va em https://developer.spotify.com/

Se nao tiver um conta crie, logo depis va em `Dashboard` e criei um App e subistitua seu `CLIENT_ID` e `CLIENT_SECRET` em models/token.js

Depos na pasta raiz :

npm install  // dependencias do gulp, express, nodemon, axios, cors etc.

npm start -- localhost:3000

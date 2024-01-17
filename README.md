
# Food-Explorer UI

Projeto de conclusão do curso Explorer da Rocketseat, projeto visa simular o cardápio de um restaurante com controle de roles do usuário logado onde o usuário padrão de cliente com a role "customer" vai poder apenas vizualizar os pratos cadastrados e simular um pedido a esse restaurante, "usuário" com role de editor irá poder adicionar e editar pratos já cadastrados e por fim o usuário com role de "admin" terá o mesmo acesso da role de "editor" com acrescento de uma página para gestão de usuários já cadastrados e possibilidade de adicionar novos ingredientes.

Além do exigido tomei liberdade para adicionar algumas coisas, por exemplo a separação da role de "admin" e de "editor" já que era exigido apenas o editor, o processamento do pedido também não era exigido, além disso também restringi a seleção dos ingredientes na criação ou edição de um prato apenas com ingredientes que já existem no banco usando uma tabela pivot que armazena a relação entre as tabelas de pratos com a de ingredientes, dessa forma elimino a possibilidade do usuário editor cadastrar ingredientes repetidos.



## Informações

Como falei anteriormente à uma tabela a mais do que o necessário no banco para armazenar a relação entre os pratos e os ingredientes, dessa forma cada prato pode ter N ingredientes e cada ingrediente pode ter N pratos. Além disso rotas para editar usuários e criação de ingredientes a parte.

Na raiz do projeto eu deixei o arquivo de collection do Postman para ser importado ao seu Postman e conseguir entender melhor as rotas da API.

Lembrando que na versão gratuita do Render se a API ficar um tempo ociosa ela desativa, então tenha pacienca ao executa-la pela primeira vez até ela ficar ativa novamente.


## Usuários existentes para testes

 - Customer - customer@email.com - 654321
 - Editor - editor@email.com - 123456
 - Admin - admin@email.com - 123456


## Stack utilizada

[**Front-end:**](https://github.com/kenaioz/food-explorer-ui) React, Styled-Components

[**Deploy:**](https://main--cool-kitten-558d66.netlify.app/) Netlify


[**Back-end:**](https://github.com/kenaioz/food-explorer-api) Node, Express, SQLite

[**Deploy:**](https://food-explorer-api-ihgd.onrender.com) Render


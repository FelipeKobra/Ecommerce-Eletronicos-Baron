# Introdução

Bem vindo, sou Felipe, comecei a estudar programação faz 3 meses e esse é meu primeiro projeto "grande"

Vou tentar deixar tudo o mais didático possível sobre tudo o que considero relevante para entender esse projeto se tiver alguma dificuldade em entender alguma parte. Também vou esclarecer as partes que tive mais problemas para fazer funcionar e dicas que considero útil!

## Instalação

### 1 - Clonar o repositório
``git clone https://github.com/FelipeKobra/Ecommerce-Eletronicos-Baron.git``

### 2 - Instalar as dependências
``npm install`` ou ``npm i``

### 3 - Iniciar o servidor de desenvolvimento
``npm run dev``

## Deploy

### Domínio
https://baron-nu.vercel.app

## Observações
Preferi realizar o deploy na plataforma da Vercel, pois tem maior compatibilidade com aplicações Next.js e o próprio sistema de armazenamento integrado com os projetos.
<hr>

# Desenvolvimento

Nessa sessão deixarei tudo mais explícito de como as partes mais críticas do projeto foram feitas da forma mais detalhada possível!

## Database

### Observações
Prefiro utilizar banco de dados SQL, já que para mim, apesar de as interações serem feitas de forma mais específica e não ter tanta "flexibilidade", deixa o projeto mais organizado e mais difícil de causar problemas futuros com um banco de dados maior, já que, por ser mais criterioso, deixa mais explícito o que está acontecendo na interação.

### ORM
Para esse projeto utilizei a ORM `Prisma` que é muito utilizada em projetos Next.js e torna mais fáceis as interações com o banco de dados, já que permite criar esquemas que podem ser alterados facilemente e manipulação de dados única, que permite realizar condições mais específicas de forma mais fácil e direta na interação com a database.

Isso evita ter que criar funções para especificar valores após receber as informações e aumentar o tráfego do banco de dados desnecessariamente por pegar muitos valores sem uso.

### Instalação
1. ``npm install @prisma/client``
2. ``npx prisma generate`` - Para gerar o primeiro cliente do Prisma

### Configuração
No servidor de desenvolvimento como utilizamos um único servidor é uma boa prática ter apenas um `Client` para o todo o projeto, para evitar o esgotamento do banco de conexões e evitar lentidão e uso desnecessário de interações com o banco de dados. Isso não é problema em para o modo de produção do aplicativo Web, já que o site pode estar hospedado em vários servidores e cada um tem que ter sua própria instância do `Client`.

Por isso crio uma instância, que verifica se o Client já existe, caso exista utiliza o já existente, caso não exista ele cria um novo `Client`:
```
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
```

Então sempre que precisar usar o prisma vou utilizar esse client exportado.

Sempre que vou interagir com a Database você irá observar que importo `prisma` desse arquivo encontrado em minhas `libs`, porém se trata desse client, que troco o nome para ficar mais didático e fácil de saber com o que estou lidando.

### Conexão com Banco de Dados
Para conectar o Prisma à sua database é bem simples.

1.Quando me referir a `schema` se trata do arquivo `schema.prisma` localizado na pasta `prisma` localizada no diretório raiz do projeto. Caso esteja fazendo um projeto por conta própria e a pasta não foi adiciona é só criar ela e o arquivo com os mesmos nomes especificados: `/prisma/schema.prisma`. Tem a documentação melhor [aqui](https://www.prisma.io/docs/orm/prisma-schema/data-model/models), mas o necessário no começo é somente a conexão com a Database:
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

2.Por padrão o prisma já vem com a configuração do postgresql, e precisamos adicionar somente a `connection string`, que é basicamente uma forma direta de conexão com sua Database previamente criada no PostgreSQL, como ela possui informações de nome de usuário e senha, recomendo adicionar essas informações no `.env` como fiz, porém o padrão seria feito dessa forma em seu schema:
```
datasource db {
  provider = "postgresql"
  url = postgres://NomeDeUsuário:SuaSenha@Hostname(localhost em nosso caso):5432/NomeDaDatabase 
}
```

### Schema

O schema além da conexão com o banco de dados e configuração do `Client` também estabelece o modelo de seu Banco de Dados, então, se não tiver criado as tabelas de seu banco de dados ainda, recomendo que não crie ainda, para criar utilizando o Prisma.

1. Primeiramente vou modelo dos produtos. O esquema dos produtos foi utilizado com base em `nesting` em que cada produto possuí suas variedades, com suas respectivas cores e preço, e suas avaliações dos usuários, com seus respectivos comentários, notas e informações básicas do usuário, gerando muitas relações `One-to-Many` e `Many-to-One`, além de interações `One-to-One` como no caso dos endereços dos pedidos.

2. Depois de analisar a melhor organização para estabelecer em seu banco de dados temos que criar os modelos dos usuários. No meu caso preferi utilizar o [modelo do NextAuth](https://authjs.dev/reference/adapter/prisma?_gl=1*1qb2j64*_gcl_au*MTA0NTQ1MjMxNC4xNzA2MTI4MDc5LjI1ODkyMTQ1MS4xNzA2MTQ4OTQ5LjE3MDYxNDg5NjM.), porém sem `Session` e `VerificationToken`, já que preferi lidar com privação de rotas por Middleware e não utilizei Tokens de Verificação para aprovação do usuário em meu aplicativo, já que só traria mais etapas desnecessárias para um projeto de estudo. Porém são muito importantes em aplicações reais, já que ajuda a manter o controle de sessões e possibilita realizar mais tipos de verificações futuras.

3. Gerar as Tables na database após criar o esquema por meio do `npx prisma db push`

4. Gerar um novo `Client` para ter certeza que ele recebe todas as novas informações por meio do `npx prisma generate`

#### Observações

1. O prisma por padrão não aceita variáveis encontradas no `.env.local`, então para utilizar variáveis de ambiente só é possível se:
   1. Utilizar `.env` ao invés de `.env.local` ou
   2. Configurar cada interação do prisma para utilizar `.env.local` por meio dessa [documentação](https://www.sammeechward.com/prisma-and-nextjs)
      OBS: Acho desnecessário esse segundo item, portanto fiz da primeira forma
  
2. Caso queira utilizar o modelo de usuários do NextAuth, o nome de cada Table deve ser seguido como o descrito na documentação.

3. Na interação direta no banco de dados do postgreSQL, utilizando pgAdmin, por exemplo, o nome das tables tem que ser envolvido com aspas. Portanto no caso de selecionar todas as tabelas do `User` ficaria `SELECT * FROM "User"` durante o uso da Query 
  

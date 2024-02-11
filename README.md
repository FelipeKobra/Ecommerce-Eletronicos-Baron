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

1. Quando me referir a `schema` se trata do arquivo `schema.prisma` localizado na pasta `prisma` localizada no diretório raiz do projeto. Caso esteja fazendo um projeto por conta própria e a pasta não foi adiciona é só criar ela e o arquivo com os mesmos nomes especificados: `/prisma/schema.prisma`. Tem a documentação melhor [aqui](https://www.prisma.io/docs/orm/prisma-schema/data-model/models), mas o necessário no começo é somente a conexão com a Database:
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

2. Por padrão o prisma já vem com a configuração do postgresql, e precisamos adicionar somente a `connection string`, que é basicamente uma forma direta de conexão com sua Database previamente criada no PostgreSQL, como ela possui informações de nome de usuário e senha, recomendo adicionar essas informações no `.env` como fiz, porém o padrão seria feito dessa forma em seu schema:
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

<hr>

## Autenticação

Para realizar a autenticação do projeto utilizei o NextAuth, já que ele possui como foco o Next.js e tem muitas features que possibilitam realizar autenticações mais flexíveis e fáceis de utilizar.

### Instalação

``npm install next-auth``

### Configuração

Ainda há alguns conflitos com o novo sistema de `App Routing` do Next.js com o NextAuth, portanto preferi o sistema de `Page Routing` para hospedar a api.

#### Criar Configuração

Para criar a configuração do NextAuth, utilizei o `Page Routing`, como explicitado anteriormente, e adicionei o arquivo `[...nextauth].ts` na rota `/pages/auth`, ou seja, `/pages/auth/[...nextauth].ts` como explicitado na [documentação](https://next-auth.js.org/getting-started/example), e criar a função NextAuth, porém recomendo que copie a função da documentação.

#### Prisma Adapter

Depois de criar a `API Route` é importante adicionar o `Prisma Adapter` ao NextAuth, que é um "adaptador" que permite que o NextAuth interaja com nosso banco de dados por meio do Prisma, fazendo assim com que tenhamos acesso à funções próprias do NextAuth e torne seu uso realmente útil para nós

Toda a [documentação](https://authjs.dev/reference/adapter/prisma?_gl=1*gwftn5*_gcl_au*MTA0NTQ1MjMxNC4xNzA2MTI4MDc5LjI1ODkyMTQ1MS4xNzA2MTQ4OTQ5LjE3MDYxNDg5NjM.) deixa bem claro como realiza a instalação, porém mostrarei somente o necessário:

1. Primeiro temos que instalar o Adapter:
```
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

2. Depois temos que adicionar o Adapter à nossa configuração, deixando ela como primeiro parâmetro da função principal, e fazendo referência ao nosso client do prisma criado anteriormente:
```
export default NextAuth({
  adapter: PrismaAdapter(prisma),
...
```

#### Google Provider
Google Provider é utilizar o Google OAuth como forma de autenticação

1. Primeiramente você precisa criar uma conta no [Google Cloud](cloud.google.com) e criar um projeto, não precisa adicionar informações bancárias.

2. Acessar a aba de API's e depois na aba de credenciais

3. Depois é necessário que você crie uma credencial para o projeto, não precisa adicionar nenhum escopo, já que as informações básicas do usuário já são suficientes para o projeto.

4. Durante o processo de criação da credencial ele pedirá para você adicionar um endpoint, que será `http://localhost:3000/api/auth/callback/google` para o desenvolvimento, como padronizado na [documentação](https://next-auth.js.org/providers/google)

5. Após a criação das credenciais só é necessário pegar o seu ID de cliente e seu Secret e adicionar nas respectivas variáveis de ambiente `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`

  OBS: caso você não tenha utilizado a configuração padrão do NextAuth, que já vem com o Google Provider, é só adicionar como parâmetro do seu NextAuth nas configurações:
  ```
providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
```

#### Credentials Provider
Essa é a forma de autenticação local, em que você define quais informações serão utilizadas como base para que ocorra a autenticação e quais serão os testes que essas informações terão que passar para o usuário conseguir entrar

1. Criar o `Credentials Provider`, adicionando um nome para seu credenciamento:
   ```
   CredentialsProvider({
      name: "credentials",
   ```


2. Depois precisamos definir quais as variáveis serão utilizadas para realizar essa autenticação, no meu caso preferi utilizar o email e senha, já que o email pode ser utilizado como base para relacionar um usuário à várias contas, já que, normalmente, um usuário utiliza o mesmo email para várias contas em diferentes sites:
   ```
   CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
   ```

   #### Authorize
   Essa função serve para definir em quais situações um usuário está aprovado ou não para entrar em uma conta.

   1. No meu caso verifico se a conta existe e se a senha está correta, comparando a senha "hasheada" com a digitada, caso algo dê errado eu utilizo `throw new Error("mensagem");` para "jogar" um erro e uma mensagem explicando qual foi o erro que aconteceu na autenticação
  
   2. Se tudo estiver correto você retorna todas as informações do usuário. Utilizando o NextAuth não tem problema retornar tudo sobre o usuário, pois, por padrão, ele não guarda informações sensíveis, como senhas, nos cookies e/ou sessão. Porém, por precaução, eu retorno somente informações que considero normais e necessárias para se guardar no cookie.
  

#### Hooks

Agora é fácil pegar informações do usuário por meio do Hook `useSession`, realizar o login por meio do `SignIn` e outros hooks.

## Formulários de Autenticação

### Schema

1. Novamente um schema, mas dessa vez é o schema do `zod`, que serve para especificar os limites e cada campo e seus tipos de informação, por exemplo.

No meu caso de login utilizei esse `schema`:
```
const signInSchema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .max(254, "Email não pode passar de 254 caracteres"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha não pode ser maior que 100 caracteres")
    .refine(
      passwordHasRequiredChars,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    ),
});
```

2. Depois temos que instalar o `Resolver` do zod, o qual podemos utilizar depois com o `UseForm` para melhor gerenciamento das informações do Form por meio [desse pacote](https://www.npmjs.com/package/@hookform/resolvers/v/1.3.7)

3. Após isso temos que utilizar o useForm, utilizando o zodResolver, com nosso `schema` criado previamente:
   ```
    const {
    register,
    handleSubmit,
    formState: { errors },
   } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
   });
   ```
   *Depois explicarei para que serve cada item desses além do zodResolver, porém o "onBlur" só significa que ele mostrará os erros de formulários após tirarmos o foco de um input, ou seja, clicar fora, por exemplo.*

 4. Depois de deixar tudo configurado agora temos que, em cada campo adicionar seu respectivo register, que mostra à qual item do nosso `schema` que se refere aquele campo, então no caso abaixo, quando esse formulário for enviado, as informações que está nesse `input` serão consideradas as informações do email:
    ```
        <form>
          <input
        type="email"
        placeholder="email"
        className={`w-full input input-lg input-bordered focus:border-base-content focus:outline-none }
        {...register("email")}
      />
    <form>
    ```

5. Ao declarar nosso `formState` no `useForm` também definimos como serão chamados os erros de nosso formulário, portanto é muito comum ver declarações como essa:
```
 {errors.email && (
        <p className="text-error select-none text-xl font-semibold">
          {errors.email.message}
        </p>
      )}
```
Que basicamente verificam se há algum erro, e, caso haja, ele exibe um parágrafo com a mensagem do erro.

Por padrão o zod já exibe mensagens de erro, mas você pode mudá-las como fiz no esquema mostrado anteriormente `.min(8, "Senha deve ter no mínimo 8 caracteres")` e/ou utilizar um [pacote](https://github.com/aiji42/zod-i18n) de tradução de mensagens do zod que utilizo algumas vezes em meu projeto

6. Depois dessas configurações do formulário temos que definir para onde essas informações pegas irão por meio do `handleSubmit` que também foi importado junto com o useForm, seu uso é bem simples, você adiciona ele em seu `<form>` e especifica para qual função os valores irão, no caso abaixo ele irá para a função chamada `onSubmit`:

   ```
         <form
        className="flex flex-col gap-8 items-center  w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
   ```
   
7. Agora é só utilizarmos o `signIn` providenciado pelo NextAuth e definirmos o que acontece se a pessoa for autorizada ou não, caso seja, eu redireciono para a página de login, caso não, eu utilizo o [toast](https://react-hot-toast.com) e mostro o erro devolvido pelo NextAuth que definimos no `authenticate` pelo `throw new Error()`:

   ```
    const callBack = await signIn("credentials", {
    ...formValues,
    redirect: false,
   });setIsLoading(false);
   if (callBack?.ok) {
    router.push("/cart");
    router.refresh();
    toast.success(`Bem Vindo de Volta!`);
   }
   if (callBack?.error) {
    toast.error(callBack.error, { id: "LoginError" });
   }
   ```
*Lembrando que utilizamos o "credentials", pois é o nome que definimos para o Credentials Provider*

8. Por fim, se quisermos utilzar nosso `Google Provider` é só adicionarmos um `signIn("google")` no botão que quisermos realizar a autenticação pelo Google, e para sair da conta, basta adicionar `signOut()` no botão que quisermos utilizar para esse fim. Recomendo utilizar o `onClick()` nesses casos.

  

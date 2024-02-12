# Introdução

Bem vindo, sou Felipe, comecei a estudar programação faz 3 meses e esse é meu primeiro projeto "grande"

Vou tentar deixar tudo o mais didático possível sobre tudo o que considero relevante para entender esse projeto se tiver alguma dificuldade em entender alguma parte. Também vou esclarecer as partes que tive mais problemas para fazer funcionar e dicas que considero útil!

## Lista de Conteúdo
- [Introdução](#introdução)
  - [Lista de Conteúdo](#lista-de-conteúdo)
  - [Instalação](#instalação)
  - [Deploy](#deploy)
- [Desenvolvimento](#desenvolvimento)
  - [Database](#database)
  - [Autenticação](#autenticação)
  - [Formulários de Autenticação](#formulários-de-autenticação)
  - [Página do Produto](#página-do-produto)
  - [Carrinho](#carrinho)
  - [Pagamento](#pagamento)

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
<hr>
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
```typescript
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
```typescript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

2. Por padrão o prisma já vem com a configuração do postgresql, e precisamos adicionar somente a `connection string`, que é basicamente uma forma direta de conexão com sua Database previamente criada no PostgreSQL, como ela possui informações de nome de usuário e senha, recomendo adicionar essas informações no `.env` como fiz, porém o padrão seria feito dessa forma em seu schema:
```typescript
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
```bash
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

2. Depois temos que adicionar o Adapter à nossa configuração, deixando ela como primeiro parâmetro da função principal, e fazendo referência ao nosso client do prisma criado anteriormente:
```typescript
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
  ```typescript
providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
```

#### Credentials Provider
Essa é a forma de autenticação local, em que você define quais informações serão utilizadas como base para que ocorra a autenticação e quais serão os testes que essas informações terão que passar para o usuário conseguir entrar

1. Criar o `Credentials Provider`, adicionando um nome para seu credenciamento:
   ```typescript
   CredentialsProvider({
      name: "credentials",
   ```


2. Depois precisamos definir quais as variáveis serão utilizadas para realizar essa autenticação, no meu caso preferi utilizar o email e senha, já que o email pode ser utilizado como base para relacionar um usuário à várias contas, já que, normalmente, um usuário utiliza o mesmo email para várias contas em diferentes sites:
   ```typescript
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

<hr>
## Formulários de Autenticação

### Schema

1. Novamente um schema, mas dessa vez é o schema do `zod`, que serve para especificar os limites e cada campo e seus tipos de informação, por exemplo.

No meu caso de login utilizei esse `schema`:
```typescript
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
   ```typescript
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
    ```jsx
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
```jsx
 {errors.email && (
        <p className="text-error select-none text-xl font-semibold">
          {errors.email.message}
        </p>
      )}
```
Que basicamente verificam se há algum erro, e, caso haja, ele exibe um parágrafo com a mensagem do erro.

Por padrão o zod já exibe mensagens de erro, mas você pode mudá-las como fiz no esquema mostrado anteriormente `.min(8, "Senha deve ter no mínimo 8 caracteres")` e/ou utilizar um [pacote](https://github.com/aiji42/zod-i18n) de tradução de mensagens do zod que utilizo algumas vezes em meu projeto

6. Depois dessas configurações do formulário temos que definir para onde essas informações pegas irão por meio do `handleSubmit` que também foi importado junto com o useForm, seu uso é bem simples, você adiciona ele em seu `<form>` e especifica para qual função os valores irão, no caso abaixo ele irá para a função chamada `onSubmit`:

   ```jsx
         <form
        className="flex flex-col gap-8 items-center  w-11/12"
        onSubmit={handleSubmit(onSubmit)}
      >
   ```
   
7. Agora é só utilizarmos o `signIn` providenciado pelo NextAuth e definirmos o que acontece se a pessoa for autorizada ou não, caso seja, eu redireciono para a página de login, caso não, eu utilizo o [toast](https://react-hot-toast.com) e mostro o erro devolvido pelo NextAuth que definimos no `authenticate` pelo `throw new Error()`:

   ```typescript
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

<hr>
## Página do Produto

### Estilização

1. Para ter a primeira noção de como estilizar sua página, primeiro você precisa ter uma noção do que será feito nela, portanto tem que pensar no meu caso tive que pensar no:
- Título do Produto
- Descrição
- Preço
- Troca de Cores
- Reviews
- Imagem

e suas funcionalidades.

2. Depois de ter essa noção é basicamente utilizar uma forma que você sabe que no final se tornará algo fácil ou minimamente razoável de ser responsivo e de forma organizada. No meu caso prefiro utilizar *Grid* e *Flexbox* na maior parte do projeto, pois tenho mais noção da funcionalidade e sei que, para tornar responsivo depois é muito mais prático do que utilizar *float*, por exemplo.

3. Tudo isso que falei já tem que ser pensando na funcionalidade, pois se fizer algo muito complexo, o projeto fica confuso com o passar da produção, a menos que se tenha tudo organizado desde o começo.

### Funcionalidade

Essa é uma parte mais complicada, pois depende de como a Database foi organizada e como manejar essas informações.

1. No começo recomendo utilizar um JSON como se fosse as informações do banco de dados recebidos, e ter sempre na cabeça que àquelas informações não serão permanentes, portanto, não deixar algo complicado para você do futuro ter dificuldade de entender, como foi meu caso.

2. É bom saber como cada tipo de funcionalidade será praticada no futuro, quais partes serão [SSR](https://nextjs.org/docs/app/building-your-application/rendering/server-components) e quais serão [CSR](https://nextjs.org/docs/app/building-your-application/rendering/client-components), pois isso me deu muito trabalho para mudar futuramente.

3. No caso do item anterior me referia principalmente à manipulação com a Database, já que você não consegue utilizar o prisma em um componente que é CSR, somente SSR ou por meio de uma `API Route`. Portanto tentava muitas vezes manipular os dados do banco de dados por meio do UseEffect em componentes CSR, o que [não é possível](https://github.com/prisma/prisma/issues/6219). Portanto se quiser manipular seu banco de dados em um CSR é necessário utilizar de `API Routes` em sua aplicação, ou manejar as informações em um componente pai que é SSR e passar para esse componente, o que não foi possível em meu caso, já que precisava de uma variável que usava `useContext`, que é um Hook, ou seja, só pode ser utilizado em CSR.

4. Após todo esse pensamento e planejamento, está na hora da ação. na maior parte dessa sessão utilizo de useStates, que é um Hook que possibilita criar variáveis que conseguem mudar sem necessidade de a página precisar recarregar. Saber usar `useStates` é de extrema importância, já que em muitas partes do projeto eles são de grande ajuda e, na maioria das vezes, necessários. Uma atitude que aprendi a ter é sempre declarar o `State` no componente que está utilizando, ainda mais se ele for resultado de um `.map`, pois ele consegue mudar seu estado individualmente sem afetar os outros componentes, porém em meu projeto muitas vezes deixei um `useState` em um componente pai e alterava no filho, mas isso ocorreu quando precisava das informações dessa variável além daquele componente.

*Dica: Utilize sempre keys em componentes frutos de `.map` que permanecem com os mesmos valores após o re-render, não utilize funções com números aleatórios como Math.random() ou v4() para gerar um UUID*

5. No meu caso eu deixei cada imagem, preço, cor e estoque na variável do meu produto, com isso quero dizer, tenho um produto que é um celular, as informações como *nome, descrição, marca e categoria* eu deixei como `TABLES` do banco de dados do produto principal, pois são informações que não variam de uma cor para outra, por exemplo. Porém, para as variáveis, cada uma tinha um valor para àquelas características que comentei antes, como *preço, cor e imagem*, portanto torna muito mais fácil de manipular no uso geral, e isso não muda para a nossa página do produto.

6. No nosso caso os produtos que mostro na página são todos baseados nessa organização. Então quando puxo do banco de dados puxo um produto e todas suas relações com as outras tabelas utilizando o [include](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries) no Prisma. Isso facilita muito, pois já tenho todas as informações do Produto principais, como Nome e descrição, e para disponibilizar as variáveis desse produto eu deixo como padrão a primeira variável `variavel[0]` e quando clico para mudar a cor ele apenas troca para a posição da variável clicada.

7. Como é mudar uma variável em tempo real, a primeira informação que temos que lembrar é do `useState`, no qual crio uma variável que será o *index* da variável, ou seja, inicializo a variável como a primeira: `useState(0)`, e para cada botão de cor adiciono a função `onClick(mudarEstadoPara(index))`, o que fará com que tudo no site que utiliza a variável com aquele estado, mude para o estado referido. No meu caso eu adicionei o index durante o próprio uso do `.map`:

   ```jsx
    {variaveis.map((variavel, index: number) => {
        const nomeCor = variavel.color;
        const codigoCor = variavel.colorCode;
        return (
          <div key={variavel.id} className="tooltip" data-tip={nomeCor}>
            <button
              onClick={() => setImageIndex(index)}
              style={{ backgroundColor: `${codigoCor}` }}
              className={` w-[2rem] h-[2rem] border-solid border-4 ${
                index === imageIndex && "border-teal-400"
              }  rounded-full hover:border-base-content duration-200  `}
            />
          </div>
        );
      })}
   ```

   Porém você pode fazer por meio de `id` ou `name` em um botão com o index da variável desejada, mas desse jeito acho mais fácil e prático de ser manipulada, pois utiliza do próprio `.map` para isso

8. Para adicionar os produtos no Carrinho utilizei do LocalStorge, utilizava uma função criada por meio de um Provider que criei e falarei posteriormente, pego essa função do provider por meio do `useContext`, o qual ele adiciona informações básicas do produto no LocalStorage para saber à qual produto estou me referindo durante a compra, sua variável e quantidade. Se torna muito mais fácil de manejar essas informações se colocar todas as informações da variável e do produto no Local Storage, mas não faça isso, pois ocupa muito espaço desnecessário no Local Storage e são informações que podem ser alteradas facilmente por meio da aba `Application` no *Dev Tools* da maioria dos browsers. Portanto, apesar de, na hora do checkout, você poder verificar essas informações no backend para não deixar alguem alterar o preço, por exemplo, é sempre bom ter redundância e segurança no que se está fazendo.

9. Para adicionar as reviews é bem mais tranquilo, é necessário somente organizar cada variável de Review do `.map` em um componente, porém no meu caso preferi mostrar nada caso não tenha avaliações.

<hr>
## Carrinho

O sistema do carrinho, apesar de parecer simples, preferi organizar muito bem seu funcionamento e deixar várias funções que facilitasse seu uso, além de variáveis para todo o aplicativo.

### Provider

O Provider é basicamente um conjunto de funções e variáveis que você pode utilizar em toda a sua aplicação, após adiciona-lo em um [Context](https://react.dev/reference/react/useContext). 

1. Para criar um Provider é só criar uma função com as funçoes e variáveis que desejar dentro dela.

2. Depois você retorna esses valores da função por meio de um componente `wrap`, e adiciona as variáveis que deseja compartilhar na sua aplicação dentro do atributo `value`, lembrando que esse componente tem que possuir o nome do futuro context e com *.Provider* no final, ou seja, no caso abaixo o nome do context é LocalStorageContext e será utilizado para qualquer manipulação com o Local Storage faço para o carrinho e tema da aplicação:
   ```jsx
     return (
    <LocalStorageContext.Provider
      value={{
        setTema,
        tema,
        cartVolume,
        cartItems,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
   );
   ```

3. Depois de criar o Provider é só utilizar o `CreateContext` para criar seu Context, lembrando que tem que possuir o mesmo nome que você deu para o componente no provider, e com os valores adicionados como `value` também:
   ```typescript
   export const LocalStorageContext = createContext<LocalStorageContextType>({
   setTema: (value: string) => null,
   tema: "",
   cartVolume: 0,
   cartItems: null,
   });
   ```
  *Lembrando que tem que exportar tanto o Provider quando o Context. O Provider para utilizar como componente e o Context para utilizar como valor no useContext*

4. Após isso só temos que envolver nossa página no layout com esse Provider, e sempre que necessitarmos dessa variável é só utilizarmos `const {tema} = useContext(LocalStorageContext)`:
   ``` jsx
       <html lang="pt-br" className={poppins.className}>
      <body className="flex flex-col min-h-screen">
        <Toaster
          toastOptions={{
            style: { background: "rgb(51 65 85)", color: "#fff" },
          }}
        />
        <LocalStorageProvider>
          <Container>
            <NavBar />
            <main className="flex-grow flex flex-col ">{children}</main>
            <Footer />
          </Container>
        </LocalStorageProvider>
      </body>
    </html>
   ```

5. É muito importante ressaltar que essas variáveis não permanecem com seus valores para todos os componentes, apenas para o componente que pegou a variável pelo `useContext` e seus componentes filhos, ou seja, se você alterou o valor do tema em uma página ele não mudara seu `State`. Por isso utilizamos o LocalStorage para guardar essas variáveis, para termos persistência de valores por toda a aplicação.

6. Outra atitude importante é que apesar de o uso do LocalStorage ser síncrono temos que esperar o site montar para conseguirmos utilizá-lo, então não temos como utilizar `useState(localStorage.getItem("Cart"))`, por exemplo, isso dá erro e, mesmo que funcione, torna a utilização dessa variável instável, então, para utiliza-la, temos que, primeiro declarar um state vazio ou com uma variável correspondente ao valor que será pego do *LocalStorage* e utilizar o `useEffect` para declarar essa variável, por isso que em meu Provider você verá muitos `useEffect`, que deixei separado para cada variável 

<hr>
## Pagamento

### Stripe API

[Stripe](stripe.com/br) é um sistema de pagamentos que facilita e muito o controle sobre os pagamentos realizados, ele possui elementos que funcionam como componentes para utilizar em seu site, assim como o [Bricks](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/landing) do Mercado Pago, e tem rotas de API que é necessário configurar em seu site para que tudo funcione corretamente.

#### Intenção de Pagamento

Intenção de Pagamentos, ou `Payment Intent`, é você basicamente dizer para o sistema de pagamento que alguém entrou no seu sistema de checkout e possui a intenção de comprar algo, como seus produtos. Isso é muito importante, pois com esse Intent você consegue controlar todo o estado do pedido, como saber se o pedido foi finalizado, ou seja, o cliente já pagou por esses produtos.

1. A primeira coisa que temos que fazer para construir nosso checkout da forma correta utilizando o Stripe, é criando uma conta no Stripe e ativar seu modo de teste, que é um checkbox que fica na parte central de cima do Dashboard principal.

2. Após criar a conta e ativar o modo de Teste, temos que instalar o pacote do Stripe em nossa aplicação:
   ``npm install --save stripe @stripe/stripe-js next``
   
3. Depois de ter o acesso ao pacote é preciso [configurar](https://stripe.com/docs/payments/quickstart) o `Client` do Stripe em sua API. Primeiramente temos que criar a rota, dessa vez utilizando o nome padrão providenciado pelo Stripe, apesar de não ser necessário ser esse nome, e utilizar a `route.ts`, que é uma padronização do Next.js para rotas de API.

4. Para criar essa rota é necessário somente criar o caminho `/app/api/create-payment-intent/route.ts`. Esse `create-payment-intent` é justamente para reforçar que seu opbjetivo principal é criar o Intent de pagamento como falei antes, porém, no meu caso, preferi deixar um pouco mais complexo, verificando se o cliente já possui um pedido associado à sua conta, se seu `payment-intent` já está sendo usado, e caso esteja ele atualiza, porém isso é só para o cliente ter um controle maior sobre seus pedidos, assim como os administradores.

5. No geral é só seguir a documentação, mas para essa rota você precisará criar variáveis de ambiente para suas chaves do Stripe, que você possui após criar a conta, a `STRIPE_SECRET_KEY` e a `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

6. Depois precisa importar o `Client` para sua rota, fora da função POST: ``const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)``

7. Depois temos que criar a função principal, que verifica se o usuário existe, pega o corpo do Request e verifica se está tudo correto:
    ```typescript
    export async function POST(req: Request) {
      const currentUser = await getCurrentUser();
    
      if (!currentUser) {
        return NextResponse.json(
          { error: "Sem autorização, realize o login e tente novamente" },
          { status: 401 }
        );
      }
    
      const body = await req.json();
    ```

8. Ainda não recebemos de nenhum lugar o `body` do Request, porém, precisamos ter uma noção do que ele será. No meu caso eu pego o `Payment Intent` do cliente, caso ele exista, e os items que o mesmo comprou, com seus respectivos preços, quantidades e informações sobre cada um, justamente para saber o preço que o cliente está devendo e enviarmos ao Stripe e para colocar em nosso banco de dados as informações sobre o produto e o cliente que efetuou o pedido.

9. Depois de pegarmos os itens e verificar o preço total da compra, temos que organizar o objeto que terá todas as informações necessárias para a nossa Database:
    ```typescript
      let orderData = {
    userId: currentUser.id,
    amount: FloatTotal,
    currency: "brl",
    payment_intent_id: payment_intent_id!,
    products: {
      create: items.map((item) => {
        return {
          name: item.name,
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          price: item.price,
          image: item.image,
        };
      }),
    },
    };
    ```
    *Como nosso banco de Dados é SQL, muitas vezes para utilizar o `createMany` ele gera problemas e não funciona, então recomendo iterar sobre cada item, assim como eu fiz utilizando o `create`*

10. Se você for observar na minha `route`, verá que, apesar de parecer complexa, ela se baseia em 3 caminhos:
    1. Caso o cliente possua o `payment_Intent`:
       1. Ele verificará se a intenção realmente existe no site do Stripe, caso contrário ele retornará um erro (No meu caso, só de ele retornar um erro ele já retorna a mensagem dizendo que a intenção não existe, porém adicionei um `(!currentIntent)` por precaução)
       2. Depois ele verificará se o pedido com aquele intent já existe no banco de dados, caso não exista ele irá criar um novo pedido no banco de dados com o valor atual e atualizar o valor no Stripe
       3. Caso a ordem exista ele irá atualizar o valor no banco de dados e no Stripe
       4. Se aquele `payment_Intent` já estiver como *pago* no Stripe, você não consegue atualiza-lo, afinal, não faria sentido atualizar o valor de uma ordem que já foi paga, portando adicionei um `try-catch` block para, caso dê esse erro, ele cria um novo Intent e um novo pedido no banco de Dados
   
     2. Caso o cliente não possua o `payment_Intent`
        1. Ele verificará se já existe um pedido daquele usuário com o status `Pendente`
        2. Caso tenha ele irá atualizar esse pedido com os valores atuais, lembrando que adiciono o `try-catch` para ter certeza que o pedido ainda não foi pago
        3. Caso não exista um pedido, o que é o mais comum, ele criará um novo `Intent` e um novo pedido no banco de dados
       
     3. Caso não seja nenhum dos casos
        1. Caso não seja nenhum dos casos, muito provavelmente ocorreu um erro, portanto retorno um erro para o FrontEnd

### Stripe Elements
1. Depois de criarmos nossa rota temos que criar nossa parte no FrontEnd. A primeira atitude que temos que tomar é [carregar o Stripe](https://stripe.com/docs/payments/quickstart#load-stripe) no ClientSide:
    ``const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);``

2. Após carregarmos o Stripe temos que criar um `useEffect` para nos comunicarmos com a API que criamos, porém essa parte me deu muito trabalho, justamente por querer fazer uma API mais complexa, tive que manipular os dados do Intent no LocalStorage, para saber se ele já existia e para isso o ESLint estava me recomendando utilizar o `PaymentIntent` como uma das dependências, mas, caso você não saiba, adicionar uma dependência significa que, cada vez que aquele valor ou função mudar, o seu `useEffect` rodará novamente. Isso na maioria das vezes é o correto, já que queremos sempre deixar nossa página e interações atualizadas, porém, esse não é o caso. O `useEffect` nesse caso criará varios `Intents` se você adicionar o `Payment Intent` como dependência, já que ele pode não esperar os valores do Storage e achará como primeiro caso que o `Intent` não existe e, como não podemos adicionar condições como fizemos para o carrinho, de que ele tem que existir e ter pelo menos 1 item, já que não sabemos se o cliente tem o Intent ou não, temos que retirar o `Payment Intent` das dependências desse `useEffect`

3. Enfim, após termos ciência dessa situação da dependência, que me tirou uns dias para descobrir, temos que fazer um request para nossa API com método POST, com as informações que esperamos receber, que são os produtos e o PaymentIntent. E, em nossa API, caso tudo corra corretamente, ele retornará o `Intent`, que não é somente o ID, como todas as informações daquela intenção, e junto com ela, vem o `Client Secret` que permite ao Stripe.js fazer o cliente (browser do usuário) interagir diretamente com os servidores Stripe sem passar pela API. Isso não é uma falha de segurança, já que ele precisa também do nosso `Secret` para realizar ações mais críticas, como atualizar valores ou considerar uma transação como paga.

4. Após recebermos o `Intent` completo no body da resposta, precisamos apenas criar um `State` para o `Client Secret`, que será nulo no começo, e *setarmos* esse estado para o valor recebido no `Intent` que é a propriedade `.client_secret`. Depois disso, para o nosso caso, é só adicionarmos o valor do ID do `Intent` em nosso LocalStorage e não se preocupe, caso o usuário altere esse Intent, na hora de fazer a requisição para a nossa API, o Stripe não reconhecerá esse Intent e gerará um erro.

5. Depois adicionamos os [Elements](https://stripe.com/docs/payments/quickstart#init-elements) do Stripe como `Provider` de todo o formulário que criaremos, fornecendo a `Promise` que criarmos ao usar o `loadStripe`, as opções, que é o `Client Secret` **obrigatoriamente** e a aparência para ser mais congruente com os temas:
    ```jsx
    const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: tema === "light" ? "stripe" : "night",
      labels: "floating",
    },
    locale: "pt-BR",
    };

    function handlePaymentSuccess(value: boolean) {
    setPaymentSucess(value);
    }

    return (
    <div className="App  flex flex-grow flex-col items-center justify-center">
      {!loading &&
        !error &&
        !paymentSucess &&
        clientSecret &&
        cartItems &&
        cartItems.length > 0 && (
          <Elements key={clientSecret} options={options} stripe={stripePromise}>
            <CheckoutForm
              handlePaymentSucess={handlePaymentSuccess}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      {error && <CheckoutError />}
      {!paymentSucess && !error && loading && <LoadingScreen />}
      {!error && paymentSucess && <PaymentSuccess />}
      {!loading &&
        !error &&
        !paymentSucess &&
        (!cartItems || cartItems.length === 0) && <CheckoutNoItem />}
    </div>
    );
    ```

6. Depois precisamos apenas criar o elemento de formulário em que, todos os inputs são controlados pelo próprio Stripe, então precisamos armazenar uma referência par o Stripe e seus Elements:
```typescript
  const stripe = useStripe();
  const elements = useElements();
```

7. Depois é preciso definir a função de Submit que lidará caso a transação dê certo ou não, porém as funções que criaremos será somente caso o resultado dê certo, pois o Stripe já mostrará caso o pagamento seja negado:
```typescript
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!result.error) {
      toast.success("Pagamento Realizado com Sucesso!");
      removeLocalStorage();
      localStorage.removeItem("Cart_Intent");
      window.scrollTo(0, 0);
      router.refresh();
      handlePaymentSucess(true);
    }

    setLoading(false);
  }
```

8. Por fim, somente é necessário adicionar os elementos que representam os conjuntos de inputs e suas opções, como:
   ```jsx
   <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["BR"],
            autocomplete: { mode: "automatic" },
          }}
        />
   ```
   e o principal:
   ```jsx
   <PaymentElement id="payment-card" options={{ layout: "tabs" }} />
   ```

### Stripe Webhook

Até esse momento, apesar de criarmos o pedido e o pagamento com sucesso, precisamos adicionar em nossa Database se o pedido foi pago ou não, além das informações de endereço que ainda não adicionamos, e que, não vale a pena adicionar até o cliente pagar pelo produto

1. Primeiro, para teste, precisamos adicionar um Stripe Webhook, que é um webhook normal, porém ele passa as informações de pagamentos caso eles sejam alterados e é justamente o que precisamos.

2. Para isso vamos na [sessão de Webhooks](https://dashboard.stripe.com/test/webhooks) e criaremos um endpoint local, e adicionar sua [configuração](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local), mas é bem básica, você precisa instalar a [Stripe CLI](https://stripe.com/docs/stripe-cli) e instala-la, eu utilizei o [Scoop](https://scoop.sh).

3. Após adicionar a configuração é só segui-la, utilizando `stripe login` para entrar em sua conta pela CLI e rodar o Webhook local `stripe listen --forward-to localhost:4242/api/stripe-webhook`

4. Depois temos que configurar o endpoint em si, que é nossa rota. o evento que receberemos é em forma de Buffer, ou seja, ele está com os dados *brutos*, em low code. O motivo para não receber os arquivos diretamente como JSON é que nem todas as solicitações ou APIs funcionam tão bem com JSON. Algumas APIs podem precisar enviar ou receber dados binários, cita-se como exemplo a API de transferência de arquivos. Nesses casos, a operação `JSON.parse()` poderia causar um erro ou distorcer os dados.Portanto para convertemos o valor que recebemos em Buffer para transformar em JSON podemos usar o `express.raw()` ou `buffer` do pacote [micro](https://www.npmjs.com/package/micro), que foi meu caso. Além disso, se não especificarmos nada no Next.js ele receberá o arquivo como JSON, então temos que especificar na [config](https://www.npmjs.com/package/micro) que não queremos fazer a conversão automatica:
   ```typescript
   export const config = {
   api: {
    bodyParser: false,
   },
   };

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

   export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
   ) {
   const buffed = await buffer(req);
   ```

5. Depois temos que verificar se a assinatura da requisição está correta e utilizar o `stripe.webhooks.constructEvent()`, com as informações que queremos decodificar para os eventos do Stripe, com a informação convertida em JSON, a assinatura e o Webhook Secret, que aparece na linha de código quando vamos adicionar o endpoint local:
```typescript
try {
    event = stripe.webhooks.constructEvent(
      buffed,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return res.status(400).send("Erro na criação do webhook:" + err);
  }
```

6. Após criarmos o evento é só verificar se ele é do tipo `payment_intent.succeeded` e, caso seja, pegar ID e as informações de endereço que estão nesse evento e atualizarmos nosso banco de dados:
   ```typescript
   if (event.type == "payment_intent.succeeded") {
    const charge = event.data.object;

    const addressData = {
      line1: charge.shipping?.address?.line1 || "",
      line2: charge.shipping?.address?.line2 || null,
      cidade: charge.shipping?.address?.city || "",
      estado: charge.shipping?.address?.state || "",
      pais: charge.shipping?.address?.country || "",
      CEP: charge.shipping?.address?.postal_code || "",
    };

    if (charge) {
      try {
        await prisma?.order.update({
          where: { payment_intent_id: charge.id },
          data: {
            status: PaymentStatus.Realizado,
            address: {
              upsert: {
                create: addressData,
                update: addressData,
              },
            },
          },
        });
        res.send({ received: true });
      } catch (err: any) {
        return res
          .status(400)
          .send("Erro na atualização do status do pagamento:" + err);
      }
   ```

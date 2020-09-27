# API de produtos

## O que é?

Esta API tem como objetivo analisar as requisições, durante 10 minutos, requisições com o mesmo corpo serão negadas pela API.

# Para que serve?

Serve principalmente para aliviar o peso de uma banco de dados, ja que, a requisição não ira proceder para o banco de dados e sim parar no servidor.

# Exemplo

```bash
# 2020-09-01T16:00:00 - Durante 10 minutos requests com o mesmo corpo serão negadas
curl -XPOST http://54.232.45.139:3000/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 200 OK

# 2020-09-01T16:05:00 - Como é o mesmo corpo de uma requisição passada, a API ira negar.
curl -XPOST http://54.232.45.139:3000/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 403 Forbidden

# 2020-09-01T16:10:00 - Depois de 10 minutos, a API aceita a requisição.
curl -XPOST http://54.232.45.139:3000/v1/products -d '[{"id": "123", "name": "mesa"}]' #=> 200 OK
```

## Conteúdo

- [Como testar - Modo rápido](#testar_rapido)
- [Como testar - Localmente](#testar_localmente)
- [Detalhes técnicos](#detalhes)
- [Módulos utilizados](#modulos)

# Como testar - Modo rápido

<a name="testar_rapido"/>

## Pre-instalação

Verifique se você ja tem algum tipo de programa para fazer suas requisições.
Caso não tenha, utilize o [Insomnia](https://insomnia.rest/download/core/)

## Passo 1

Abra seu Insomnia e crie uma nova request

![Image](https://i.ibb.co/Gc5LGw4/Parte-1.jpg)

## Passo 2

Adicione um nome da sua preferência

- Método: POST
- Body: JSON

![Image](https://i.ibb.co/RBH7fq0/Parte-2.jpg)

## Passo 3

Coloque o caminho da API, no caso: **54.232.45.139:3000/v1/products**

![Image](https://i.ibb.co/yV8PwNL/Parte-3.jpg)

## Passo 4

Crie um corpo(Body) da sua requisição, seguindo algumas regras e depois clique em enviar (Send).

- Tudo deve estar dentro de um Array []
- Não pode haver nenhum objeto vazio

![Image](https://i.ibb.co/xh3QCZy/Parte-4.jpg)

## Pronto

Sua requisição foi feita, caso você faça duas vezes a mesma requisição em um intervalo de **10 minutos**, a
API negara seu pedido com um código 403.

# Como testar - Localmente

<a name="testar_localmente"/>

## Pre-Instalação

Verifique se você tem os programas [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) e [GIT](https://git-scm.com/downloads)

## Passo 1

Faça um clone do projeto no GitHub.

- Crie uma pasta para o projeto com o comando `mkdir projeto_git`
- Acesse esta pasta com o comando `cd projeto_git`
- Utilize o comando `git clone https://github.com/cafesao/api_produtos_desafio.git`
- Acesse a pasta api_produtos_desafio com o comando `cd api_produtos_desafio`

- Comando resumido: `mkdir projeto_git && cd projeto_git && git clone https://github.com/cafesao/api_produtos_desafio.git && cd api_produtos_desafio`

![Image](https://i.ibb.co/FnGTf92/Passo-1.jpg)

## Passo 2

Agora vamos iniciar o docker-compose.

- Na pasta api_produtos_desafio insira o comando `sudo docker-compose build`
- Depois vamos subir os containers com o comando `sudo docker-compose up`

## Pronto

Agora você esta com o servidor rodando na sua maquiná local.
Para fazer as requisições utilize o tutorial acima [Como testar - Modo rápido](#testar_rapido) e apenas substitua a URL para _localhost:3000_

## Detalhes Técnicos

<a name="detalhes"/>

A API quando recebe uma requisição ela verifica junto ao um banco de dados **Redis** se esta requisição foi feita a 10 minutos atrás.
Caso ela ja tenha sido feita, a API nega o pedido.
Se não, a API salva o _hash_ desta requisição no **Redis** e retorna um código 200

Sendo assim, o funcionamento da API consiste em nada mais do que, quando receber o corpo da requisição, criar um _hash md5_ e verificar se existe ou não no **Redis**.

## Módulos utilizados

<a name="modulos"/>

- express : Criar toda a parte do conexão e exposição da API
- dotenv : Configurar as variáveis de ambiente
- cors : Aceitar conexão externa de um Front-End
- redis : Configurar e iniciar o banco de dados **Redis**

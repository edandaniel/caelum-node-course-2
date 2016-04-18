# Info

### Instutor: [Julio Vidal](mailto:julio.vidal@caelum.com.br)  
### [Pasta no Dropbox](https://www.dropbox.com/sh/2ip5h22v189fpbt/AACe5m612dMYj_yrQVsVaIOka)
ou [shorturl](http://bit.ly/node-avancado-itau)

# Intro

## Why node?

- async
  - performance
  - scalable
- free
  - but no support (only community)
- microservice (module)
- json
- JavaScript
- Easy2Write, Fast2Deploy
  - Hello World in 10 seconds

# Project 101

- cd _<project folder>_
- npm init (cria json)
- npm install **express** _--save_
  - "--save" keeps info in package json
- npm install **express-load** _--save_
- node index.js

# HTTP

## exemplo de chamada

```curl
curl http://localhost:3000/pagamentos/pagamento -X POST -v -d '{"moeda" : "BRL" , "forma_de_pagamento" : "payfast" , "valor"  : "10","descricao" : "descricaodacompra"}' -H 'Content-type: application/json'
```
|H|Muda o header|
|d|data|
|v|verbose|

## HTTP se baseia em recurso + verbo + Headers

| Recurso | Verbo
|---|
|/pagamentos|GET|
|/pagamentos|POST|
|/pagamentos/id|PUT|
|/pagamentos/id|DELETE|

## Status codes

Importante usar codigos que sejam uteis para maquinas
e.g. se criar usa 201 em vez de 200

|#|Descrição|
|-|-|
|101|Conexão permanente/socket|
|200|OK|
|201|Created|
|300|Moved|
|400|Error|
|500|Server error|

## HATEOAS
### Hypertext As The Engine Of Application State

Resposta da chamada da API apresenta possiveis chamadas futuras,
funcionando como maquina de estado

          />CONFIRMADO (PUT)
CRIADO----
          \\>CANCELADO (DELETE)

json
links:[
{
  href:"http://.../pagamentos/pagamento/2",
  rel:'Confirmar',
  method:'PUT'
  },
  {
    href:"http://.../pagamentos/pagamento/2",
    rel:'Cancelar',
    method:'DELETE'
  }
]

const	PAGAMENTO_CRIADO	=	"CRIADO";
const	PAGAMENTO_CONFIRMADO	=	"CONFIRMADO";
const	PAGAMENTO_CANCELADO	=	"CANCELADO";

module.exports = function(app){
  is_version_invalid = function(req,res){
    var versao = req.headers.accept;
    if(versao!==('application/vnd.payfast.v1.json')){
      res.status(400).json({msg:'versao invalida!'});
      return false;
    }
    return true;
  }

  //metodo para put e delete
  atualiza = function(req,res,tipo){
    var pagamento = req.body;

    if(tipo === 'put')
      pagamento.status = PAGAMENTO_CONFIRMADO;
    if(tipo === 'delete')
      pagamento.status = PAGAMENTO_CANCELADO;

    var conn = app.infra.connectionFactory();
    var dao  = new app.infra.PagamentoDao(conn);

    dao.atualiza(pagamento,function(error,result){
      if(error){
        console.log(error);
        res.status(503).json({msg:'OPA DEU MERDA AQUI CAPITÃO','error':error});
        return;
      }

      if(result.changedRows == 1)
        res.status(200).json({msg:'Atualizado com Çuçeço','pagamento':pagamento});
      else
        res.status(200).json({msg:'Ja esta atualizado, nao precisa reconfirmar','pagamento':pagamento});
    });
  }

  app.get('/pagamentos',function(req,res){
    var l = app.infra.logger.info;
    l('teste');
    res.send('opa, deu certo ein.');
  });

  app.get('/pagamentos/pagamento/:id',function(req,res){
    var	id	=	req.params.id;
		var	cache	= app.infra.memcachedClient();

    console.log('id:	'	+	id);
			cache.get('pagamento-'	+	id,	function	(err,	data)	{
        if	(err	||	!data){
          var	connection	=	app.infra.connectionFactory();
          var	pagamentoDao	=	new	app.infra.PagamentoDao(connection);
          pagamentoDao.buscaPorId(id,	function(exception,	resultado){
          cache.set('pagamento-'	+	id,	resultado,	100000,	  function	(err)	{
            console.log('nova	chave:	pagamento-'	+	id);
			    });
				res.status(200).json(resultado);
				});
			}	else{
        console.log('TO USANDO CRACK DIGO CACH');
	      res.status(200).json(data);
			}
		});
	});

  app.put('/pagamentos/pagamento',function(req,res){
    if(is_version_invalid(req,res))
      return;
    atualiza(req,res,'put');
  });

  app.delete('/pagamentos/pagamento',function(req,res){
    if(is_version_invalid(req,res))
      return;
    atualiza(req,res,'delete');
  });

  //metodo 'principal'
  app.post('/pagamentos/pagamento',function(req,res){
    if(is_version_invalid(req,res))
      return;

    var body = req.body;
    //separa entrada
    var pagamento = body.pagamento;
    var cartao = body.cartao;

    //valida entrada
    req.assert('pagamento.forma_de_pagamento','forma pag obrig').notEmpty();
    req.assert("pagamento.valor",	"Valor	é	obrigatório	e	deve	ser	um	decimal.").notEmpty().isFloat();
    req.assert('pagamento.moeda','moeda obrig e 3 char').notEmpty().len(3,3);

    var errors = req.validationErrors();

    if(errors){
      res.status(400).json(errors);
      return;
    }

    //trata SE cartao
    if(pagamento.forma_de_pagamento === 'cartao'){
      var clientCard = new app.services.CartoesClient();

      clientCard.autoriza(cartao, function(error,request,response,result){
        if(error){
          console.log('Erro ao consultar serviço de cartoes');
          res.status(400).json(error);
          return;
        }
        console.log('Retorno	do	servico	de	cartoes:	%j',	result);
        var response =	{
					dados_do_pagamento:	pagamento,
					cartao	:	result,
					links:	[
		       {
						href:	"http://localhost:3000/pagamentos/pagamento/"	+	pagamento.id,
						rel:	"confirmar",
						method:	"PUT"
	        },
					{
						href:	"http://localhost:3000/pagamentos/pagamento/"	+	pagamento.id,
						rel:	"cancelar",
						method:	"DELETE"
					}]
        }
        res.status(201).json(response);
      });
      return;
    }

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    var conn = app.infra.connectionFactory();
    var dao  = new app.infra.PagamentoDao(conn);

    dao.salva(pagamento, function(error,result){
      if(error){
        console.log(error);
        res.status(503).json(error);
        return;
      }

      var id = result.insertId;
      res.location('/pagamentos/pagamento/' + id);
      pagamento.id = id;

      console.log(result);
      var response = {
        dados_do_pagamento : pagamento,
        links:[
        {
          href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
          rel:'Confirmar',
          method:'PUT'
          },
          {
            href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
            rel:'Cancelar',
            method:'DELETE'
          }
        ]
      };
      res.status(201).json(response);
    });

  });
}

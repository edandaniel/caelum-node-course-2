const	PAGAMENTO_CRIADO	=	"CRIADO";
const	PAGAMENTO_CONFIRMADO	=	"CONFIRMADO";
const	PAGAMENTO_CANCELADO	=	"CANCELADO";

module.exports = function(app){
  app.get('/pagamentos',function(req,res){
    res.send('opa, deu certo ein.');
  });

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

  app.put('/pagamentos/pagamento',function(req,res){
    atualiza(req,res,'put');
  });

  app.delete('/pagamentos/pagamento',function(req,res){
    atualiza(req,res,'delete');
  });

  app.post('/pagamentos/pagamento',function(req,res){
    req.assert('forma_de_pagamento','forma pag obrig')
      .notEmpty();
    req.assert('moeda','moeda obrig e 3 char')
      .notEmpty().len(3,3);

    var errors = req.validationErrors();
    if(errors){
      res.status(400).json(errors);
      return;
    }

    var pagamento = req.body;
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

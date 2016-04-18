module.exports = function(app){
  app.get('/pagamentos',function(req,res){
    res.send('opa, deu certo ein.');
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

    var response = {
      dados_do_pagamento = pagamento,
      links:[
      {
        href:"http://localhost:3000/pagamentos/pagamento/2",
        rel:'Confirmar',
        method:'PUT'
        },
        {
          href:"http://localhost:3000/pagamentos/pagamento/2",
          rel:'Cancelar',
          method:'DELETE'
        }
      ]
    }

    dao.salva(pagamento, function(error,result){
      if(error){
        console.log(error);
        res.status(503).json(error);
      }else{
        var id = result.insertID;
        res.location('/pagamentos/pagamento/'+id);
        pagamento.id = id;
        res.status(201).json(pagamento);
      }
    });
  });
}

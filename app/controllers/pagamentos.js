module.exports = function(app){
  app.get('/pagamentos',function(req,res){
    res.send('opa, deu certo ein.');
  });

  app.post('/pagamentos/pagamento',function(req,res){
    var pagamento = req.body;
    pagamento.status = 'CRIADO';
    pagamento.data = new Date();
    console.log(pagamento);
    debugger;
    var conn = app.infra.connectionFactory();
    var dao  = new app.infra.PagamentoDao(conn);
    dao.salva(pagamento, function(error,result){
      if(error){
        console.log(error);
        res.status(503).json(error);
      }else{
        console.log('pag ok');
        res.status(201).json(pagamento);
      }
    });
  });
}

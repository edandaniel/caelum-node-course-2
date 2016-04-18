module.exports = function(app){
  app.get('/pagamentos',function(req,res){
    res.send('opa, deu certo ein.');
  });

  app.post('/pagamentos/pagamento',function(req,res){
    console.log(req.body);
    var pagamento = req.body;
    console.log(pagamento);    
    res.status(201).json(pagamento);
  });
}

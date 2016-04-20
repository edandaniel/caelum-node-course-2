module.exports	=	function(app)	{
  app.get("/correios/calculo-prazo/:versao",function(req,	res){
    var versao = req.params.versao;
    if (versao !== 'v1'){
      res.status(400).send({msg:'Versao invalida.'});
      return;
    }
    var	correiosClient =	new	app.services.SOAPClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl');
    var	args	=	req.query;
    console.log(req.query);
    correiosClient.calculaPrazo(args,	function(err,	resultado)	{
      if(err){
        res.status(400).send(err);
          return;
        }
  			res.status(200).json(resultado);
  		});
  	});
}

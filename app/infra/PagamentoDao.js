function PagamentoDao(connection) {
    this._connection = connection;
}

PagamentoDao.prototype.salva = function(pagamento,callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDao.prototype.lista = function(callback) {
    this._connection.query('select * from pagamentos',callback);
}

PagamentoDao.prototype.buscaPorId = function (id,callback) {
  this._connection.query("select * from pagamentos where id = ?",[id],callback);
}

PagamentoDao.prototype.deleta = function (id,callback) {
    this._connection.query("delete from pagamentos where id = ?",[id],callback);
}

PagamentoDao.prototype.atualiza = function (pagamento,callback) {
    var p = pagamento;
    var insert_data = [p.status,p.data,p.id];
    this._connection.query("update pagamentos set status = ?, data = ? where id = ?",insert_data,callback);
}

module.exports = function(){
    return PagamentoDao;
};

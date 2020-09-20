const db = require("../config/database");

exports.createPessoa= async (req, res, next) => {
  const { nome, cargo, cpf} = req.body;
  console.log(req.file);
  const foto = req.file.filename;

  if(!req.file) {
    res.status(500);
    return next(err);
  }
  const { rows } = await db.query(
    "INSERT INTO pessoas (nome, cargo, cpf, foto) VALUES ($1, $2, $3, $4)",
    [nome, cargo, cpf, foto]
  );

  res.status(201).send({
    message: "Cadastro feito com sucesso!",
    body: {
      pessoa: { nome, cargo, cpf, foto }
    },
  });
};

exports.listAllPessoas = async (req, res) => {
    const response = await db.query('SELECT * FROM pessoas ORDER BY id');
    res.status(200).send(response.rows);
};

exports.findPessoaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM pessoas WHERE id = $1', [id]);
    res.status(200).send(response.rows);
}

exports.updatePessoaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, cargo, cpf} = req.body;
    

    if(!req.file) {
      const response = await db.query(
        "UPDATE pessoas SET nome = $1, cargo = $2, cpf = $3 WHERE id = $4",
        [nome, cargo, cpf,id]
      );
    }
    else{
      const foto = req.file.filename;
      const response = await db.query(
        "UPDATE pessoas SET nome = $1, cargo = $2, cpf = $3, foto = $4 WHERE id = $5",
        [nome, cargo, cpf, foto, id]
      );
    }
  
    
  
    res.status(200).send({ message: "Cadastro atualizado com sucesso!" });
  };

  exports.deletePessoaById = async (req, res) => {
    const id = parseInt(req.params.id);
    await db.query('DELETE FROM pessoas WHERE id = $1', [
      id
    ]);
  
    res.status(200).send({ message: 'Cadastro apagado com sucesso!', id });
  };
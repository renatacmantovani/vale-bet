const Atleta = require('../model/Atleta');

exports.createAtleta = async (req, res) => {
    try {
      const { nome, descricao, imagem, apostas } = req.body;
  
      const novo = new Atleta({
        nome,
        descricao,
        imagem,
        apostas
      });
  
      await novo.save();
      res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar atleta' });
    }
  };
  
exports.apostar = async (req, res) => {
  const { atletaId } = req.params;
  try {
    const atleta = await Atleta.findById(atletaId);
    if (!atleta) return res.status(404).json({ error: 'Atleta não encontrado' });

    atleta.apostas += 1;
    await atleta.save();
    res.json(atleta);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao apostar' });
  }
};

exports.listar = async (req, res) => {
  const atletas = await Atleta.find();
  res.json(atletas);
};

exports.editar = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, descricao, imagem } = req.body;
  
      const atualizado = await Atleta.findByIdAndUpdate(
        id,
        { nome, descricao, imagem },
        { new: true } // retorna o novo documento atualizado
      );
  
      if (!atualizado) {
        return res.status(404).json({ error: 'Atleta não encontrado' });
      }
  
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar atleta' });
    }
  };
  

  exports.excluir = async (req, res) => {
    const { id } = req.params;
    const deletado = await Atleta.findByIdAndDelete(id);
    if (!deletado) return res.status(404).json({ error: 'Atleta não encontrado' });
    res.json({ message: 'Atleta removido com sucesso' });
  };
  
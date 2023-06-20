const clienteModel = require('../models/clienteModel.js');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const chaveSecreta = 'sua_chave_secreta_aqui';


const upload = multer({
    storage: multer.memoryStorage(), // Armazenando os dados em memória
  });

class ClienteController {
    
    async salvar(req, res) {
        try {
          let cliente = req.body;
        
          const max = await clienteModel.findOne({}).sort({ codigo: -1 });
          cliente.codigo = max == null ? 1 : max.codigo + 1;

          const clienteExistente = await clienteModel.findOne({ 'email': cliente.email });

          if (clienteExistente) {
            return res.status(400).json({ error: 'Nome de email já existente!' });
          }

          // Verificar se uma imagem foi enviada
          if (req.file) {
            
            cliente.imagem = req.file.path;
          }
          
          const resultado = await clienteModel.create(cliente);
          res.status(201).json(resultado);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao criar o perfil' });
        }
      }

    async listar(req, res) {
        const resultado = await clienteModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
        const codigo = req.params.codigo;
        const resultado = await clienteModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }


    async atualizar(req, res) {
        try {
          if (req.file) {
            console.log(req.file);
            req.body.imagem = req.file.path;
          }
      
          const codigo = req.params.codigo;
          const cliente = await clienteModel.findOneAndUpdate({ codigo: codigo }, req.body);
      
          if (cliente) {
            res.status(200).send();
          } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar o perfil' });
        }
      }
      

    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);
        await clienteModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    }

    async autenticar(req, res) {    
      const { email, senha } = req.body;
      console.log("teste");
      try {
          const usuario = await clienteModel.findOne({ 'email': email });
          console.log(usuario.email);

          if (!usuario) {
              return res.status(404).json({ error: 'Usuário não encontrado' });
          }
          console.log(usuario.senha);

          if (usuario.senha !== senha) {
              return res.status(401).json({ error: 'Senha incorreta' });
          }
          
          console.log("teste");

          // Gerar o token JWT
          const token = jwt.sign({ email: usuario.email }, chaveSecreta, { expiresIn: '1h' });
          console.log("teste");

          res.status(200).json({ token });
      } catch (error) {
          console.error('Erro ao autenticar usuário:', error);
          res.status(500).json({ error: 'Erro ao autenticar usuário' });
      }
  }

  async validarToken(req, res) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, chaveSecreta);
        console.log('Token válido');
        res.status(200).json({ message: 'Token válido' });
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        res.status(403).json({ error: 'Token inválido' });
    }
}



}
module.exports = new ClienteController();
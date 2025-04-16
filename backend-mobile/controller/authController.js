const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();
const bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET; 

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    try {
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

       
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

       
        console.error(error); 
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }


        user.isCorrectPassword(password, (err, same) => {
            if (err || !same) {
                return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
            }

            const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '30d' });
            res.json({ user, token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno, tente novamente.' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.userId; 
    const { name, email, password } = req.body;

    console.log("ID do usuário:", userId); 
    console.log("Dados recebidos:", { name, email, password }); 

    try {

        const user = await User.findById(userId);
        if (!user) {
            console.log("Usuário não encontrado no banco de dados."); 
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        if (name !== undefined) user.name = name; 
        if (email !== undefined) user.email = email; 
        if (password !== undefined) {
         
            console.log("Senha fornecida:", password); 
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Senha criptografada:", hashedPassword); 
            user.password = hashedPassword;
        }

        await user.save();

        console.log("Usuário atualizado com sucesso:", user); 

        res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
            },
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error); 


        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }


        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.userId; 

    try {
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

       
        await User.deleteOne({ _id: userId });

        
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
};

module.exports = {
    login, register, updateUser, deleteUser
};



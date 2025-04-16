const Task = require("../model/task.js");
const User = require("../model/user.js"); 

const createTask = async (req, res) => {
  try {
      const { title } = req.body;
      const userId = req.userId; 
      const finished = false;

      console.log("ID do usuário recebido:", userId); 

      
      const existingUser = await User.findById(userId);
      if (!existingUser) {
          console.log("Usuário não encontrado no banco de dados."); 
          return res.status(404).json({ message: "Usuário não encontrado." });
      }

      
      const newTask = new Task({
          title,
          finished,
          user: userId, 
      });

      await newTask.save();

      res.status(201).json({
          message: "Tarefa criada com sucesso!",
          task: newTask,
      });
  } catch (error) {
      console.error("Erro ao criar tarefa:", error); 
      res.status(500).json({
          message: "Erro ao criar tarefa.",
          error: error.message,
      });
  }
};


const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId; 

  
    const tasks = await Task.find({ user: userId }).populate("user", "name email"); 

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar tarefas.",
      error: error.message,
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; 

   
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao usuário." });
    }

    await Task.deleteOne({ _id: id });
    res.json({ message: "Tarefa removida com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao remover tarefa.",
      error: error.message,
    });
  }
};


const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, finished } = req.body;
    const userId = req.userId; 

 
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada ou não pertence ao usuário." });
    }

  
    task.title = title || task.title; 
    task.finished = finished !== undefined ? finished : task.finished; 

    await task.save();

    res.json({
      message: "Tarefa atualizada com sucesso!",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar tarefa.",
      error: error.message,
    });
  }
};

module.exports = { getAllTasks, createTask, editTask, deleteTask };
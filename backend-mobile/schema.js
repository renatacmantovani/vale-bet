const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require('graphql');
const User = require('./model/user'); 
const Task = require('./model/task'); 

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    created_at: { type: GraphQLString },
  },
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    finished: { type: GraphQLString }, 
    user: { type: UserType }, 
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType), 
      resolve: async (parent, args) => {
        try {
          console.log('Buscando tasks...');
          const tasks = await Task.find().populate('user').maxTimeMS(30000).exec(); 
          console.log('Tasks encontradas:', tasks);
          return tasks;
        } catch (error) {
          console.error('Erro ao buscar tasks:', error);
          throw new Error('Erro ao buscar tasks: ' + error.message);
        }
      },
    },
    task: {
      type: TaskType, 
      args: {
        id: { type: GraphQLString }, 
      },
      resolve: async (parent, args) => {
        try {
          console.log('Buscando task por ID...');
          const task = await Task.findById(args.id).populate('user').maxTimeMS(30000).exec(); 
          if (!task) {
            throw new Error('Task não encontrada');
          }
          console.log('Task encontrada:', task);
          return task;
        } catch (error) {
          console.error('Erro ao buscar task por ID:', error);
          throw new Error('Erro ao buscar task por ID: ' + error.message);
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
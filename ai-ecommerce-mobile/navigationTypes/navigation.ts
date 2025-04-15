// Definição dos tipos das rotas disponíveis na navegação
export type RootStackParamList = {
  Login: undefined;    // A tela de Login não recebe parâmetros
  Register: undefined; // A tela de Cadastro também não recebe parâmetros
  HomeScreen: undefined;
  OrderPlaced: undefined;
  Products: undefined;
  Cart: { product: Product };
};


export interface Product {
  _id: string;
  nome: string;
  descricao: string;
  imagem: string;
}


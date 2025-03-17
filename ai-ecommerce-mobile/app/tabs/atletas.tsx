// ProductPage.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Rayssa Leal, Skate', 
    description: 'Primeira skatista brasileira a conquistar uma medalha de prata nas Olimpíadas de Tóquio 2020, Rayssa é um ícone da nova geração do skate.',
    imageUrl: 'https://s2-oglobo.glbimg.com/hnaqI5AwZlna8-RoyUnZ_hT_RAc=/0x0:5616x3744/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/F/5/f1VANTQKqU5jUvaPjUyg/101957325-rayssa-leal-of-brazil-celebrates-winning-the-womens-final-in-the-skateboarding-street-wor-1-.jpg',
  },
  {
    id: 2,
    name: 'Daniel Dias, Natação paralímpica',
    description: 'Maior medalhista paralímpico do Brasil, Daniel é um exemplo de superação e dedicação ao esporte.',
    imageUrl: 'https://s2-ge.glbimg.com/eOZJXo7THzFtTIfTd8EaCtUGJes=/0x0:4752x3172/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/X/L/TNeYnzQIivF4kxbplBPg/gettyimages-522278932.jpg',
  },
  {
    id: 3,
    name: 'Ana Marcela Cunha, Maratona Aquática',
    description: 'Campeã olímpica e mundial, Ana Marcela é uma das maiores nadadoras de águas abertas da história.',
    imageUrl: 'https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/08/08041159/ana-marcela-cunha-10km-olimpiadas.jpg',
  },
  {
    id: 4,
    name: 'Carol Solberg, Vôlei de Praia',
    description: 'Carol é uma das principais atletas do vôlei de praia e uma defensora ativa dos direitos LGBTQIAP+.',
    imageUrl: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/18883_90EB160C5D43EA96.jpg?w=1200&h=900&crop=1',
  },
  {
    id: 5,
    name: 'Tifanny Abreu, Vôlei',
    description: 'Primeira jogadora trans a atuar na Superliga de Vôlei, Tifanny é um símbolo de inclusão no esporte.',
    imageUrl: 'https://amazonasatual.com.br/wp-content/uploads/2019/04/Tifanny-Foto-Marcelo-Ferrazoli-V%C3%B4lei-Bauru.jpg',
  },
  {
    id: 6,
    name: 'Rafaela Silva, Judô',
    description: 'Primeira brasileira a ganhar uma medalha de ouro no judô em Olimpíadas, Rafaela é uma inspiração para muitos.',
    imageUrl: 'https://midianinja.org/wp-content/uploads/2024/07/pan-2023-rafaela-silva-conquistou-o-ouro-na-categoria-ate-57kg-do-judo-1698524242722_v2_900x506-jpg.webp'
  },
  {
    id: 7,
    name: 'Douglas Souza, Vôlei',
    description: 'Jogador da seleção brasileira de vôlei, Douglas é um dos atletas LGBTQIAP+ mais visíveis do Brasil.',
    imageUrl: 'https://imagens.ebc.com.br/l7UCpsR8aSjPykQd9CCBKeN7l3Y=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/douglas_souza_volei.jpg?itok=53ih-Gd37'
  },
  {
    id: 8,
    name: 'Duda Lisboa, Vôlei de Praia',
    description: 'Duda é uma das jovens promessas do vôlei de praia e já coleciona títulos importantes em sua carreira.',
    imageUrl: 'https://public-rf-upload.minhawebradio.net/2158/news/bdb2cfc7d2786995a1f2428d5ff085b0.jpg'
    },
  {
    id: 9,
    name: 'Pamela Rosa, Skate',
    description: 'Campeã mundial de skate, Pamela é uma das principais representantes do esporte no Brasil',
    imageUrl: 'https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/primary/clb68f33jr0ropajycyc'
    },
  {
    id: 10,
    name: 'Arthur Nory, Ginástica Artística',
    description: 'Atleta de ginástica artística brasileiro, competindo no individual geral. Atualmente faz parte do Clube Pinheiros e da Seleção Brasileira de Ginástica Artística. ',
    imageUrl: 'https://www.esportelandia.com.br/app/uploads/2020/03/nory-jogos-olimpicos-rio-2016.jpg'
    },


  ];

const ProductPage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        {products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
});

export default ProductPage;

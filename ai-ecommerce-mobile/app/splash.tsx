//SplashScreen com a logo para abrir no inicio da aplicação, ainda não implementado

import React from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#0B8FAC" barStyle="light-content" />
      <Image
        style={styles.logo}
        source={require("../assets/images/Group 2.png")} 
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#fffff", 
    justifyContent: "center", 
    alignItems: "center",
  },
  logo: {
    width: 500, 
    height: 500,
    resizeMode: "contain", 
  },
});

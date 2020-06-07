import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import _ from "lodash";

interface IBGEUF {
  nome: string;
  sigla: string;
}

interface IBGECity {
  nome: string;
}

const Home = () => {
  const [selectedUF, setSelectedUF] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [ufList, setUfList] = useState<IBGEUF[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUF[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufs = response.data.map((uf) => ({
          sigla: uf.sigla,
          nome: uf.nome,
        }));

        setUfList(_.orderBy(ufs, ["nome"]));
      })
      .catch();
  }, []);

  useEffect(() => {
    if (!selectedUF) return;

    axios
      .get<IBGECity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
      )
      .then((response) => {
        const cities = response.data.map((city) => city.nome);
        setCityList(cities);
      })
      .catch();
  }, [selectedUF]);

  if (!fontsLoaded) return <AppLoading />;

  function handleNavigateToPoints() {
    navigation.navigate("Points", { uf: selectedUF, city: selectedCity });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")}></Image>
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.selectContainer}>
            <RNPickerSelect
              style={{
                inputAndroid: { ...styles.inputAndroid },
                inputIOS: { ...styles.inputIOS },
              }}
              placeholder={{ label: "Escolha um estado" }}
              value={selectedUF}
              onValueChange={(value) => setSelectedUF(value)}
              items={ufList.map((uf) => ({ label: uf.nome, value: uf.sigla }))}
            />
            <RNPickerSelect
              placeholder={{ label: "Escolha uma cidade" }}
              style={{
                inputAndroid: { ...styles.inputAndroid },
                inputIOS: { ...styles.inputIOS },
              }}
              value={selectedCity}
              onValueChange={(value) => setSelectedCity(value)}
              items={cityList.map((city) => ({
                label: city,
                value: city,
              }))}
            />
          </View>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  selectContainer: { marginBottom: 20 },

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  inputAndroid: { color: "black" },
  inputIOS: {
    color: "black",
  },
});

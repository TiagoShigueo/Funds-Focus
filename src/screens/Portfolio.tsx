import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  adicionarFiiNaCarteira,
  obterCarteiraAgrupada,
} from "../services/firebase";
import { getUserId } from "../utils/User";
import { DocumentData } from "firebase/firestore";
import PortfolioItem from "../components/PortfolioItem";
import { readRemoteFile } from "react-native-csv";
import { Dropdown } from "react-native-element-dropdown";
import Idv from "../constants/Idv";
import { fiis } from "../data/fiisB3";
import { getFiis } from "../services/fiisApi";

const Portfolio = () => {
  const [codigoFii, setCodigoFii] = useState("");
  const [quantidadeFii, setQuantidadeFii] = useState("");
  const [valorFii, setValorFii] = useState("");
  const [carteira, setCarteira] = useState<DocumentData | null | undefined>(
    null
  );
  const [isFocus, setIsFocus] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const convertedData = fiis.map((item: { [x: string]: any }) => ({
        label: item["Codigo"],
        value: item["Codigo"],
      }));
      console.log("entrou");
      setItems(convertedData);
    } catch (error) {
      const fetchFiis = async () => {
        const fiis = await getFiis();
        const convertedData = fiis.map((item) => ({
          label: item.codigo,
          value: item.codigo,
        }));
        setItems(convertedData);
      };
      fetchFiis();
    }

    carregarCarteira();
  }, []);

  const carregarCarteira = async () => {
    try {
      const userId = (await getUserId()) ?? "";
      const carteiraUsuario = await obterCarteiraAgrupada(userId);
      setCarteira(carteiraUsuario);
    } catch (error) {
      console.error("Erro ao carregar a carteira do usuário: ", error);
    }
  };

  const adicionarFii = async () => {
    if (!codigoFii || !quantidadeFii || !valorFii) {
      Alert.alert("Campo vazio", "Favor preencher os campos");
      return;
    }
    try {
      /* ?? é o operador de coalescência nula, que fornece um valor padrão no caso de userId ser nulo */
      const userId = (await getUserId()) ?? "";
      const novoFii = {
        codigo: codigoFii.value,
        quantidade: parseInt(quantidadeFii),
        valor: parseFloat(valorFii),
      };

      await adicionarFiiNaCarteira(userId, novoFii);
      await carregarCarteira();
    } catch (error) {
      console.error("Erro ao adicionar FII à carteira: ", error);
    }
  };

  return (
    <View style={Idv.container}>
      <View style={Idv.centralizedContainer}>
        <View style={{ width: 190 }}>
          <Dropdown
            style={Idv.input}
            data={items}
            search
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Selecione o fundo" : "Selecione o fundo"}
            searchPlaceholder="Pesquisar..."
            value={codigoFii}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setCodigoFii(item);
              setIsFocus(false);
            }}
          />
        </View>
        <TextInput
          placeholder="Quantidade de cotas"
          value={quantidadeFii}
          onChangeText={setQuantidadeFii}
          keyboardType="numeric"
          style={Idv.input}
        />
        <TextInput
          placeholder="Valor do FII"
          value={valorFii}
          onChangeText={setValorFii}
          keyboardType="numeric"
          style={Idv.input}
        />
        <TouchableOpacity style={Idv.button} onPress={() => adicionarFii()}>
          <Text style={Idv.buttonTextWhite}>Adicionar FII</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={carteira}
        renderItem={({ item }) => <PortfolioItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>Nenhum item na carteira.</Text>}
      />
    </View>
  );
};

export default Portfolio;

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinhaVeiculo, { Veiculo } from './LinhaVeiculo';
import TabelaHeader from './TabelaHeader';
import HeaderCustom from './HeaderCustom';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

const API_BASE_URL = 'https://backend-lti.onrender.com';

export default function Home() {
  const [dados, setDados] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const animated = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 12;

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/aquisicoes`);
        if (!res.ok) throw new Error('Falha ao buscar dados');
        const json = await res.json();
        setDados(json);

        Animated.timing(animated, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [animated]);

  const totalPaginas = Math.ceil(dados.length / itensPorPagina);
  const dadosPaginados = dados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  // PAGINAÇÃO INTELIGENTE COM "<< >>" NAS EXTREMIDADES E BOTÕES DE TAMANHO UNIFORME
  const renderPaginacao = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pagina - 2);
    let endPage = Math.min(totalPaginas, pagina + 2);

    if (pagina <= 3) {
      endPage = Math.min(totalPaginas, maxPagesToShow);
      startPage = 1;
    } else if (pagina >= totalPaginas - 2) {
      startPage = Math.max(1, totalPaginas - maxPagesToShow + 1);
      endPage = totalPaginas;
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <View style={styles.paginacaoContainer}>
        {/* << Ir para a primeira página */}
        <TouchableOpacity
          onPress={() => pagina > 1 && setPagina(1)}
          disabled={pagina === 1}
          style={[
            styles.paginaBotao,
            pagina === 1 && styles.paginaBotaoDesativado,
          ]}
        >
          <ThemedText style={styles.textoBotao}>{'<<'}</ThemedText>
        </TouchableOpacity>

        {/* ... antes do bloco, se houver páginas anteriores */}
        {startPage > 1 && (
          <View style={styles.paginaBotao}>
            <ThemedText style={styles.textoBotao}>...</ThemedText>
          </View>
        )}

        {/* Números de página do intervalo */}
        {pages.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPagina(p)}
            style={[
              styles.paginaBotao,
              p === pagina && styles.paginaSelecionada,
            ]}
          >
            <ThemedText
              style={[
                styles.textoBotao,
                p === pagina && styles.textoSelecionado,
              ]}
            >
              {p}
            </ThemedText>
          </TouchableOpacity>
        ))}

        {/* ... depois do bloco, se houver páginas posteriores */}
        {endPage < totalPaginas && (
          <View style={styles.paginaBotao}>
            <ThemedText style={styles.textoBotao}>...</ThemedText>
          </View>
        )}

        {/* >> Ir para a última página */}
        <TouchableOpacity
          onPress={() => pagina < totalPaginas && setPagina(totalPaginas)}
          disabled={pagina === totalPaginas}
          style={[
            styles.paginaBotao,
            pagina === totalPaginas && styles.paginaBotaoDesativado,
          ]}
        >
          <ThemedText style={styles.textoBotao}>{'>>'}</ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText style={styles.errorText}>Erro: {error}</ThemedText>
      </View>
    );
  }

  return (
    <>
      <HeaderCustom />
      <ScrollView contentContainerStyle={styles.homeContainer}>
        <Animated.View
          style={[
            styles.animatedSection,
            {
              opacity: animated,
              transform: [
                {
                  translateY: animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ThemedText style={styles.sectionTitle}>Tabela de Veículos</ThemedText>

          <View>
            <TabelaHeader />
            <FlatList
              data={dadosPaginados}
              keyExtractor={(item) => item.NR_PLACA}
              renderItem={({ item, index }) => (
                <LinhaVeiculo item={item} index={index} />
              )}
              scrollEnabled={false}
            />

            {/* Paginação inteligente com << e >> */}
            {totalPaginas > 1 && renderPaginacao()}

            {/* Botão Detalhes/Extrato */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/login')}
            >
              <ThemedText style={styles.buttonText}>Detalhes/Extrato</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    width: '100%',
    maxWidth: Dimensions.get('window').width,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 130,
    paddingBottom: 80,
    backgroundColor: '#ffffff',
    minHeight: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  animatedSection: {
    width: '100%',
    overflow: 'hidden',
  },
  paginacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 2, // Menor espaçamento entre botões
  },
  // Botão de página (tamanho uniforme para todos os números)
  paginaBotao: {
    width: 38,             // Largura fixa
    height: 38,            // Altura fixa (quadrado)
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007bff',
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',      // Centraliza horizontalmente
    marginHorizontal: 1,       // Espaçamento mínimo entre botões
    backgroundColor: '#fff',
  },
  // Estilo aplicado quando o botão está desativado (primeira/última página)
  paginaBotaoDesativado: {
    opacity: 0.3,
  },
  // Cor de fundo e cor do texto quando selecionado
  paginaSelecionada: {
    backgroundColor: '#007bff',
  },
  textoBotao: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'normal',
  },
  textoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#e65100',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

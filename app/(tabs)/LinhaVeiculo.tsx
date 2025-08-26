import React, { useEffect, useRef } from 'react'; 
import { Animated, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export type Veiculo = {
  NR_PLACA: string;
  NM_MODELO: string;
  NM_ANO: string;
  NM_COR: string;
  VL_PEDIDO: number;
  TP_COMBUSTIVEL: number;
  TP_SITUACAO: number;
  TP_BLINDADO: number;
  NM_TRANSACAO: string;
};

type Props = {
  item: Veiculo;
  index: number;
};

const LinhaVeiculo = ({ item, index }: Props) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      delay: index * 50,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index, slideAnim]);

  const backgroundColor = index % 2 === 0 ? '#ffffff' : '#e9f4ff';

  // Função para ajustar fonte do campo VALOR
  function getValorFontSize(valor: number | undefined) {
    if (!valor) return 11;
    const n = valor.toString().replace(/\D/g, '').length;
    if (n >= 7) return 8.8;      // 1 milhão ou mais
    if (n >= 6) return 10.2;     // 100 mil ou mais
    return 11;                   // menor que 100 mil
  }

  return (
    <Animated.View
      style={[
        styles.row,
        {
          backgroundColor,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
          opacity: slideAnim,
        },
      ]}
    >
      {/* Cada ThemedText agora recebe transform: [{ scaleY: 1.2 }] */}
      <ThemedText style={[styles.colPlaca, { transform: [{ scaleY: 1.6 }] }]}>
        {item.NR_PLACA.replace(/-/g, '')}
      </ThemedText>

      <ThemedText
        style={[styles.colModelo, { transform: [{ scaleY: 1.8 }] }]}
        numberOfLines={1}
      >
        {item.NM_MODELO || '—'}
      </ThemedText>

      <ThemedText style={[styles.colAno, { transform: [{ scaleY: 1.55 }] }]}>
        {formatAno(item.NM_ANO)}
      </ThemedText>

      <ThemedText style={[styles.colCor, { transform: [{ scaleY: 1.55 }] }]}>
        {item.NM_COR?.substring(0, 3) || '—'}
      </ThemedText>

      <ThemedText
        style={[
          styles.colValor,
          {
            fontSize: getValorFontSize(item.VL_PEDIDO),
            transform: [{ scaleY: 1.8 }],
          },
        ]}
      >
        {item.VL_PEDIDO?.toLocaleString('pt-BR') || '—'}
      </ThemedText>

      <ThemedText style={[styles.colComb, { transform: [{ scaleY: 1.55 }] }]}>
        {combustivel(item.TP_COMBUSTIVEL)}
      </ThemedText>

      <View style={[styles.colSit, { backgroundColor: getBg(item.TP_SITUACAO) }]}>
        <ThemedText
          style={{
            color: getTextColor(item.TP_SITUACAO),
            fontSize: 8,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center',
            includeFontPadding: false,
            transform: [{ scaleY: 1.3 }], // um pouco mais esticado para o status
          }}
        >
          {situacao(item.TP_SITUACAO)}
        </ThemedText>
      </View>

      <ThemedText style={[styles.colTran, { transform: [{ scaleY: 1.55 }] }]}>
        {item.NM_TRANSACAO?.toUpperCase().includes('CONSIG') ? 'CN'
          : item.NM_TRANSACAO?.toUpperCase().includes('AQUIS') ? 'AQ'
          : '—'}
      </ThemedText>
    </Animated.View>
  );
};

export default LinhaVeiculo;

// Auxiliares
const formatAno = (ano: string) =>
  ano?.replace(/\b\d{2}(\d{2})\b/g, '$1').replace(/[-\s]/g, '/') || '—';
const combustivel = (tipo: number) =>
  ['GAS', 'ALC', 'DIE', 'FLE', 'HIB', 'ELE'][tipo - 1] || tipo;
const situacao = (s: number) => ({ 1: 'ES', 7: 'PD', 8: 'FN' }[s] || `${s}`);
const getBg = (s: number) => ({
  1: '#28a745', // Verde (ES)
  7: '#ffc107', // Amarelo (PD)
  8: '#dc3545', // Vermelho (FN)
}[s] || '#6c757d');
const getTextColor = (s: number) => ({
  1: '#fff',
  7: '#000',
  8: '#fff',
}[s] || '#fff');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 4,  // aumentamos um pouco para não cortar o texto esticado
    paddingHorizontal: 2,
  },
  colPlaca: {
    flex: 1.25,
    fontSize: 11.3,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    marginLeft: -4,
    paddingLeft: 0,
    paddingRight: 2,
  },
  colModelo: {
    flex: 3.0,
    fontSize: 9.92,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#111',
    paddingLeft: 0,
    marginLeft: -2,
    paddingRight: 2,
  },
  colAno: {
    flex: 0.68,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    marginLeft: 4,
  },
  colCor: {
    flex: 0.58,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  colValor: {
    flex: 0.878,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  colComb: {
    flex: 0.6,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  colSit: {
    minWidth: 22.6,
    height: 23,
    paddingHorizontal: 0.4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  colTran: {
    flex: 0.4,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
});

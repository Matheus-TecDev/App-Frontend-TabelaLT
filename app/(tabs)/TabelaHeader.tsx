import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function TabelaHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <ThemedText style={styles.colPlaca}>PLACA</ThemedText>
        <ThemedText style={styles.colModelo}>MODELO</ThemedText>
        <ThemedText style={styles.colAno}>ANO</ThemedText>
        <ThemedText style={styles.colCor}>COR</ThemedText>
        <ThemedText style={styles.colValor}>VALOR</ThemedText>
        <ThemedText style={styles.colComb}>COMB</ThemedText>
        <ThemedText style={styles.colSit}>SIT</ThemedText>
        <ThemedText style={styles.colTran}>TP</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginBottom: 8,
    alignItems: 'center',
  },
  colPlaca: {
  flex: 1.146,
  fontSize: 12,
  paddingHorizontal: 0,
  marginLeft: -8,   
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
colModelo: {
  flex: 3.1,
  fontSize: 12,
  paddingHorizontal: 2,  // menos afastado da esquerda
  marginLeft: -3,        // mais próximo da esquerda
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'left',
},
   colAno: {
  flex: 0.51,
  fontSize: 12,
  paddingHorizontal: 1,
  marginLeft: 0.2,   
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
colCor: {
  flex: 0.4819,
  fontSize: 12,
  paddingHorizontal: 1,
  marginLeft: 0.1,   
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
colValor: {
  flex: 0.775,
  fontSize: 12,
  paddingHorizontal: 1,
  marginLeft: 1.5,   
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
  colComb: {
    flex: 0.69, // aumentado para não quebrar "COMB"
    fontSize: 12,
    paddingHorizontal: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colSit: {
    flex: 0.43,
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  colTran: {
    flex: 0.305,
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

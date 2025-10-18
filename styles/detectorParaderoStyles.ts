import { StyleSheet } from 'react-native';

export const detectorParaderoStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 0,
    backgroundColor: '#181818',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paraderoBox: {
    backgroundColor: '#0b910fff',
    borderRadius: 9,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 16,
  },
  paraderoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  tituloProximasMicros: {
    color: '#800e0eff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 14,
    marginTop: 2,
  },
  listaMicrosContainer: {
    paddingBottom: 24,
  },
  filaMicro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    justifyContent: 'space-between',
  },
  microCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  microNum: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#fff',
    minWidth: 55,
    textAlign: 'right',
  },
  busEmoji: {
    fontSize: 22,
    marginLeft: 9,
    marginRight: 3,
    marginTop: 1,
  },
  infoCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    minWidth: 100,
    gap: 2,
  },
  llegaTiempo: {
    color: '#bbb',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  patente: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  microDist: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  separadorFila: {
    height: 1,
    backgroundColor: '#252526',
    marginVertical: 5,
    borderRadius: 10,
    opacity: 0.40,
  },
  sinMicros: {
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

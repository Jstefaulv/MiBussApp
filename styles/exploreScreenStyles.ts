import { StyleSheet } from 'react-native';
export const exploreScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050505',
  },
   bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#1C2331', // Banner color sólido
    marginBottom: 8,
    width: '100%',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  container: { padding: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#2978D7',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#222',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginVertical: 6,
  },
  filaMicro: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    marginBottom: 6,
  },
  microCol: {
    backgroundColor: '#2978D7',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 12,
    minWidth: 55,
    alignItems: 'center',
  },
  microNum: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  patente: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  llegaTiempo: {
    color: '#4ecdc4',
    fontSize: 15,
    marginVertical: 2,
  },
  microDist: {
    color: '#fff',
    fontSize: 15,
    marginVertical: 2,
  },
  separadorFila: {
    height: 1,
    backgroundColor: '#333',
    marginTop: 10,
  },
  listaContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
  },

});

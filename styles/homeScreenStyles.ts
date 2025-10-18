
import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  paraderoContainer: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    margin: 16,
  },
  paraderoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

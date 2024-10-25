import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getLatestGames } from './lib/metacritic';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null); // Juego seleccionado
  const scrollViewRef = useRef(null); // Referencia al ScrollView

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
      setSelectedGame(games[0]); // Mostrar el primer juego por defecto
    });
  }, []);

  // Función para manejar el clic en la tarjeta
  const handleCardClick = (game) => {
    setSelectedGame(game); // Actualiza el juego seleccionado
    // Desplazarse a la parte superior después de seleccionar una tarjeta
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        {selectedGame && (
          // Tarjeta grande para el juego seleccionado
          <View style={styles.largeCard}>
            <Text style={styles.largeTitle}>{selectedGame.title}</Text>
            <Image source={{ uri: selectedGame.image }} style={styles.largeImage} />
            <Text style={styles.largeData}>{selectedGame.releaseDate}</Text>
            <Text style={styles.largeDescription}>{selectedGame.description}</Text>
            <Text style={styles.largeScore}>{selectedGame.score}</Text>
          </View>
        )}

        <View style={styles.smallCardsContainer}>
          {games.map((game) => (
            // Tarjetas pequeñas abajo
            <TouchableOpacity key={game.slug} onPress={() => handleCardClick(game)}>
              <View style={styles.smallCard}>
                <Image source={{ uri: game.image }} style={styles.smallImage} />
                <Text style={styles.smallTitle}>{game.title}</Text>
                <Text style={styles.smallData}>{game.releaseDate}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, // Ajuste de margen superior para que la tarjeta no choque con la parte superior
  },
  largeCard: {
    padding: 20,
    backgroundColor: '#000', // Cambiando el color de fondo a negro
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20, // Reducir el tamaño en los lados
  },
  largeImage: {
    width: 250, // Ajustando el ancho de la imagen
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto en blanco para que sea visible en el fondo negro
    marginBottom: 10,
  },
  largeData: {
    fontSize: 16,
    color: '#888', // Texto en gris claro
    marginBottom: 10,
  },
  largeDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff', // Texto en blanco
    marginBottom: 10,
  },
  largeScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Texto en blanco
  },
  smallCardsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  smallCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  smallData: {
    fontSize: 14,
    color: '#888',
  },
});

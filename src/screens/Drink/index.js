import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import YouTube from 'react-native-youtube';
import {useYoutubeVideo} from '../../hooks/useYoutubeVideo';
import {YOUTUBE_API_KEY} from 'react-native-dotenv';

export default function Drink({route, navigation}) {
  const {
    strDrink: cocktailName,
    strDrinkThumb,
    strInstructions,
    strAlcoholic,
    ...item
  } = route.params.item;

  const videoId = useYoutubeVideo(cocktailName);

  const ingredients = Object.entries(item)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map(([, value]) => value);

  navigation.setOptions({title: cocktailName});

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: strDrinkThumb}} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>How to</Text>
        <Text style={styles.content}>{strInstructions}</Text>
        <Text style={styles.title}>Ingredients</Text>
        <Text style={styles.content}>
          {ingredients.length > 0
            ? ingredients.reduce((acc, cur) => `${acc} ${cur},`).slice(0, -1)
            : 'No ingredient'}
        </Text>
      </View>
      {strAlcoholic === 'Non alcoholic' && (
        <Image
          style={styles.warning}
          source={{
            uri: 'https://www.sojennie.paris/img/cms/O_Alcool_EN.png',
          }}
        />
      )}
      <View style={styles.videoContainer}>
        {!videoId && <Text style={styles.content}>Loading video</Text>}
        {videoId && (
          <YouTube
            apiKey={YOUTUBE_API_KEY}
            videoId={videoId}
            style={styles.video}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
  },
  textContainer: {
    backgroundColor: 'rgb(70,49,104)',
    width: '100%',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  warning: {
    width: '30%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  image: {
    backgroundColor: 'rgb(225, 225, 225)',
    borderRadius: 5,
    width: '50%',
    aspectRatio: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  videoContainer: {
    backgroundColor: 'black',
    width: '100%',
    flex: 1,
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '80%',
    height: 200,
  },
});

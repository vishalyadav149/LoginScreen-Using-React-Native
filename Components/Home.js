import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import axios from 'axios';
import styles from '../Css/style.js';

const Item = props => {
  // console.warn(props);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.viewModel}>
      <TouchableOpacity
        style={styles.boxModel}
        onPress={() => setShowModal(true)}>
        <View style={styles.box}>
          <Image
            source={require('../assets/movie.png')}
            style={styles.movieImg}></Image>
        </View>
        <View>
          <View style={styles.moviesData}>
            <Text style={styles.movieInfo}>{props.data.item.title}</Text>
            <Text style={styles.movieInfo}>{props.data.item.releaseYear}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.movieDetail}>Movie Details</Text>
            <View style={styles.movieBox}>
              <Text style={styles.movieInfo}>
                Movie Name:{' '}
                <Text style={styles.movieData}>{props.data.item.title}</Text>
              </Text>
              <Text style={styles.movieInfo}>
                Release Year:{' '}
                <Text style={styles.movieData}>
                  {props.data.item.releaseYear}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Home = props => {
  // console.warn(props.route.params);


  const date = new Date();
  const datetime = date.getDate() + "/"
  + date.getMonth() + "/"
  + date.getFullYear() + " "
  + date.getHours() + ":"
  + date.getMinutes() + ":"
  + date.getSeconds() 

  // const timeOptions = {hour12: false};
  // const formattedTime = date.toLocaleTimeString([], timeOptions);

  const [data, setData] = useState([]);
  const email = props.route.params.email;
  const arr = email.split('.');
  const name = arr[0];
  const str = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    axios.get('https://reactnative.dev/movies.json').then(res => {
      setData(res.data.movies);
    });
  }, []);

  // console.warn(str);
  return (
    <View style={{flex: 1, backgroundColor: 'darkblue', alignItems: 'center'}}>
      <Text
      style={{
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginTop: 25,
        // padding: 20,
      }}>


          {datetime} 
          </Text>
      <Text
        style={{
          fontSize: 24,
          color: 'white',
          textAlign: 'center',
          marginVertical: 20,
          // padding: 5,
        }}>
  
        
          <Text>
          Welcome {str}
        </Text>
      </Text>
      <FlatList
        data={data}
        renderItem={item => {
          return <Item data={item} />;
        }}></FlatList>
      <TouchableOpacity
        style={styles.Backbtn}
        onPress={() => props.navigation.goBack()}>
        <Text style={styles.btnText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

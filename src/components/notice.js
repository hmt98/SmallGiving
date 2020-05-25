import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keybroad,
  keyboardType,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Alert,
  ToastAndroid,
  FlatList,
} from 'react-native';
import datathongbao from '../flatlist/datathongbao';
import logo from '../../images/logo.png';
export default class thongbao extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ViThongbao}>
          <Text style={styles.txtThongbao}>Thông báo</Text>
        </View>
        <FlatList
          data={datathongbao}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.txtxuat}>
              <View style={styles.tbAnh}>
                <Image source={logo} style={styles.imgTim} />
                <Text style={styles.txtNoidung1}>{item.name}</Text>
              </View>
              <Text style={styles.txtNoidung}>{item.noidung}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ViThongbao: {
    justifyContent: 'center',
    paddingLeft: '40%',
    height: '7%',
    backgroundColor: '#B91313',
    fontSize: 20,
    color: '#FCF7F7',
  },
  txtThongbao: {
    fontSize: 18,
    color: '#FCFCFC',
  },
  txtxuat: {
    borderBottomWidth: 1,
    borderBottomColor: '#545454',
    paddingLeft: '3%',
  },
  txtNoidung1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtNoidung: {
    paddingLeft: '2%',
  },
  tbAnh: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  imgTim: {
    width: '10%',
    height: '95%',
  },
});

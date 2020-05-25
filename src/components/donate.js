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
  ToastAndroid,
} from 'react-native';
import nguoigia from '../../images/nguoigia.png';
import coin from '../../images/coin.png';
export default class changepass extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.down}>
          <Image style={styles.imgNguoigia} source={nguoigia} />
        </View>
        <View style={styles.last}>
          <View style={styles.last1}>
            <Text style={styles.txtQG}>Quyên góp cho người già...</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.imgX}>
              <Text style={styles.x}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Tien}>
            <Image style={styles.imgCoin} source={coin} />
            <Text style={styles.txtSotien}>Số tiền hiện tại bạn có là:</Text>
            <Text style={styles.txtTien}>2.000.000 VNĐ</Text>
            <TextInput
              style={styles.ipTien}
              placeholder="Nhập số tiền..."
              placeholderTextColor="#707070"
              keyboardType="default"
            />
            <TouchableOpacity style={styles.btnQuyengop}>
              <Text style={styles.ttQuyengop}>Quyên góp</Text>
            </TouchableOpacity>
            <View style={styles.btnThem}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.btnBoqua}>
                <Text style={styles.ttBoqua}>Bỏ qua</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNaptien}>
                <Text style={styles.ttNaptien}>Nạp tiền</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  up: {
    flex: 1.5,
    flexDirection: 'column',
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  down: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'green',
    alignItems: 'center',
  },
  last: {
    flex: 7,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  upText: {
    fontSize: 25,
    color: 'white',
    paddingTop: 20,
  },
  imgNguoigia: {
    height: 200,
    width: 420,
  },
  imgCoin: {
    height: 80,
    width: 80,
  },
  last1: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: 10,
    height: 30,
  },
  txtQG: {
    flex: 8,
    flexDirection: 'row',
    fontSize: 25,
    textAlign: 'center',
    borderBottomColor: '#545454',
    fontWeight: 'bold',
  },
  imgX: {
    flex: 2,
    flexDirection: 'row',
  },
  x: {
    color: '#3F3F3F',
    fontSize: 25,
    textAlign: 'center',
    paddingLeft: 45,
  },
  txtSotien: {
    fontSize: 25,
  },
  txtTien: {
    fontSize: 25,
    color: '#AA040D',
    textAlign: 'center',
  },
  Tien: {
    marginBottom: 40,
    alignItems: 'center',
  },
  btnQuyengop: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    borderColor: '#DE1F28',
    backgroundColor: '#B00C14',
    marginTop: 60,
    marginLeft: 5,
  },
  btnBoqua: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    borderColor: '#DE1F28',
    backgroundColor: '#F8F3F3',
    marginTop: 20,
    marginLeft: 5,
  },
  btnNaptien: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    borderColor: '#DE1F28',
    backgroundColor: '#F8F3F3',
    marginTop: -40,
    marginLeft: 200,
  },
  ttBoqua: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#B00C14',
  },
  ttNaptien: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#B00C14',
  },
  ttQuyengop: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#F8F3F3',
  },
  ipTien: {
    borderColor: '#DE1F28',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    marginBottom: -50,
    marginVertical: 10,
    width: 170,
    paddingLeft: 8,
    fontSize: 20,
  },
});

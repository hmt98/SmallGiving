import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import history from './history';
var {width, height} = Dimensions.get('window');
export default class History_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readfull: false,
      naptien: true,
    };
  }
  render() {
    const item = this.props.item;
    const historyIn = this.props.historyIn;
    if (item.SoTienKS * 1 > 0) {
      this.state.naptien = false;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.thoigian}>
            <Text style={styles.txtThoigian}>{item.ThoiGianNap}</Text>
          </View>
          <View style={styles.sotien}>
            <Text
              style={[
                styles.txtSotien,
                {color: historyIn ? 'green' : '#AE1F17'},
              ]}>
              {historyIn ? '+' : '-'}
            </Text>
            <Text
              style={[
                styles.txtSotien,
                {color: historyIn ? 'green' : '#AE1F17'},
              ]}>
              {item.SoTienQG}
            </Text>
            <Text
              style={[
                styles.txtSotien,
                {color: historyIn ? 'green' : '#AE1F17'},
              ]}>
              {item.SoTienNap}
            </Text>
            <Text
              style={[
                styles.txtSotien,
                {color: historyIn ? 'green' : '#AE1F17'},
              ]}>
              {item.SoTienKS}
            </Text>
          </View>
        </View>
        <View style={styles.noidung}>
          {historyIn ? (
            <Text style={[styles.txtNoidung]}>
              {this.state.naptien ? 'Nạp tiền' : 'Làm phiếu khảo sát'}
            </Text>
          ) : (
            <Text
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}
              style={[styles.txtNoidung]}>
              Quyên góp: {item.TenHoatDong}
            </Text>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#AE1F17',
    // borderTopWidth: 1,
    // borderTopColor: '#545454',
    height: hp('7%'),
  },
  header: {
    flexDirection: 'row',
    marginTop: '1%',
  },
  thoigian: {
    flex: 5,
    marginLeft: '2%',
  },
  sotien: {
    flex: 5,
    flexDirection: 'row',
    marginLeft: '10%',
  },
  txtThoigian: {
    fontSize: f(2),
    color: '#545454',
  },
  txtSotien: {
    fontSize: f(2),
  },
  noidung: {
    marginLeft: '2%',
    marginTop: '1%',
    marginBottom: '1%',
  },
  txtNoidung: {
    fontSize: f(2),
  },
});

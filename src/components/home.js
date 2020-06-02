import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  RefreshControl,
  Alert,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import heart from '../../images/heart.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getBXHFromServer} from '../../networking/Server';
import Home_item from './home_item';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import getUserByToken from '../api/getUserByToken';
import getmoney from '../way4/getmoney';
import diemdanh from '../api/diemdanh';
const DATA = [
  {
    id: '1',
    Result: 'Chưa có dữ liệu',
  },
];
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      bxhFromServer: [],
      readfull: false,
      networkError: false,
      userName: '',
      bxhError: false,
      sdt: '',
      sodu: '',
    };
  }

  componentDidMount = async () => {
    this.refreshDataFromServer();
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then((resSDT) => resSDT['SDT'])
      .then((resJSON) => {
        this.setState({sdt: resJSON});
      })
      .catch((error) => console.log(error));
  };

  componentDidUpdate(preProps, preState, a) {
    const {sdt} = this.state;
    if (preState.sdt !== sdt) {
      this.getData();
    }
  }

  getData = () => {
    this.setState({refreshing: true});
    const {sdt} = this.state;
    getmoney(sdt)
      .then((resAvai) => resAvai['Available'])
      .then((resJSON) => {
        this.setState({sodu: resJSON, refreshing: false});
      })
      .catch((error) => {
        this.setState({refreshing: false});
        console.log(error);
      });
  };
  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getBXHFromServer()
      .then((res) => res['message'])
      .then((result) => {
        if (result === 'No post found') {
          this.setState({bxhError: true});
          this.setState({refreshing: false});
        } else {
          this.setState({bxhError: false});
          getBXHFromServer()
            .then((bxh) => {
              this.setState({bxhFromServer: bxh});
              this.setState({refreshing: false});
            })
            .catch((error) => {
              this.setState({bxhFromServer: []});
              this.setState({refreshing: false});
            });
        }
      })
      .catch((error) => console.log(error));
  };
  onRefresh = () => {
    this.refreshDataFromServer();
    this.getData();
  };
  khaosat() {
    Alert.alert('Notice!', 'Khảo sát!');
  }

  diemdanhF() {
    const {id} = this.state;
    diemdanh(id)
      .then((resJSON) => resJSON['message'])
      .then((res) => {
        if (res === 'Success') {
          Alert.alert('Notice!', 'Điểm danh thành công!');
        } else {
          Alert.alert('Error!', 'Đã hết lượt điểm danh trong ngày!');
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground style={styles.headerImage} source={heart}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <FontAwesome
                style={styles.menuIcon}
                name={'bars'}
                size={wp('10%')}
                color={'#AE1F17'}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.between}>
          <TouchableOpacity style={styles.khaosat}>
            <View style={styles.khaosat}>
              <AntDesign name={'areachart'} size={wp('5%')} color={'#AE1F17'} />
              <Text style={styles.txtBetween}>Khảo sát</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.diemdanhF.bind(this)}
            style={styles.khaosat}>
            <View style={styles.khaosat}>
              <AntDesign name={'profile'} size={wp('5%')} color={'#AE1F17'} />
              <Text style={styles.txtBetween}>Điểm danh</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.khaosat}>
            <View style={styles.khaosat}>
              <FontAwesome name={'bell'} size={wp('5%')} color={'#AE1F17'} />
              <Text style={styles.txtBetween}>Thông báo</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.khaosat}>
            <View style={styles.khaosat}>
              <MaterialCommunityIcons
                name={'square-inc-cash'}
                size={wp('5%')}
                color={'#AE1F17'}
              />
              <Text style={styles.txtBetween}>{this.state.sodu}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.bxh}>
            <Text style={styles.txtBXH}>BẢNG XẾP HẠNG (Tháng)</Text>
          </View>
          <View style={styles.colName}>
            <View style={styles.colNameLeft}>
              <Text style={styles.txtColName}>HUY HIỆU</Text>
            </View>
            <View style={styles.colNameBetween}>
              <Text style={styles.txtColName}>NGƯỜI DÙNG</Text>
            </View>
            <View style={styles.colNameRight}>
              <Text style={styles.txtColName}>QUYÊN GÓP</Text>
            </View>
          </View>

          {this.state.bxhError ? (
            <FlatList
              data={DATA}
              renderItem={({item}) => (
                <View style={styles.bxhError}>
                  <Text style={styles.txtBxhError}>{item.Result}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          ) : (
            <FlatList
              data={this.state.bxhFromServer}
              renderItem={({item, index}) => <Home_item item={item} />}
              keyExtractor={(item, index) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 4,
  },
  between: {
    flex: 1,
    flexDirection: 'row',
  },
  diemdanh: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  khaosat: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sodu: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thongbao: {
    flex: 2.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBetween: {
    fontSize: f(2),
    color: '#AE1F17',
  },
  footer: {
    flex: 4,
  },
  headerImage: {
    height: hp('40%'),
    width: wp('100%'),
  },
  menuIcon: {
    margin: '5%',
  },
  bxh: {
    width: wp('100%'),
    height: hp('5%'),
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBXH: {
    color: 'white',
    fontSize: f(2),
    fontWeight: 'bold',
  },
  colName: {
    flexDirection: 'row',
    height: hp('5%'),
  },
  colNameLeft: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colNameBetween: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colNameRight: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtColName: {
    color: '#AE1F17',
    fontWeight: 'bold',
    fontSize: f(1.8),
  },
  bxhError: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  txtBxhError: {
    fontSize: f(2),
    color: '#AE1F17',
    fontWeight: 'bold',
  },
});
function mapStateToProps(state) {
  return {
    myToken: state.token,
  };
}
export default connect(mapStateToProps)(home);

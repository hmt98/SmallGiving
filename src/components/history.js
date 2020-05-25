import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  AsyncStorage,
  Alert,
  TouchableOpacity,
} from 'react-native';
import getHistoryIn from '../api/getHistoryIn';
import getHistoryOut from '../api/getHistoryOut';
import getUserByToken from '../api/getUserByToken';
import History_Item from './history_item';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';

export default class history extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Entypo
            name="chevron-left"
            color="#ffffff"
            size={f(3)}
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      historyIn: true,
      refreshing: false,
      historyInFromServer: [],
      historyOutFromServer: [],
      id: '',
    };
  }
  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then(resID => resID['idNguoiDung'])
      .then(resJSON => {
        this.setState({id: resJSON});
      })
      .catch(error => {
        this.onFailNetWork(error);
      });
  };
  componentDidUpdate(preProps, preState, a) {
    const {id} = this.state;
    if (preState.id !== id) {
      this.getdataIn();
      this.getdataOut();
    }
  }
  getdataIn() {
    const {id} = this.state;
    this.setState({refreshing: true});
    getHistoryIn(id)
      .then(result => {
        this.setState({historyInFromServer: result});
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.onFailNetWork(error);
        this.setState({historyInFromServer: []});
        this.setState({refreshing: false});
      });
  }
  getdataOut() {
    const {id} = this.state;
    this.setState({refreshing: true});
    getHistoryOut(id)
      .then(result => {
        this.setState({historyOutFromServer: result});
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.onFailNetWork(error);
        this.setState({historyOutFromServer: []});
        this.setState({refreshing: false});
      });
  }

  onRefresh = () => {
    this.getdataIn();
    this.getdataOut();
  };
  onFailNetWork(error) {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại', 'LỖI: ' + error);
    this.setState({isLoading: false});
  }
  moneyOut() {
    this.setState({historyIn: false});
  }
  moneyIn() {
    this.setState({historyIn: true});
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.viewHeader}>
            <View>
              <TouchableOpacity
                onPress={this.moneyIn.bind(this)}
                style={[
                  styles.buttonIn,
                  {
                    backgroundColor: this.state.historyIn
                      ? '#AE1F17'
                      : '#B5B5B5',
                  },
                ]}>
                <Text style={styles.txtButton}>Tiền vào</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={this.moneyOut.bind(this)}
                style={[
                  styles.buttonOut,
                  {
                    backgroundColor: this.state.historyIn
                      ? '#B5B5B5'
                      : '#AE1F17',
                  },
                ]}>
                <Text style={styles.txtButton}>Tiền ra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={
              this.state.historyIn
                ? this.state.historyInFromServer
                : this.state.historyOutFromServer
            }
            renderItem={({item, index}) => (
              <History_Item item={item} historyIn={this.state.historyIn} />
            )}
            keyExtractor={(item, index) => item.idLichSu}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
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
    borderColor: '#545454',
    borderBottomWidth: 2,
  },
  viewHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: '3%',
  },
  buttonIn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('7%'),
    width: wp('45%'),
    backgroundColor: '#AE1F17',
    borderTopLeftRadius: 20,
    borderRightWidth: 1,
    borderColor: 'white',
  },
  buttonOut: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('7%'),
    width: wp('45%'),
    backgroundColor: '#AE1F17',
    borderTopRightRadius: 20,
    borderLeftWidth: 1,
    borderColor: 'white',
  },
  txtButton: {
    color: 'white',
    fontSize: f(2.5),
  },
  flatlist: {
    marginTop: 10,
  },
});

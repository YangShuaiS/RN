import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import * as WeChat from 'react-native-wechat';


class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class ywgrn extends Component {
  constructor(props) {
    super(props);
    //应用注册
    WeChat.registerApp('wx19e98010f89da02d');
  }
  loadAccess_token(send){
  	var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx19e98010f89da02d&secret=beaba374a299de68991ccf1e3e607520&code='+send.code+'&grant_type=authorization_code'
    //按钮点击时的处理函数
     fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

      // this.setState({item:[
      // 					{banner:responseJson.banner},
      // 					{demand_sign:responseJson.demand_sign},
      // 					{radio_list:responseJson.radio_list},
      //           {demand_list:responseJson.demand_list},
      //           {news:responseJson.news},
      // 	]})
      this.loaduser(responseJson)
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  loaduser(access_token){
  	var url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token.access_token+'&openid='+access_token.openid
  	fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
      	// alert(responseJson)
      	console.log(responseJson)
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ margin: 20 }}>
        <Text style={styles.welcome}>
          微信好友/朋友圈分享实例
        </Text>
        <CustomButton text='微信好友分享-文本'
          onPress={() => {
            WeChat.isWXAppInstalled().then((isInstalled) => {
              if (isInstalled) {
                WeChat.shareToSession({
                  type: 'text',
                  description: '测试微信好友分享文本'
                }).catch((error) => {
                  ToastAndroid.show(error.message, ToastAndroid.SHORT);
                });
              } else {
                ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
              }
            });
          }}
        />
        <CustomButton text='微信好友分享-链接'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    title: '微信好友测试链接',
                    description: '分享自:王磊的博客(vipstone.cnblogs.com)',
                    thumbImage: 'http://mat1.gtimg.com/fashion/images/index/2017/08/25/mrjx1.jpg',
                    type: 'news',
                    webpageUrl: 'http://www.cnblogs.com/vipstone/p/7485081.html'
                  }).catch((error) => {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                  });
                } else {
                  ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                }
              });
          }}
        />
        <CustomButton text='微信朋友圈分享-文本'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    type: 'text',
                    description: '测试微信朋友圈分享文本'
                  }).catch((error) => {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                  });
                } else {
                  ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                }
              });
          }}
        />
        <CustomButton text='微信朋友圈分享-链接'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    title: '微信朋友圈测试链接',
                    description: '分享自:分享自:王磊的博客(vipstone.cnblogs.com)',
                    thumbImage: 'http://mat1.gtimg.com/fashion/images/index/2017/08/25/mrjx1.jpg',
                    type: 'news',
                    webpageUrl: 'http://www.cnblogs.com/vipstone/p/7485081.html'
                  })
                    .catch((error) => {
                      ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    });
                } else {
                  ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                }
              });
          }}
        />
         <CustomButton text='微信登录'
          onPress={() => {
            WeChat.isWXAppInstalled().then((isInstalled) => {
              if (isInstalled) {
               //发送授权请求
        		WeChat.sendAuthRequest('snsapi_userinfo', '123')
          		.then(responseCode => {
          			this.loadAccess_token(responseCode);
            	// this.getAccessToken(responseCode.code);
          })
          			.catch(err => {
          				//授权后一直走这个方法？
            	// alert('登录授权发生错误：', err.message, [
              	// {text: '确定'}
            // ]);
          })
              } else {
                ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
              }
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    margin: 5,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
});

AppRegistry.registerComponent('ywgrn', () => ywgrn);
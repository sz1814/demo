import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native'
import createAction from './store/createAction'
import store from '../store'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [1,2],
            zong: store.getState().home.zong,
            bank: store.getState().home.bank,
            product: store.getState().home.product,
            list: store.getState().home.list
        }

        store.subscribe(() => {
            this.setState(() => ({
                zong: store.getState().home.zong,
                bank: store.getState().home.bank,
                product: store.getState().home.product,
                list: store.getState().home.list
            }))
        })

        this.fn1 = this.fn1.bind(this)
    }

    fn1(data) {
        store.dispatch(createAction.getListAction(data))
    }

    componentDidMount() {
        store.dispatch(createAction.getZongAction)
        store.dispatch(createAction.getBankAction)
        store.dispatch(createAction.getProductAction)
    }

    render() {
        return (
            <ImageBackground style={styles.ImageBackground} source={require('../img/frontBg.png')}>
                {this.state.zong.length < 1 ? <View style={styles.loading}><Text style={styles.jiazai}>加载中...</Text></View> : <View></View> }

                {/* header */}
                <View style={styles.header}>
                    <Text>
                        <Image source={require('../img/jianjiaohao.png')} style={{ width: 20, height: 20 }}></Image>
                    </Text>
                    <Text style={{ fontSize: 18, color: '#fff' }}>持有明细</Text>
                    <Text></Text>
                </View>
                <View style={{ padding: 12 }}>
                    <Text style={{ color: '#fff' }}>
                        总金额
                        </Text>
                    <Text style={{ fontSize: 30, color: '#fff', fontWeight: '400' }}>{this.state.zong.currentAmount}</Text>
                </View>

                <View style={styles.Amount}>
                    <View>
                        <Text style={{ fontSize: 12, color: '#fff' }}>可用金额</Text>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500', marginTop: 10 }}>{this.state.zong.investmentAmount}</Text>
                    </View>
                    <View style={{ borderRightWidth: 1, borderRightColor: '#fff', width: 30 }}></View>
                    <View style={{}}>
                        <Text style={{ fontSize: 12, color: '#fff' }}>不可用金额</Text>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500', marginTop: 10 }}>{this.state.zong.intransitAssets}</Text>
                    </View>
                </View>

                {/* bank */}

                {
                    this.state.bank.map((item, index) => {
                        return (
                            <View key={index} style={{ padding: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 5, shadowColor: '#ccc', shadowRadius: 100}}>
                                    <View style={{ padding: 15, justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                        <Text style={{ fontSize: 18 }}>{item.bank}****{item.bankAccountNumber.slice(-4)}</Text>
                                        <Text style={{ fontSize: 18 }}>3,123,123,400.00</Text>
                                    </View>

                                    {
                                        this.state.list.map((item, index) => {
                                            return (
                                                <View key={index} style={{ padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 16 }}>{item.productName}</Text>
                                                        <Text style={{ fontSize: 16 }}>3,123,123,400.00</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                                                        <Text>累计收益</Text>
                                                        <Text>昨日收益 <Text style={{ fontSize: 12 }}>01-20</Text></Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row',  }}>
                                                        <Text style={styles.bigRed}>+{item.currentAmount}</Text>
                                                        <Text style={styles.bigRed}>+{item.profitLossDaily}</Text>
                                                    </View>
                                                    
                                                </View>
                                            )
                                        })
                                    }
                                    {this.state.product.length > 2 ? <View style={styles.gengduo}><Text onPress={this.fn1.bind(null, this.state.product)} style={{height: 50, lineHeight:50,textAlign: 'center'}}>查看更多</Text></View> : <View></View>}
                                </View>
                            </View>
                        )
                    })
                }
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    ImageBackground: {
        flex: 1,
        height: 230,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
        padding: 10,
    },
    Amount: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bigRed: {
        fontSize: 20,
        color: 'red',
        fontWeight: '500'
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#ccc',
        zIndex: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    jiazai: {
        width: 200,
        height: 200,
        backgroundColor: "#fff",
        position: 'absolute',
        lineHeight: 200,
        textAlign: 'center'
    }
})

export default Home;
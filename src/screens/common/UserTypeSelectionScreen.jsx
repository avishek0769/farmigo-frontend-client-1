import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function UserTypeSelectionScreen({ navigation }) {
    const [buyerChecked, setBuyerChecked] = useState(false)
    const [sellerChecked, setSellerChecked] = useState(false)
    const [enterBtnDisabled, setEnterBtnDisabled] = useState(false)
    const [showActivityInd, setShowActivityInd] = useState(false)


    const handleBuyerCheckBox = useCallback(() => {
        setBuyerChecked(!buyerChecked)
        setSellerChecked(false)
    }, [setBuyerChecked, buyerChecked, setSellerChecked])

    const handleSellerCheckBox = useCallback(() => {
        setSellerChecked(!sellerChecked)
        setBuyerChecked(false)
    }, [setBuyerChecked, sellerChecked, setSellerChecked])

    const handleEnter = useCallback(() => {
        setShowActivityInd(true)
        if (buyerChecked) {
            navigation.replace("BuyersTab")
        }
        else if (sellerChecked) {
            navigation.replace("SellerRegistration")
        }
    }, [buyerChecked, sellerChecked, navigation])

    useEffect(() => {
        if (!buyerChecked && !sellerChecked) {
            setEnterBtnDisabled(true)
        }
        else {
            setEnterBtnDisabled(false)
        }
    }, [buyerChecked, sellerChecked, setEnterBtnDisabled])

    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Image source={require("../../assets/images/userType.png")} style={{ width: 230, height: 230 }} />

            <Text style={style.title}>Select your user type</Text>

            <View>
                <Pressable onPress={handleBuyerCheckBox} style={style.optionView}>
                    <Image source={require("../../assets/images/farmer.png")} style={{ width: 50, height: 50 }} />
                    <Text style={style.optionText}>Buyer / Farmer</Text>
                    <BouncyCheckbox
                        onPress={handleBuyerCheckBox}
                        isChecked={buyerChecked}
                        size={25}
                        style={style.checkBox}
                        fillColor="#29bf12"
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 1 }}
                    />
                </Pressable>
                <Pressable onPress={handleSellerCheckBox} style={style.optionView}>
                    <Image source={require("../../assets/images/seller.jpg")} style={{ width: 50, height: 50 }} />
                    <Text style={style.optionText}>Seller / Vendor</Text>
                    <BouncyCheckbox
                        onPress={handleSellerCheckBox}
                        isChecked={sellerChecked}
                        style={style.checkBox}
                        size={25}
                        fillColor="#29bf12"
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 1 }}
                    />
                </Pressable>

                <Pressable android_ripple={"#ddd"} disabled={enterBtnDisabled} onPress={handleEnter} style={{ backgroundColor: enterBtnDisabled ? "#92e6a7" : "#29bf12", padding: 10, borderRadius: 5, marginTop: 90 }}>
                    {showActivityInd ?
                        <ActivityIndicator size={"large"} color={"#fff"} />
                        : <Text style={{ color: "white", fontFamily: 'Poppins-SemiBold', fontSize: 24, textAlign: "center", letterSpacing: 3 }}>Enter</Text>
                    }
                </Pressable>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    optionView: {
        backgroundColor: "#dee2e6",
        borderRadius: 5,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        width: 330,
        padding: 15,
        position: "relative"
    },
    optionText: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        paddingLeft: 10
    },
    checkBox: {
        position: "absolute",
        right: 1
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 30,
        color: '#2d3436',
        textAlign: 'center'
    },
})
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function UserTypeSelectionScreen({ navigation }) {
    const [buyerChecked, setBuyerChecked] = useState(false)
    const [sellerChecked, setSellerChecked] = useState(false)
    const [enterBtnDisabled, setEnterBtnDisabled] = useState(false)

    const handleBuyerCheckBox = useCallback(() => {
        setBuyerChecked(!buyerChecked)
        setSellerChecked(false)
    }, [setBuyerChecked, buyerChecked, setSellerChecked])

    const handleSellerCheckBox = useCallback(() => {
        setSellerChecked(!sellerChecked)
        setBuyerChecked(false)
    }, [setBuyerChecked, sellerChecked, setSellerChecked])

    const handleEnter = useCallback(() => {
        navigation.replace("Home")
    }, [])

    useEffect(() => {
        if(!buyerChecked && !sellerChecked){
            setEnterBtnDisabled(true)
        }
        else {
            setEnterBtnDisabled(false)
        }
    }, [buyerChecked, sellerChecked, setEnterBtnDisabled])

    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%"}}>
            <Image source={require("../assets/images/userType.png")} style={{ width: 230, height: 230 }} />

            <Text style={{fontSize: 30, fontWeight: "500", width: "100%", paddingLeft: 32}}>Select your user type</Text>
            <View>
                <Pressable onTouchEnd={handleBuyerCheckBox} style={style.optionView}>
                    <Image source={require("../assets/images/farmer.png")} style={{ width: 50, height: 50 }} />
                    <Text style={style.optionText}>Buyer / Farmer</Text>
                    <BouncyCheckbox
                        isChecked={buyerChecked}
                        size={25}
                        style={style.checkBox}
                        fillColor="#29bf12"
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 1 }}
                    />
                </Pressable>
                <Pressable onTouchEnd={handleSellerCheckBox} style={style.optionView}>
                    <Image source={require("../assets/images/seller.jpg")} style={{ width: 50, height: 50 }} />
                    <Text style={style.optionText}>Seller / Vendor</Text>
                    <BouncyCheckbox
                        isChecked={sellerChecked}
                        style={style.checkBox}
                        size={25}
                        fillColor="#29bf12"
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 1 }}
                    />
                </Pressable>
                <TouchableOpacity disabled={enterBtnDisabled} onPress={handleEnter} style={{ backgroundColor: enterBtnDisabled? "#92e6a7" : "#29bf12", padding: 10, borderRadius: 5, marginTop: 90}}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 24, textAlign: "center", letterSpacing: 3}}>Enter</Text>
                </TouchableOpacity>
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
        fontWeight: "500",
        paddingLeft: 10
    },
    checkBox: {
        position: "absolute",
        right: 1
    }
})
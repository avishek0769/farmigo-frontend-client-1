import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import QuantityController from './QuantityController'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function CartProductCard({ id, price, title, image, quantity, setQuantity, removeItem }) {

    return (
        <View style={{marginHorizontal: 15, marginTop: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ced4da", flexDirection: "row"}}>
            <View >
                <Image source={{uri: image}} style={{width: 120, height: 120, borderRadius: 10}} />
            </View>
            <View style={{width: "65%", paddingHorizontal: 10, paddingVertical: 2}}>
                <Text lineBreakMode='tail' numberOfLines={2} style={{fontSize: 16, fontWeight: '500', color: "#1d1e18"}}>{title}</Text>

                <QuantityController id={id} quantity={quantity} setQuantity={setQuantity} />

                <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12}}>
                    <Text style={{ fontWeight: "500"}}>{quantity} x ${price} = </Text>
                    <Text style={{ fontSize: 22, fontWeight: "500"}}>${price * quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(id)} style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, backgroundColor: "#f8d7da", width: 100 }}>
                    <Icon name='close' size={23} color={"#dc3545"} />
                    <Text style={{ color: "#dc3545", fontWeight: "bold" }}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
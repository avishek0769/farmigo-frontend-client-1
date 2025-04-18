import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import QuantityController from './QuantityController'

export default function CartProductCard({ price, title, image, initialQuantity }) {
    const [quantity, setQuantity] = useState(initialQuantity);
    

    return (
        <View style={{margin: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ced4da", flexDirection: "row"}}>
            <View >
                <Image source={{uri: image}} style={{width: 130, height: 130, borderRadius: 10}} />
            </View>
            <View style={{width: "65%", paddingHorizontal: 10, paddingVertical: 2}}>
                <Text lineBreakMode='tail' numberOfLines={2} style={{fontSize: 16, fontWeight: '500', color: "#1d1e18"}}>{title}</Text>

                <QuantityController quantity={quantity} setQuantity={setQuantity} />

                <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12}}>
                    <Text style={{ fontWeight: "500"}}>{quantity} x ${price} = </Text>
                    <Text style={{ fontSize: 22, fontWeight: "500"}}>${price * quantity}</Text>
                </View>
            </View>
        </View>
    )
}
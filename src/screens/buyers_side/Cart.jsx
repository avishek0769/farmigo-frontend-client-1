import { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CartProductCard from '../../components/buyers_side/CartProductCard'
import Header from '../../components/buyers_side/Header'
import { THEME_COLOR } from '../../constant'


const EmptyCart = ({ navigation }) => (
    <View style={styles.emptyContainer}>
        <Image
            source={require("../../assets/icons/emptyCart.png")}
            style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add items to start shopping</Text>
        <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate("BuyersTab")}
        >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
    </View>
)

export default function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Panchagavya	Liquid organic growth booster",
            image: "https://agribegri.com/admin/images/prod_image/13465198701739771114.webp",
            quantity: 2,
            price: 120
        },
        {
            id: 2,
            title: "Seaweed Extract	Plant tonic",
            image: "https://m.media-amazon.com/images/I/61uzenjVmjL.jpg",
            quantity: 1,
            price: 90
        },
        {
            id: 3,
            title: "SSP	(Single Super Phosphate)",
            image: "https://mahadhan.co.in/wp-content/uploads/2017/05/single-phosper-sulfate.png",
            quantity: 3,
            price: 150
        },
        {
            id: 4,
            title: "MOP	(Muriate of Potash)",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ788VZMsiHrPa2cnTb8HlQ_n68O3nVcheRnw&s",
            quantity: 1,
            price: 250
        },
        {
            id: 5,
            title: "Karate Lambda-Cyhalothrin",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9zIrMOyXyCOurrCStIb3K0OO-uqTvGh6DgA&s",
            quantity: 2,
            price: 60
        },
        {
            id: 6,
            title: "Thimet Phorate",
            image: "https://5.imimg.com/data5/SELLER/Default/2022/2/OS/RY/EX/37703988/thinet-10-g-2--500x500.JPG",
            quantity: 1,
            price: 100
        },
    ])
    const [totalPrice, setTotalPrice] = useState(0)
    const [discount, setDiscount] = useState(250)
    const [deliveryCharges, setDeliveryCharges] = useState(20)

    useEffect(() => {
        if (cartItems.length) {
            setTotalPrice(0)
            cartItems.map(item => {
                setTotalPrice(prev => prev + (item.price * item.quantity))
            })
            setTotalPrice(prev => (prev - discount) + deliveryCharges)
        }
    }, [cartItems])

    const setQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    }

    const removeItem = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    return (
        <>
            <Header inCartScreen={true} showSearchIcon />

            {cartItems.length === 0 ? (
                <EmptyCart navigation={navigation} />
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => String(item.id)}
                        style={{ backgroundColor: "#fff" }}
                        renderItem={({ item }) => (
                            <CartProductCard
                                id={item.id}
                                image={item.image}
                                price={item.price}
                                quantity={item.quantity}
                                title={item.title}
                                setQuantity={setQuantity}
                                removeItem={removeItem}
                            />
                        )}
                        ListHeaderComponent={
                            <>
                                <Text style={styles.headerTitle}>My Cart ({cartItems.length})</Text>
                                <View style={styles.summaryContainer}>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Gross Total </Text>
                                        <Text style={styles.summaryValue}>₹{totalPrice}</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Discount (-)</Text>
                                        <Text style={[styles.summaryValue, { color: '#28a745' }]}>-₹{discount}</Text>
                                    </View>
                                    <View style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>Delivery Charges (+) </Text>
                                        <Text style={styles.summaryValue}>₹{deliveryCharges}</Text>
                                    </View>
                                    <View style={[styles.summaryRow, styles.totalRow]}>
                                        <Text style={styles.totalLabel}>Total </Text>
                                        <Text style={styles.totalValue}>₹{totalPrice}</Text>
                                    </View>
                                </View>
                            </>
                        }
                        ListFooterComponent={
                            <View style={{margin: 40}}></View>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Checkout")}
                        style={styles.checkoutButton}
                    >
                        <Icon name='paid' size={27} color={"white"} />
                        <Text style={styles.checkoutButtonText}>
                            Proceed to checkout
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        color: "#343a40",
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    summaryContainer: {
        marginVertical: 20,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderRadius: 12,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d'
    },
    summaryValue: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#495057'
    },
    totalRow: {
        borderTopWidth: 1,
        borderColor: "#ced4da",
        marginTop: 8,
        paddingTop: 12
    },
    totalLabel: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#212529'
    },
    totalValue: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: THEME_COLOR
    },
    checkoutButton: {
        backgroundColor: THEME_COLOR,
        borderRadius: 8,
        padding: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 3
    },
    checkoutButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        letterSpacing: 0.5,
        color: "white"
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: "80%",
    },
    emptyImage: {
        width: 150,
        height: 150,
        opacity: 0.8,
        marginBottom: 20
    },
    emptyTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#343a40',
        marginBottom: 8
    },
    emptySubtitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#6c757d',
        marginBottom: 25
    },
    shopButton: {
        backgroundColor: THEME_COLOR,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 2
    },
    shopButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    }
});
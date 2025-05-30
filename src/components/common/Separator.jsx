import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';


export default function Separator() {
    return (
        <View>
            <View style={{ width: "100%", backgroundColor: "#ced4da", height: 1 }}></View>
        </View>
    )
}

export function GradientSeparator ({ first = "", second = first, third = second }) {
    return (
        <View style={{marginVertical: 10}}>
            <LinearGradient
                colors={[first, second, third]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.separatorGradient}
            />
        </View>
    )
}

const styles = {
    separatorGradient: {
        height: 8,
        width: '100%',
    },
}
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';


export const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'App needs access to your location',
                buttonPositive: 'OK',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};

export const detectLocation = async (businessLogicFunc, setLoadingFunc, setErrorFunc) => {
    setLoadingFunc(true);
    setErrorFunc('');

    try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            setLoadingFunc(false);
            setErrorFunc('Location permission denied');
        }

        Geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
                    );
                    const data = await response.json();
                    console.log(data.display_name);
                    businessLogicFunc(data)
                    setLoadingFunc(false);
                }
                catch (err) {
                    setLoadingFunc(false);
                    setErrorFunc('Ensure internet connection is available');
                }
            },
            (error) => {
                if (error.code === 2) {
                    setErrorFunc("Location service is not enabled");
                }
                else if (error.code === 1) {
                    setErrorFunc("Location permission denied");
                }
                else {
                    setErrorFunc("Location service error");
                }
                setLoadingFunc(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 10000,
                forceRequestLocation: true,
                showLocationDialog: true
            }
        );
    }
    catch (err) {
        setLoadingFunc(false);
        setErrorFunc('Location service error');
    }
};
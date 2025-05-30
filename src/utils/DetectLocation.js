import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};

export const detectLocation = async (businessLogicFunc, setLoadingFunc, setErrorFunc) => {
  setLoadingFunc(true);
  setErrorFunc('');

  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLoadingFunc(false);
      setErrorFunc('Location permission denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      console.log(data.display_name);
      businessLogicFunc(data);
      setLoadingFunc(false);
    } catch (err) {
      setLoadingFunc(false);
      setErrorFunc('Ensure internet connection is available');
    }

  } catch (error) {
    setLoadingFunc(false);
    if (error.code === 'E_LOCATION_SERVICES_DISABLED') {
      setErrorFunc('Location services are disabled');
    } else {
      setErrorFunc('Location service error');
    }
  }
};

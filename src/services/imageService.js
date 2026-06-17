import * as ImagePicker from 'expo-image-picker';
export async function takePhoto() {
  const result = await ImagePicker.launchCameraAsync({ quality: 0.7, allowsEditing: true });
  if (result.canceled) return null;
  return result.assets[0].uri;
}
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, allowsEditing: true });
  if (result.canceled) return null;
  return result.assets[0].uri;
}

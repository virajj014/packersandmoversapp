// import { Button, Image, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import * as ImagePicker from 'expo-image-picker';
// import client from '../../../api/client';

// const PickImage = () => {
//     const [profileImage, setProfileImage] = useState(null);
//     const [downloadUrl, setDownloadUrl] = useState(null);
//     const [uploadProgress, setUploadProgress] = useState(null);

//     const pickImageHandler = async () => {
//         setUploadProgress(null);
//         setDownloadUrl(null);


//         ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [1, 1],
//         }).then((result) => {
//             if (!result.canceled) {
//                 console.log(result);
//                 setProfileImage(result.assets);
//             }
//             else {
//                 alert('You have not selected any image');
//             }
//         })
//             .catch((err) => {
//                 alert(err);
//             });


//         const uploadImageHandler = async () => {
//             const formData = new FormData();
//             formData.append('profileimage', {
//                 uri: profileImage,
//                 type: 'image/jpeg',
//                 name: 'image.jpg'

//             });
//             client.post('/uploadimage',
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Accept: 'application/json',
//                         Authorization: 'Bearer ' + 'token'
//                     },
//                     onUploadProgress: (progressEvent) => {
//                         console.log(progressEvent.loaded / progressEvent.total);
//                         setUploadProgress(Math.round(progressEvent.loaded / progressEvent.total * 100));
//                     }
//                 },
//             )
//                 .then((res) => {
//                     console.log(res.data);
//                     setDownloadUrl(res.data);
//                     setProfileImage(null);
//                 })
//                 .catch((err) => {
//                     alert(err);
//                 })
//         }
//     }
//     return (
//         <View>
//             {
//                 downloadUrl &&
//                 <Image source={{ uri: downloadUrl }} style={{ width: 200, height: 200 }} />
//             }

//             <Text style={styles.mybtn}
//                 onPress={pickImageHandler}
//             >Select New Image</Text>

//             {
//                 profileImage && profileImage != undefined &&
//                 <Text style={styles.mybtn}

//                     onPress={uploadImageHandler}
//                 >Upload Image</Text>
//             }

//             {
//                 uploadProgress &&
//                 <Text>Upload Progress: {uploadProgress}%</Text>
//             }
//         </View>
//     )
// }

// export default PickImage

// const styles = StyleSheet.create({
//     mybtn: {
//         backgroundColor: 'red',
//         color: 'white',
//         padding: 10,
//         borderRadius: 5,
//         textAlign: 'center',
//         margin: 10,
//     }
// }
// )



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PickImage = () => {
  return (
    <View>
      <Text>PickImage</Text>
    </View>
  )
}

export default PickImage

const styles = StyleSheet.create({})
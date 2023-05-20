export const signupUser = async ({
  email,
  password,
  gender,
  sexuality,
  relationshipStatus,
  name,
  imaginaryName,
  birthdate,
  location,
  pictures,
}) => {
  try {
    // Create a new FormData object
    const formData = new FormData();

    //Loop through all the pictures provided by the user add each of them to the FormData object
    pictures.map((picture, i) =>
      formData.append("userPictures", {
        uri: picture,
        name: `photo${i}.jpg`,
        type: "image/jpeg",
      })
    );

    // create an object userData with user data that we receive as parameters of our function
    const userData = {
      email: email,
      password: password,
      gender: gender,
      sexuality: sexuality,
      relationshipStatus: relationshipStatus,
      name: name,
      imaginaryName: imaginaryName,
      birthdate: birthdate,
      location: location,
    };

    // Convert userData to a string and append it to the FormData object
    formData.append("userInfos", JSON.stringify(userData));

    // Make the fetch request with the FormData object as request body
    const response = await fetch("http://192.168.43.62:3000/users/signup", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

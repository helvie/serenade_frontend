const signupUser = async ({
  email,
  password,
  gender,
  sexuality,
  relationshipStatus,
  name,
  imaginaryName,
  birthdate,
  location,
}) => {
  try {
    // create an object userData with user data that we receive as parameters of our function
    const userInfos = {
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

    // Make the fetch request with the FormData object as request body
    const response = await fetch("http://192.168.43.62:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfos),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUserPictures = async (usertoken, arrayOfPictures) => {
  try {
    // Create a new FormData object
    const formData = new FormData();

    //Loop through all the pictures provided by the user add each of them to the FormData object
    arrayOfPictures.map((picture, i) =>
      formData.append("userPictures", {
        uri: picture,
        name: `photo${i}.jpg`,
        type: "image/jpeg",
      })
    );

    // Append user token to the FormData object
    formData.append("userToken", JSON.stringify(usertoken));

    // Make the fetch request with the FormData object as request body
    const response = await fetch(
      "http://192.168.43.62:3000/users/uploadPictures",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signupUser, updateUserPictures };

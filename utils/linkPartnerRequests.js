const url = "http://192.168.10.200:3000";

const searchUserPartner = async (partnerImaginaryName) => {
  try {
    const response = await fetch(
      `${url}/users/partner/search?partnerImaginaryName=${partnerImaginaryName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addUserPartner = async (userToken, partnerImaginaryName) => {
  try {
    const userData = {
      userToken,
      partnerImaginaryName,
    };
    const response = await fetch(`${url}/users/partner/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllUserPartners = async (userToken) => {
  try {
    const response = await fetch(`${url}/users/partners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userToken }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeUserPartner = async (userToken, partnerImaginaryName) => {
  try {
    const userData = {
      userToken,
      partnerImaginaryName,
    };
    const response = await fetch(`${url}/users/partner/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  searchUserPartner,
  addUserPartner,
  getAllUserPartners,
  removeUserPartner,
};

import axios from "axios";

export const getAPIResult = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const result = response.data;
    const data = result.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const postAPIResult = async (url: string, postData: any) => {
  try {
    const response = await axios.post(url, postData, {
      headers: {
        Authorization:
        "Bearer sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
     const result = response.data;
     console.log("The post Api Data Response ", result);
     return result;
  } catch (error) {
    return error;
  }
};



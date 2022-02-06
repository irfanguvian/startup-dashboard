class APIAdapter {
  resetDiReferenceBatch(diHash) {
    const {
      axios,
      env,
      localStorage,
      swal,
    } = diHash;
    this.axios = axios;
    this.env = env;
    this.localStorage = localStorage;
    this.swal = swal;
  }

  constructor(diHash) {
    this.resetDiReferenceBatch(diHash);
  }

  resetVarBatch() {
    this.axiosInstance = this.axios.create({});
    this.axiosInstance.defaults.baseURL = this.env.API_URL;
  }

  Authentication() {
    this.axiosInstance.interceptors.request.use(
      (request) => {
        const token = this.localStorage.getItem("token");
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          this.localStorage.removeItem("user");
          this.localStorage.removeItem("token");
        }
        return Promise.reject(error);
      },
    );
  }

  async postProduct(argHash) {
    const { body, history } = argHash;
    const keys = Object.keys(body);
    const formData = new FormData();
    console.log(keys);
    keys.forEach((key) => {
      formData.append(key, body[key]);
    });

    return this.axiosInstance.post("/v1/product", formData, {
      headers: {
        "x-api-key": "cf5afcbd-e339-449b-ab9f-3eed664633e7",
      },
    }).then(() => {
      return this.swal.fire({
        title: "Product has been created successfully!",
        icon: "success",
      })
      .then((value) => {
        return history.push("/product");
      });
    }).catch((err) => {
      return this.swal.fire({
        title: "Error!",
        text: err.response.data.message,
        icon: "error",
      });
    });
  }
}

export default APIAdapter;

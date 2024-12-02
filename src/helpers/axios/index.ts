import axios, { AxiosInstance } from "axios";
import Logger from "../../utils/logger";

class AxiosHelper {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create();
  }

  async makeRequest({ url, method, data, headers }) {
    try {
      Logger.info("[request sent by axios on: ", {
        url,
        method,
        data,
        headers,
      });
      const response = await this.axiosInstance({
        url,
        method,
        data,
        headers,
      });
      return [response.data, null];
    } catch (error) {
      Logger.error("Error in making request", error);
      return [null, error];
    }
  }
}

module.exports = new AxiosHelper();

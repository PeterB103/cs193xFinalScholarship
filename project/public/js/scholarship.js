import apiRequest from "./apirequest.js";
/* Sending requests to the backend for the information */

export default class Scholarship {
  static async createScholarship(scholarshipData) {
    await apiRequest("POST", `/scholarships`, scholarshipData);
  }

  static async getScholarship(id) {
    let scholarship = await apiRequest("GET", `/scholarships/${id}`);
    return scholarship;
  }
}

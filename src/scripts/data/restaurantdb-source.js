import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async homePost() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailPost(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.ADDREVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(review),
    });
    await window.location.reload();
    return response;
  }
}

export default RestaurantSource;

import axios from 'axios';

export default {
  data() {
    return {
      recommendations: [],
    };
  },
  methods: {
    async getRecommendations(productId) {
      try {
        const response = await axios.post('https://your-api/recommendations', { productId });
        this.recommendations = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};


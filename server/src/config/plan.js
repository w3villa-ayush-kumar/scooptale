export const PLANS = {
  free: {
    durationHours: 0,
    price: 0,
    limits: {
      saves: 30,
      reviews: 20,
    },
  },

  silver: {
    durationHours: 1,
    price: 50000,
    limits: {
      saves: 10,
      reviews: 20,
    },
  },

  gold: {
    durationHours: 6,
    price: 100000,
    limits: {
      saves: Infinity,
      reviews: Infinity,
    },
  },
};

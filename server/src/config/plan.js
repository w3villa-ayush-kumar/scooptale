export const PLANS = {
  free: {
    durationHours: 0,
    price: 0,
    limits: {
      saves: 3,
      reviews: 2,
    },
  },

  silver: {
    durationHours: 1,
    price: 50000,
    limits: {
      saves: 10,
      reviews: 6,
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

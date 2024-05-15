const initialData = {
  vestidos: [],
};

export const carsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_CARS": {
      return {
        ...state,
        vestidos: action.payload,
      };
    }

    default:
      return state;
  }
};

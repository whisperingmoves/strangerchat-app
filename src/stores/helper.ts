export const listPageReducer = (state: any, action: any) => {
  if (action.payload.length) {
    if (state.page === 1) {
      state.list = action.payload;
    } else {
      state.list = [...state.list, ...action.payload];
    }

    state.page += 1;
  } else if (state.page === 1) {
    state.list = [];
  }

  state.status = 'success';
};

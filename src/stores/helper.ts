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

export const listPageWithTotalReducer = (state: any, action: any) => {
  const {list, total} = action.payload;

  if (list.length) {
    if (state.page === 1) {
      state.list = list;
    } else {
      state.list = [...state.list, ...list];
    }

    state.page += 1;
  } else if (state.page === 1) {
    state.list = [];
  }

  state.total = total;

  state.status = 'success';
};

export default function reduce(state = {
  yelpEvents: [],
  viatorEvents: [],
}, action) {
  switch (action.type) {
    case 'FETCH_CURRENTDES_FULFILLED' : {
      return { ...state, destination: action.payload };
    }
    case 'FETCH_CURRENTHOTEL_FULFILLED' : {
      return { ...state, hotel: action.payload };
    }
    case 'FETCH_CURRENTEVENTS_FULFILLED' : {
      for (let i = 0; i < state.yelpEvents.length; i += 1) {
        if (state.yelpEvents[i].id === action.payload.id) {
          state.yelpEvents.splice(i, 1);
          return { ...state, yelpEvents: state.yelpEvents };
        }
      }
      return { ...state, yelpEvents: state.yelpEvents.concat(action.payload) };
    }
    case 'FETCH_CURRENTVIAEVENT_FULFILLED' : {
      for (let i = 0; i < state.viatorEvents.length; i += 1) {
        if (state.viatorEvents[i].title === action.payload.title) {
          state.viatorEvents.splice(i, 1);
          return { ...state, viatorEvents: state.viatorEvents };
        }
      }
      return { ...state, viatorEvents: state.viatorEvents.concat(action.payload) };
    }
    case 'RESET' : {
      return { ...state, yelpEvents: [], viatorEvents: [] };
    }
  }
  return state;
}

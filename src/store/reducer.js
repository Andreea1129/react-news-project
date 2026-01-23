// Exportam state-ul initial
export const initialState = {
    news: []
}

// Definim si exportam reducer-ul care se ocupa de updatarea state-ului in functie de actiune
export function favouritesReducer(state, action){
    switch(action.type){
        case 'ADD_TO_FAVORITES':{
            // Cautam stirea adaugata la favorite in state-ul curent
            const isInList = state.news.find((currentNews) => {
                return currentNews.id === action.payload.id
            });
            // Daca stirea e deja in state, doar o sa returnam state-ul curent
            if(isInList){
                return state;
            } else{
                // Daca nu este in state il adaugam la inceputul listei de stiri favorite
                const newState ={
                    news: [action.payload, ...state.news]
                };
                return newState;
            }
        }
        case 'REMOVE_FROM_FAVORITES':{
            // Filtram stirile din state, eliminand-o pe cea care are id-ul venit pe action.payload
            const filteredNews = state.news.filter((currentNews)=>{
                return currentNews.id !==action.payload;
            });
            const newState ={
                news: filteredNews
            };
            return newState;
        }
        default: {
            return state;
        }
    }
}
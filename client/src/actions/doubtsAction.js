export const REGISTER_DOUBT = 'REGISTER_DOUBT';
export const GET_DOUBTS = 'GET_DOUBTS';
export const SET_DOUBTS = 'SET_DOUBTS';
export const GET_SINGLE_DOUBT = 'GET_SINGLE_DOUBT';
export const registerDoubt = (doubt) => {
    return {
        type: REGISTER_DOUBT,
        payload:doubt
    }
}

export const getDoubts = () => {
    return {
        type: GET_DOUBTS
    }
}

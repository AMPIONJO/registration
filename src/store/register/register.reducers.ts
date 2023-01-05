import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { register, registrationFail, registrationSuccess } from "./register.actions";
import { RegisterState } from "./RegisterState";

const initialState: RegisterState = AppInitialState.register;

const reducer = createReducer(initialState,
    on(register, currentState => {
        return {
            ...currentState,
            error: null,
            isRegistered: false,
            isRegistering: true,
        };
    }),
    on(registrationSuccess, currentState => {
        return {
            ...currentState,
            isRegistered: true,
            isRegistering: false,
        };
    }),
    on(registrationFail, (currentState, action) =>{
        return {...currentState,
            error: action.error,
            isRegistered: false,
            isRegistering: false,
        };
    })
    )

    export function registerReducer(state: RegisterState, action){
        return reducer(state,action);
    }
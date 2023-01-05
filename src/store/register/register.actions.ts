import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/User";

export const register = createAction("[Register]");
export const registrationSuccess = createAction("[Register] success", props<{user: User}>());
export const registrationFail = createAction("[Register] fail", props<{error: any}>());
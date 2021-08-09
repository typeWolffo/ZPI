import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const loginUser = createAsyncThunk(
    'users/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost:8000/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );
            let data = await response.json();
            console.log('response', data);
            if (response.status === 200) {
                localStorage.setItem('token', data[0].Password);

                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
export const fetchUserBytoken = createAsyncThunk(
    'users/fetchUserByToken',
    async ({ Password }, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost:8000/Users',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: Password,
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            console.log('data', data, response.status);

            if (response.status === 200) {
                return { ...data };
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        password: '',
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },
    extraReducers: {

        [loginUser.fulfilled]: (state, { payload }) => {
            state.password = payload[0].Password;
            state.username = payload[0].Username;
            state.isFetching = false;
            state.isSuccess = true;
            console.log('test', payload);
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = 'Coś poszło nie tak...';
            console.log('rejected', payload);
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;

            state.password = state.password;
            state.username = state.username;
        },
        [fetchUserBytoken.rejected]: (state) => {
            console.log('fetchUserBytoken');
            state.isFetching = false;
            state.isError = true;
        },
    },
});


export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
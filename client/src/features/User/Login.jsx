import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from './UserSlice';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

const Login = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userSelector
    );
    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            history.push('/dashboard');
        }
    }, [isError, isSuccess]);

    return (
        <Fragment>
            <div className="">
                <div class="">
                    <h2 class="">
                        Sign in to your account
                    </h2>
                </div>
                <div className="">
                    <div className="">
                        <form
                            className=""
                            onSubmit={handleSubmit(onSubmit)}
                            method="POST"
                        >
                            <div>
                                <label
                                    for="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        autoComplete="username"
                                        {...register("username",{
                                            required: true
                                        })}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for="password"
                                    className=""
                                >
                                    Password
                                </label>
                                <div className="">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        {...register("password",{ required: true })}
                                        autoComplete="current-password"
                                        required
                                        className=""
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className=""
                                >
                                    {isFetching ? (
                                        <svg
                                            class=""
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                class="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                stroke-width="4"
                                            ></circle>
                                            <path
                                                class="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : null}
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
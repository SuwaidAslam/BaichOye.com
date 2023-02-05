import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';


const Login = () => {
    const responseGoogle = (response) => {
        console.log(response)
    }
    return (
        <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div className="flex flex-col items-center justify-center">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg1.svg" alt="logo" />

                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                    <p tabIndex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 text-center">Login to your account</p>
                    <p tabIndex="0" className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 text-center">Dont have account? <a href="javascript:void(0)" className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"> Sign up here</a></p>
                    <GoogleLogin
                        clientId="119339202842-bslshn2kpa0i4qgt0vpt5gaqnmbleql2.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                type="button"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google" />
                                <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy="single_host_origin"
                    />
                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400 0" />
                    </div>
                    <div>
                        <label id="email" className="text-sm font-medium leading-none text-gray-800">
                            Email
                        </label>
                        <input aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div className="mt-6  w-full">
                        <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800">
                            Password
                        </label>
                        <div className="relative flex items-center justify-center">
                            <input id="pass" type="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg" alt="viewport" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Create my account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
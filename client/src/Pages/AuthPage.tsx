import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col justify-center items-center p-4">
            <div className="mb-8 ">
                <h1 className="text-4xl font-extrabold tracking-wide">SpendaWise</h1>
                <p className="text-orange-100 mt-2">Track, analyze, and optimize your personal finances</p>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-xl max-w-sm w-full flex justify-center">
                {isSignUp ? (
                    <SignUp />
                ) : (
                    <SignIn />
                )}
            </div>

            <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-6 text-sm font-semibold text-white underline hover:text-orange-200 transition-colors"
            >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}
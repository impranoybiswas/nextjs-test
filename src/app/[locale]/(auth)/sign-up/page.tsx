"use client";

import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}

import AuthForm from '@/components/auth/AuthForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05080a] p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>
      <AuthForm mode="signup" />
    </div>
  );
}

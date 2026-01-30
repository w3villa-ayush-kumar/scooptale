const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export default function OAuthButtons() {
  return (
    <div className="space-y-3">
      <a
        href={`${BACKEND_URL}/auth/google`}
        className="flex items-center justify-center gap-3
                   w-full py-3 rounded-xl
                   bg-white text-black font-medium
                   hover:bg-gray-100 transition"
      >
        <img src="/google.svg" alt="Google" className="h-5" />
        Continue with Google
      </a>

      <a
        href={`${BACKEND_URL}/auth/facebook`}
        className="flex items-center justify-center gap-3
                   w-full py-3 rounded-xl
                   bg-[#1877F2] text-white font-medium
                   hover:bg-[#166fe5] transition"
      >
        <img src="/facebook.svg" alt="Facebook" className="h-5" />
        Continue with Facebook
      </a>
    </div>
  );
}

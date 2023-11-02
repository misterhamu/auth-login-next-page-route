import { useAuth } from "@/context/AuthContext";

type Props = {};

export default function LoginPage({}: Props) {
  const {login} = useAuth();
  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <button
          className="bg-red-400 p-3"
          onClick={()=>{login()}}
        >
          Login
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user, error, data } = await client.auth.signInWithPassword({
        email: 'jesuslobatoromero@gmail.com',
        password: "123456",
      });

      if (error) {
        console.error(error.message);
        return;
      }

       navigate(ROUTES.dashboard);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="id"
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import Message from "../components/message";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signup({ email, password, username, name }); 
      setMessage({ type: "success", text: "Usuario creado con éxito. Redirigiendo al login..." });
      navigate("/login"); 
    } catch (error) {
      setMessage({ type: "error", text: "Error al crear el usuario. Intenta nuevamente." });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Create an Account</h2>
          <p className="text-muted">Please fill out the form to register</p>
        </div>
        {message && <Message type={message.type} text={message.text} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p className="mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-primary">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

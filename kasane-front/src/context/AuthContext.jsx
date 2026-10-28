import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [tipo, setTipo] = useState(null); // "empresa" | "funcionario"
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCarregando(false);
      return;
    }
    api
      .get("/me")
      .then((res) => {
            setUsuario(res.data.usuario);
            setTipo(res.data.tipo);
        })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
      })
      .finally(() => setCarregando(false));
  }, []);

  async function login_empresa(email, senha) {
    const { data } = await api.post("/login/empresa", { email, senha });
    localStorage.setItem("token", data.token);
    setUsuario(data.empresa);
    setTipo("empresa");
  }

  async function login_funcionario(email, senha) {
    const { data } = await api.post("/login/funcionario", { email, senha });
    localStorage.setItem("token", data.token);
    setUsuario(data.funcionario);
    setTipo("funcionario");
  }

  async function logout() {
    try {
      await api.post("/logout");
    } catch (err) {
      // se o servidor não respondeu (ou o token já expirou), seguimos com o
      // logout local mesmo assim: o usuário precisa conseguir sair
    } finally {
      localStorage.removeItem("token");
      setUsuario(null);
      setTipo(null);
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, login_empresa, login_funcionario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>");
  }
  return contexto;
}
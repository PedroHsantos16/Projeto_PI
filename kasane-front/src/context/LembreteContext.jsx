import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const LembretesContext = createContext(null);

function ordenar(lista) {
  return [...lista].sort((a, b) => new Date(a.horario) - new Date(b.horario));
}

export function LembretesProvider({ children }) {
  const { usuario, tipo } = useAuth();

  const [lembretes, setLembretes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  function recarregar() {
    setCarregando(true);
    return api
      .get('/lembretes')
      .then((res) => {
        setLembretes(res.data);
        setErro(null);
      })
      .catch(() => setErro('Não foi possível carregar os lembretes.'))
      .finally(() => setCarregando(false));
  }

  // Carrega ao logar como funcionário; limpa ao sair
  useEffect(() => {
    if (usuario && tipo === 'funcionario') {
      recarregar();
    } else {
      setLembretes([]);
      setErro(null);
      setCarregando(false);
    }
  }, [usuario, tipo]);

  function adicionar(novo) {
    setLembretes((prev) => ordenar([...prev, novo]));
  }

async function concluir(id) {
  const item = lembretes.find((l) => l.lembrete_id === id);
  if (!item) return;

  // remove da tela na hora
  setLembretes((prev) => prev.filter((l) => l.lembrete_id !== id));

  try {
    await api.patch(`/lembretes/${id}`, { concluido: true });
  } catch (err) {
    console.error(err.response?.status, err.response?.data);
    // desfaz: devolve o item na posição certa
    setLembretes((prev) => ordenar([...prev, item]));
    alert('Não foi possível concluir o lembrete.');
  }
}

  return (
    <LembretesContext.Provider
      value={{ lembretes, carregando, erro, recarregar, adicionar, concluir }}
    >
      {children}
    </LembretesContext.Provider>
  );
}

export function useLembretes() {
  const contexto = useContext(LembretesContext);
  if (!contexto) {
    throw new Error('useLembretes precisa ser usado dentro de um <LembretesProvider>');
  }
  return contexto;
}
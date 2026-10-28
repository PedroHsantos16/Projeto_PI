import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import '../assets/css/auth.css';
import '../assets/css/login.css';
import api from '../api/client'
import logo from '../assets/KasaneLogo.svg';

function LoginEmpresa() {
  const navigate = useNavigate();
  const { login_empresa } = useAuth();
  const [erro, setErro] = useState(null);

  const [form, setForm] = useState({
    email: '',
    senha: '',
  });

  // Visibilidade da senha (estado de interface, fora do form)
  const [showPassword, setShowPassword] = useState(false);

  // Atualiza o campo que mudou; checkbox usa "checked" em vez de "value"
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    try
    {
      login_empresa(form.email, form.senha);
    }
    catch(err)
    {
        setErro("Credenciais inválidas");
    }
    navigate('/AdminSetor');
  }

  return (
    <main className="auth">
      {/* Selo da logo */}
      <div className="auth__logo">
        <img src={logo} alt="Kasane" />
      </div>

      <section className="auth-card">
        <div className="auth-card__back">
          <button type="button" className="link-back" onClick={() => navigate('/Home')}>
            <ArrowLeft aria-hidden="true" />
            Voltar ao início
          </button>
        </div>

        <span className="badge login__badge">Área administrativa</span>

        <p className="eyebrow">Acesso da empresa</p>
        <h1 className="auth-card__title">Sua equipe começa por aqui.</h1>
        <p className="auth-card__subtitle">
          Entre com a conta do responsável para administrar sua organização.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* E-mail */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="email">E-mail do administrador</label>
            <div className="input-wrapper">
              <input
                className="input input--icon"
                id="email"
                name="email"
                type="email"
                placeholder="renata.costa@auroratec.com.br"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <span className="input-wrapper__icon">
                <Mail strokeWidth={1.5} aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* Senha */}
          <div className="form-field">
            <label className="form-field__label" htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <input
                className="input input--icon"
                id="senha"
                name="senha"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.senha}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="input-wrapper__action"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--block login__submit" onClick={() => navigate('/AdminSetor')}>
            <ArrowRight size={16} aria-hidden="true" />
            Entrar como administrador
          </button>
        </form>

        <p className="auth-card__footer">
          Sua empresa ainda não está aqui?{' '}
          <button type="button" className="link-inline" onClick={() => navigate('/CadastroEmpresa')}>
            Cadastrar empresa
          </button>
        </p>

        <button type="button" className="auth-card__alt" onClick={() => navigate('/LoginFuncionario')}>
          Faz parte da equipe? Acesse como funcionário
          <ArrowRight aria-hidden="true" />
        </button>
      </section>
    </main>
  );
}

export default LoginEmpresa;
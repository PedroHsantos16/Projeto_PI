import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/HomeAntigo.css'
import KasaneLogo from '../assets/TetoLogo.svg'
import KasaneTexto from '../assets/KasaneTexto.svg'
import users from '../assets/users.svg'
import BuildingComplex from '../assets/building-complex.svg'
import arrow from '../assets/arrow-right.svg'

export default function HomeAntigo() {
  
  return (
    <>
      <div className="HomeGrid">
            <div className="gridLogo">
                <img src={KasaneLogo} alt="Logo" className="LogoImg"/>
                <img src={KasaneTexto} alt="Logo" className="LogoText"/>
                <h1>Boas conversas.</h1> 
                <h1>Grandes conexões.</h1>
                <p>Um lugar para organizar pessoas, compartilhar avisos e fazer o trabalho acontecer. Juntos.</p>
                <hr />
                <small>Sua empresa, mais conectada.</small>
            </div>

            <div className="gridPanel">
               <div className="panel-inner">
                    <div className="cards">
                        <div className="card">
                            <img src={users} alt="Logo" className="icon"/>
                            <p>Entre na sua comunidade e acompanhe o que acontece na empresa.</p>
                            <h3>Sou Funcionário</h3>
                            <button className="btn btn-primary">Entrar</button>
                        </div>
                        <div className="card">
                            <svg src={BuildingComplex} alt="Logo" className="icon"/>
                            <p>Conecte sua equipe e organize a comunicação da sua empresa.</p>
                            <h3>Sou Empresa</h3>
                            <button className="btn btn-primary"><img src={arrow}/>Entrar</button>
                            <button className="btn btn-outline">Cadastrar</button>
                        </div>
                    </div>
               </div>
            </div>
      </div>
    </>
  )
}


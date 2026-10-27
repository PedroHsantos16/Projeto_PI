import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/Publicacoes.css'
import KasaneLogo from '../assets/TetoLogo.svg'
import KasaneTexto from '../assets/KasaneTexto.svg'
import users from '../assets/users.svg'
import BuildingComplex from '../assets/building-complex.svg'
import arrow from '../assets/arrow-right.svg'

export default function Publicacoes() {
  
  return (
    <>
      <div class="grid-container">
        <div class="header">
          <h2>Header</h2>
        </div>
        
        <div class="left" style="background-color:#aaa;">Column</div>
        <div class="middle" style="background-color:#bbb;">Column</div>  
        <div class="right" style="background-color:#ccc;">Column</div>
        
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    </>
  )
}


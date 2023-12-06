import { Headerusuario } from '../componentes/Header'
import { Footer_interno } from '../componentes/Footer'
import { Botao_cadastrar_jogo } from '../componentes/Botao'
import './stilos/Paginabiblioteca.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LocalServerUrl } from '../configuracao/LocalServer';
import { Link } from 'react-router-dom';
const usuarioLogado = localStorage.getItem('usuarioLogado')

const Paginabiblioteca = () => {
    const [jogos, setJogos] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); 


    useEffect(() => {
        axios.get(`http://${LocalServerUrl}/jogos`)
            .then(response => {
                setJogos(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar Jogos:', error);
            });
    }, []);

    // Função para filtrar os jogos por categoria
    const handleCategoriaChange = (categoria) => {
        setCategoriaSelecionada(categoria);
    };
    return (
        <>
            <div id='bodybiblioteca'>
                <div>
                    <Headerusuario />
                </div>

                <div id='mainbiblioteca'>
                    <section id="biblioteca">
                        <div className="divisaobiblioteca">
                            <div className="linhabiblioteca"></div>
                            <p>Minha Biblioteca</p>
                            <div className="linhabiblioteca"></div>
                        </div>
                        {/* <div class="Jogos" id="games"></div> */}
                    </section>

                    {/* Dropdown para selecionar a categoria */}
                    <div>
                        <select id="categoria" onChange={(e) => handleCategoriaChange(e.target.value)}>
                        <option value="">Todas as Categorias</option>
                        <option value="rpg">RPG</option>
                        <option value="acao">Ação</option>
                        <option value="simulador">Simulador</option>
                        <option value="fps">FPS</option>
                        <option value="terror">Terror</option>
                        <option value="estratégia">Estratégia</option>
                        <option value="cooperativo">Cooperativo</option>
                        <option value="casual">Casual</option>
                        <option value="mundo aberto">Mundo Aberto</option>
                        <option value="esportes">Esportes</option>
                        <option value="aventura">Aventura</option>
                        <option value="quebra-cabeca">Quebra-Cabeça</option>
                        <option value="corrida">Corrida</option>
                        <option value="luta">Luta</option>
                        <option value="educativo">Educativo</option>
                        <option value="musical">Musical</option>
                        <option value="estrategia_em_tempo_real">Estratégia em Tempo Real</option>
                        <option value="construcao">Construção</option>
                        <option value="construcao">Outros</option>
                            {/* Adicione mais opções de categoria conforme necessário */}
                        </select>
                    </div>

                    <ul className='box_imagem_jogos_biblioteca'>
                    {
                            jogos
                                .filter((jogo) => jogo.usuario === usuarioLogado && (categoriaSelecionada === '' || jogo.categoria === categoriaSelecionada))
                                .map(jogo => (
                                    (
                                        <li className='imagem_jogos_biblioteca' key={jogo.id}>
                                            <Link to={`/game/${jogo.nomeJogo}`}>
                                                <img className='img_jogo_biblioteca' src={jogo.urlCapaJogo} alt={jogo.nomeJogo}></img>
                                            </Link>
                                            <p>{jogo.nomeJogo}</p>
                                        </li>
                                    )
                                ))
                        }
                        {
                            jogos
                                .filter((jogo) => jogo.usuario === usuarioLogado).length === 0
                                ? <p className='retorno0'>Nenhum jogo encontrado.</p>
                                : null
                        }
                    </ul>
                    <div id='botao_cadastrar_jogo'>
                        <Botao_cadastrar_jogo />
                    </div>
                </div>
                <div id='footer01biblioteca'>
                    <Footer_interno />
                </div>
            </div>
        </>

    )
}

export default Paginabiblioteca
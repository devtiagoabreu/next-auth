import Head from 'next/head';
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton';
import type { NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";
import { useState, FormEvent } from 'react';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import Link from 'next/link';
//import firebase from 'firebase/compat/app';

interface BoardProps {
    query: string;
}


type Conferencias = {
    created: string | Date;
    createdFormated?: string;
    id: string;
    nfe: string;
    cliente: string; 
    lote: string; 
    produtoFornecedor: string; 
    produto: string; 
    qtde: string; 
    pesoLiquido: string; 
    pesoBruto: string;
    dataEmissaoNFe: string;
    userId: string;
    userName: string;
    userEmail: string;
    status: string | number; 
}



export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }

   const conferencias = await firebase.firestore().collection('conferencias').orderBy('created', 'asc').get()

   const query = JSON.stringify(conferencias.docs.map( conf => {
        return {
            id: conf.id,
            createdFormated: format(conf.query().created.toDate(), 'dd MMMM yyyy'),
            ...conf.query(),
        }  
    }))

    console.log(query);

    return {
      props: {
        session,
        query
      }
    };
} 

const Board: NextPage = ({ query }: BoardProps) => {

    console.log(query);

    const { data: session } = useSession('');

    const [nfe, setNfe] = useState(); 
    const [cliente, setCliente] = useState(); 
    const [lote, setLote] = useState(); 
    const [produtoFornecedor, setProdutoFornecedor] = useState(); 
    const [produto, setProduto] = useState(); 
    const [qtde, setQtde] = useState(); 
    const [pesoLiquido, setPesoLiquido] = useState(); 
    const [pesoBruto, setPesoBruto] = useState(); 
    const [dataEmissaoNFe, setDataEmissaoNFe] = useState(); 
    const userId  = JSON.stringify(session.user.id);
    const userName  = JSON.stringify(session.user.name);
    const userEmail  = JSON.stringify(session.user.email);
    const status = 0;

    const [conferencias, setConferencias] = useState<Conferencias[]>(JSON.parse(query));

    async function handleAddConferencia(e: FormEvent) {
        e.preventDefault();

        if (nfe === '') {
            alert('Preencha a NFe')
            return;
        }
        
        if (cliente === '') {
            alert('Preencha o CNPJ do Cliente')
            return;
        }
        
        if (lote === '') {
            alert('Preencha o Lote do produto')
            return;
        }
        
        if (produtoFornecedor === '') {
            alert('Preencha o código do produto do fornecedor')
            return;
        }
        
        if (produto === '') {
            alert('Preencha o código do produto systêxtil')
            return;
        }
        
        if (qtde === '') {
            alert('Preencha a quantidade de volumes (caixas)')
            return;
        }
        
        if (pesoLiquido === '') {
            alert('Preencha o valor de peso líquido presente na NFe')
            return;
        }
        
        if (pesoBruto === '') {
            alert('Preencha o valor de peso bruto presente na NFe')
            return;
        }
        
        if (dataEmissaoNFe === '') {
            alert('Preencha a data de emissão da NFe')
            return;
        }
          
        await firebase.firestore().collection('conferencias')
        .add({
            conferenciaCreated: new Date(),
            conferenciaUserId: userId,
            conferenciaUserName: userName,
            conferenciaUserEmail: userEmail,
            conferenciaNfe: nfe,
            conferenciaCliente: cliente,
            conferenciaLote: lote,
            conferenciaProdutoFornecedor: produtoFornecedor,
            conferenciaProduto: produto,
            conferenciaQtde: qtde,
            conferenciaPesoLiquido: pesoLiquido,
            conferenciaPesoBruto: pesoBruto,
            conferenciaDataEmissaoNFe: dataEmissaoNFe,
            conferenciaStatus: status
        })
        .then((doc) => {
            alert('Conferência cadastrada com sucesso!');
            let data = {
                id: doc.id,
                created: new Date(),
                createdFormated: format(new Date(), 'dd MMMM yyyy'),
                userId: userId,
                userName: userName,
                userEmail: userEmail,
                nfe: nfe,
                cliente: cliente,
                lote: lote,
                produtoFornecedor: produtoFornecedor,
                produto: produto,
                qtde: qtde,
                pesoLiquido: pesoLiquido,
                pesoBruto: pesoBruto,
                dataEmissaoNFe: dataEmissaoNFe,
                status: status
            };

            setConferencias([...conferencias, data]);
            setNfe('');
            setCliente('');
            setLote('');
            setProdutoFornecedor('');
            setProduto('');
            setQtde('');
            setPesoLiquido('');
            setPesoBruto('');
            setDataEmissaoNFe('');
        })
    }
    
    return (
        <>
            <Head>
                <title>Minhas Conferências</title>
            </Head>
            <main className={styles.container}>
                <form onSubmit={handleAddConferencia}>
                    <input
                        className={styles.inputNfe}
                        type="text" 
                        placeholder='NF-e'
                        value={nfe}
                        onChange={ (e) => setNfe(e.target.value) }
                    />
                    <input
                        className={styles.inputCliente}
                        type="text" 
                        placeholder='CNPJ'
                        value={cliente}
                        onChange={ (e) => setCliente(e.target.value) }
                    />
                    <input
                        className={styles.inputLote}
                        type="text" 
                        placeholder='Lote'
                        value={lote}
                        onChange={ (e) => setLote(e.target.value) }
                    />
                    <input
                        className={styles.inputProdutoFornecedor}
                        type="text" 
                        placeholder='Cod.Prod.F'
                        value={produtoFornecedor}
                        onChange={ (e) => setProdutoFornecedor(e.target.value) }
                    />
                    <input
                        className={styles.inputProduto}
                        type="text" 
                        placeholder='Cod.Produto'
                        value={produto}
                        onChange={ (e) => setProduto(e.target.value) }
                    />
                    <input
                        className={styles.inputQtde}
                        type="text" 
                        placeholder='Qtde'
                        value={qtde}
                        onChange={ (e) => setQtde(e.target.value) }
                    />
                     <input
                        className={styles.inputPesoLiquido}
                        type="text" 
                        placeholder='P.Liquido'
                        value={pesoLiquido}
                        onChange={ (e) => setPesoLiquido(e.target.value) }
                    />
                     <input
                        className={styles.inputPesoBruto}
                        type="text" 
                        placeholder='P.Bruto'
                        value={pesoBruto}
                        onChange={ (e) => setPesoBruto(e.target.value) }
                    />
                    <input
                        className={styles.inputDataEmissao}
                        type="date" 
                        placeholder='D.Emissao NFe'
                        value={dataEmissaoNFe}
                        onChange={ (e) => setDataEmissaoNFe(e.target.value) }
                    />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />
                    </button>
                </form>

            <h1>01 conferência(s) em aberto!</h1>

            <section>
                {conferencias.map( conferencia =>(
                    <article className={styles.taskList}>
                        <Link href={`/board/${conferencia.id}`}>
                            <p>NFe: {conferencia.nfe} | Cliente: {conferencia.cliente} | Lote: {conferencia.lote} | Prod.Fornecedor: {conferencia.produtoFornecedor} | Produto: {conferencia.produto} | Qtde: {conferencia.qtde} | P.Liq: {conferencia.pesoLiquido} | P.Br: {conferencia.pesoBruto} | Emissão NFe: {conferencia.dataEmissaoNFe}</p>
                        </Link>
                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#FFB800" />
                                    <time>{conferencia.createdFormated}</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color="#FFF" />
                                    <span>Editar</span>
                                </button>
                            </div>
                            <button>
                                <FiTrash size={20} color="#FF3636" />
                                <span>Excluir</span>
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            </main>

            <div className={styles.vipContainer}>
                <h3>Respire fundo e fique atento às surpresas que a vida preparou para você!</h3>
                <div>
                    <FiClock size={28} color="#FFF"/>
                    <time>
                        Última conferências a 2 dias.
                    </time>

                </div>
            </div>

            <SupportButton/>

        </>
    );
};

export default Board;

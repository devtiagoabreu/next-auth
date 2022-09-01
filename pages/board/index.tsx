import Head from 'next/head';
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton';
import type { NextPage } from "next";
import { useSession, signOut, getSession } from "next-auth/react";


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
    return {
      props: {
        session,
      },
    };
} 

const Board: NextPage = () => {
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Minhas Conferências</title>
            </Head>
            <main className={styles.container}>
                <form>
                    <input
                        className={styles.inputNfe}
                        type="text" 
                        placeholder='NF-e'
                    />
                    <input
                        className={styles.inputCliente}
                        type="text" 
                        placeholder='CNPJ'
                    />
                    <input
                        className={styles.inputLote}
                        type="text" 
                        placeholder='Lote'
                    />
                    <input
                        className={styles.inputProdutoFornecedor}
                        type="text" 
                        placeholder='Cod.Prod.F'
                    />
                    <input
                        className={styles.inputProduto}
                        type="text" 
                        placeholder='Cod.Produto'
                    />
                    <input
                        className={styles.inputQtde}
                        type="text" 
                        placeholder='Qtde'
                    />
                     <input
                        className={styles.inputPesoLiquido}
                        type="text" 
                        placeholder='P.Liquido'
                    />
                     <input
                        className={styles.inputPesoBruto}
                        type="text" 
                        placeholder='P.Bruto'
                    />
                    <button type="submit">
                        <FiPlus size={25} color="#17181f" />
                    </button>
                </form>

            <h1>01 conferência(s) em aberto!</h1>

            <section>
                <article className={styles.taskList}>
                    <p>ID: 000001 | NFe: 00002365 | Cliente: Itabaiana | Lote: 00005689 | QTDE: 800 caixas | Produto: F20/1</p>
                    <div className={styles.actions}>
                        <div>
                            <div>
                                <FiCalendar size={20} color="#FFB800" />
                                <time>22 Agosto 2022</time>
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

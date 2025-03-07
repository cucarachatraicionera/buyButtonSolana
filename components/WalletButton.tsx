"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { sendSol, getBalance } from "../utils/solanaUtils";
import { useEffect, useState } from "react";

const RECEIVER_WALLET = "3tgQAhNjKoDMJGJc6gnA3dRkwnngxSgoHttonYJTGChL"; // Billetera donde se recibe SOL

const WalletButton = () => {
    const wallet = useWallet();
    const [amount, setAmount] = useState(0.01); // Valor predeterminado: 0.01 SOL
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
            const fetchBalance = async () => {
                if (wallet.publicKey) {
                    const solBalance = await getBalance(wallet.publicKey.toBase58());
                    setBalance(solBalance);
                }
            };
            fetchBalance();
        }
    }, [wallet.connected, wallet.publicKey]);

    const handleTransaction = async () => {
        if (!wallet || !wallet.publicKey) {
            alert("Conecta tu billetera primero");
            return;
        }

        if (amount <= 0 || amount > balance) {
            alert("Monto inválido");
            return;
        }

        try {
            await sendSol(wallet, RECEIVER_WALLET);
            console.log("SOL enviado correctamente a", RECEIVER_WALLET);
            alert("Compra realizada con éxito");
        } catch (error) {
            console.error("Error en la transacción:", error);
            alert("Error al procesar la transacción");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <WalletMultiButton />
            {wallet.connected && wallet.publicKey && (
                <div>
                    <p>Saldo disponible: {balance.toFixed(2)} SOL</p>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        min="0.001"
                        step="0.001"
                        style={{ padding: "5px", margin: "10px", textAlign: "center" }}
                    />
                    <button
                        onClick={handleTransaction}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Comprar Pinky Promise
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletButton;

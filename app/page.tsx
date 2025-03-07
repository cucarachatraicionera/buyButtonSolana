import WalletButton from "@/components/WalletButton";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
    return (
        <main style={{ textAlign: "center", padding: "50px" }}>
            <h1>🎉 Compra de Pinky Promise 🎉</h1>
            <p>Conéctate con tu billetera Phantom y dcompra 1 PNKP.</p>
            <WalletButton />
            <ProgressBar />
        </main>
    );
}

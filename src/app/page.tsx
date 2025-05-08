'use client';

import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import dynamic from "next/dynamic";
import '../../styles/custom.css';

// Menambahkan tipe eksplisit pada komponen Staking dan memastikan dynamic import dengan benar
const Staking = dynamic(() =>
  import("../../components/Staking").then((mod) => mod.Staking), 
  { ssr: false } // Menonaktifkan SSR agar komponen hanya dirender di client
);

export default function Home() {
  return (
    <div style={{
      backgroundImage: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      padding: "16px",
      borderRadius: "8px",
      color: "#ffffff",
      alignItems: "center",
      justifyContent: "space-around"
  
    }}>
<h1 className="staking-header">
  ZERO NFT STAKE
</h1>

<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulseGlow {
    0% {
      text-shadow: 0 0 10px rgba(0, 242, 254, 0.4), 0 0 20px rgba(79, 172, 254, 0.2);
    }
    50% {
      text-shadow: 0 0 20px rgba(0, 242, 254, 0.8), 0 0 30px rgba(79, 172, 254, 0.5);
    }
    100% {
      text-shadow: 0 0 10px rgba(0, 242, 254, 0.4), 0 0 20px rgba(79, 172, 254, 0.2);
    }
  }
`}</style>

      <ConnectEmbed
        client={client}
        chain={chain}
      />
      <Staking /> {/* Komponen Staking di-load dinamis */}
    </div>
  );
}

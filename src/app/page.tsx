import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import dynamic from "next/dynamic";

// Menambahkan tipe eksplisit pada komponen Staking
const Staking = dynamic(() => import("../../components/Staking") as any, { ssr: false });


export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      width: "500px",
    }}>
      <h1>ERC-721 Staking App</h1>
      <ConnectEmbed
        client={client}
        chain={chain}
      />
      <Staking />
    </div>
  );
}

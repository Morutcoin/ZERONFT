import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { prepareContractCall, toEther } from "thirdweb";
import { useEffect } from "react";
import { balanceOf } from "thirdweb/extensions/erc721";

export const StakeRewards = () => {
    const account = useActiveAccount();

    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
        refetch: refetchTokenBalance,
    } = useReadContract(
        balanceOf,
        {
            contract: REWARD_TOKEN_CONTRACT,
            owner: account?.address || "",
        }
    )
    
    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
    });

    useEffect(() => {
        refetchStakedInfo();
        const interval = setInterval(() => {
            refetchStakedInfo();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: "100%", margin: "100px 0", display: "flex", flexDirection: "column", alignItems:"center", }}>
            <div style={{ display:"flex", justifyContent:"center", alignItems: "center", width:"50%"}}>
                <img style={{ width:"100%"}} src="/idrx.png" alt="" />
            </div>
            {/* <div style={{ display: "flex",
                justifyContent: "center", // horizontal center
                alignItems: "center" }}>
            {!isTokenBalanceLoading && (
               <h5>
               Wallet Balance: {tokenBalance && new Intl.NumberFormat("id-ID", {
                 minimumFractionDigits: 2,
                 maximumFractionDigits: 2
               }).format(parseFloat(toEther(BigInt(tokenBalance.toString()))))}
             </h5>
            )}
            </div> */}
          
          <h2 style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  padding: "20px",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "transparent",
  backgroundImage: "linear-gradient(to right, #00f260, #0575e6)", // green to blue
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  boxShadow: "0 4px 20px rgba(0, 242, 96, 0.2)",
  borderRadius: "12px",
  transition: "transform 0.3s ease",
  cursor: "default"
}}
onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
>
  IDRX Rewards: {stakedInfo && new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(toEther(BigInt(stakedInfo[1].toString()))))}
</h2>

            <TransactionButton
                transaction={() => (
                    prepareContractCall({
                        contract:STAKING_CONTRACT,
                        method: "claimRewards",
                    })
                )}
                onTransactionConfirmed={() => {
                    alert("Rewards claimed!")
                    refetchStakedInfo();
                    refetchTokenBalance();
                }}
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "12px"
                }}
            >Claim Rewards</TransactionButton>
        </div>
    )
};
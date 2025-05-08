import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0xa519F95A269825D49Dc7eb9e5297C88c4b6B85b0";
const rewardTokenContractAddress = "0x504D546E7637d33D9508b5bd147aDB5F05c3E3Ba";
const stakingContractAddress = "0xD9eb5d0FD5cD3e656949D5140B48cB1BE96686dA";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingABI
});
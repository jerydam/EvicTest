import { ethers } from "hardhat";

async function main() {
    const EvicContract = await ethers.getContractFactory("EvicTest");

    const [owner, addr1, addr2] = await ethers.getSigners();
    
    const deployedNFTContract = await EvicContract.deploy();
        
    await deployedNFTContract.deployed();
  
    console.log("NFT Contract Address:", deployedNFTContract.address);

    const IPFSfile = "QmayrQSSSErKKHSBe1pxWew4dsqWbeK2Qu3mxpFgNv5aF9";

    const MyEvic= await deployedNFTContract.MintNft(owner.address,IPFSfile);
    console.log(MyEvic)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { providers } from "ethers";

async function main() {
  //TokenBswap router address
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  //TokenA token address
  const TokenA = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //TokenB token address
  const TokenB = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  //TokenA holder
  const TokenAHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

  const paths = [TokenA, "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", TokenB];
  const path2 = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", TokenA];

  const path3 = ["0x748dE14197922c4Ae258c7939C7739f3ff1db573", TokenA];
  let time = 1976588399;

  const amountToSwap = await ethers.utils.parseEther("100");
  console.log(amountToSwap);

  const amountToReceive = await ethers.utils.parseEther("100");
  console.log(amountToSwap);

  const TokenBswap = await ethers.getContractAt("ITokenBswap", ROUTER);

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(TokenAHolder);
  const impersonatedSigner = await ethers.getSigner(TokenAHolder);

  const TokenAContract = await ethers.getContractAt("IToken", TokenA);

  const TokenBContract = await ethers.getContractAt("IToken", TokenB);

  const holderBalance = await TokenAContract.balanceOf(TokenAHolder);
  console.log(`TokenA balance before ${holderBalance}`);

  await TokenAContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);
  await TokenBContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);

  const TokenBBalance = await TokenBContract.balanceOf(TokenAHolder);
  console.log(`TokenBBalance ${TokenBBalance}`);

  const amountAdesired = await ethers.utils.parseEther("0.1");
  console.log(amountAdesired);

  const amountAMin = await ethers.utils.parseEther("0.01");
  console.log(amountAMin);


  const amountBdesired = await ethers.utils.parseEther("0.1");
  console.log(amountBdesired);

  const amountBMin = await ethers.utils.parseEther("0.01");
  console.log(amountBMin);

  await TokenAContract.connect(impersonatedSigner).approve(ROUTER, amountAdesired);
  await TokenBContract.connect(impersonatedSigner).approve(ROUTER, amountBdesired);
 const addLiquidity = await TokenBswap.connect(impersonatedSigner).addLiquidity(
    TokenA,
    TokenB,
    amountAdesired,
    amountBdesired,
    amountAMin,
    amountBMin,
    TokenAHolder,
    time
  );
  console.log(addLiquidity);


  const amounttokendesired = await ethers.utils.parseEther("0.001");
  console.log(amounttokendesired)
  const amounttokenmin = await ethers.utils.parseEther("0.000001");
  console.log(amounttokendesired)
  const amountethmin = await ethers.utils.parseEther("100");
  console.log(amountethmin)

  const addLiquidityETH = await TokenBswap.connect(impersonatedSigner).addLiquidityETH(
    TokenA,
    amounttokendesired,
    amounttokenmin,
    amountethmin,
    TokenAHolder,
    time
  );
  console.log(addLiquidityETH);
  const liqamountAMin = await ethers.utils.parseEther("0.1");
  console.log(liqamountAMin);
  const liqamountBMin = await ethers.utils.parseEther("0.1");
  console.log(liqamountBMin);

  const liquidity = await ethers.utils.parseEther("0.001");
  await TokenBContract.connect(impersonatedSigner).approve(ROUTER, liquidity);
  

  const removeLiquidity = await TokenBswap.connect(impersonatedSigner).removeLiquidity(
    TokenA,
    TokenB,
    liquidity,
    liqamountAMin,
    liqamountBMin,
    TokenA,
    time
  );
  console.log(removeLiquidity);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
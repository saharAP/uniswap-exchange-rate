import React, { useState } from "react";
import "./App.css";
import UniswapV2FactoryABI  from "./abi/UniswapV2FactoryABI.json";
import UniswapV2PairABI     from "./abi/UniswapV2PairABI.json";

import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);


 // mainnet uniswap factory v2 address
 const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

 // factory contract
 const factoryContract = new web3.eth.Contract(UniswapV2FactoryABI.abi, factoryAddress);
 
 // ERC20 token addresses on mainnet
 const YFIAddress="0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e";
 const CRVAddress="0xD533a949740bb3306d119CC777fa900bA034cd52";
 const DAIAddress="0x6b175474e89094c44da98b954eedeac495271d0f";
 const ETHAddress="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
 
 //pair addresses uniswap v2
 const ETH_DAI="0xa478c2975ab1ea89e8196811f51a7b7ade33eb11";
 const YFI_ETH="0x2fdbadf3c4d5a8666bc06645b8358ab803996e28";
 const CRV_ETH="0x3dA1313aE46132A397D90d95B1424A9A7e3e0fCE";
 
 // pair contracts
 const CRVETHContract = new web3.eth.Contract(UniswapV2PairABI.abi, CRV_ETH);
 const YFIETHContract = new web3.eth.Contract(UniswapV2PairABI.abi, YFI_ETH);
 const ETHDAIContract = new web3.eth.Contract(UniswapV2PairABI.abi, ETH_DAI);
 
 
 
 
function App() {
	
 const [number, setUint] = useState(0);
 const [getNumber, setGet] = useState("your uint is...");
 
 const [ethToDai, getethToDai] = useState(0.0);
 const [yfiToEth, getyfiToEth] = useState(0.0);
 const [crvToEth, getcrvToEth] = useState(0.0);
  
/*const DAIETHUniswapContract = new web3.eth.Contract(UniswapV2PairABI, USDC_ETH);
console.log(DAIETHUniswapContract);
const result= DAIETHUniswapContract.methods.getReserves().call();
console.log("result:");
console.log(result);*/

/*const getDaiToEthExchangeRate=async(t)=>{
	   t.preventDefault();
	   
	  
		console.log(ETHDAIContract);
		const reserves = await ETHDAIContract.methods.getReserves().call();
		const token0 = await ETHDAIContract.methods.token0().call();
		const token1 = await ETHDAIContract.methods.token1().call();
		console.log("token0 "+token0+" token1 "+token1);
		console.log('pair reserves, first ' + reserves[0] + " second " + reserves[1]," blocktomestamp "+reserves[2]);
   };*/
   
	
	
const computeExchangeRate=async(t)=>{
	   t.preventDefault();
	   
	   //compute ETH/DAI exchange rate 
		 const getEthUsdPrice = async () => await ETHDAIContract.methods.getReserves().call()
		.then(reserves => getethToDai(Number(reserves._reserve0) / Number(reserves._reserve1)) ); // times 10^12 because usdc only has 6 decimals
	   // const exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress);
		//const post = await exchangeContract.methods.get().call(); 
	    //getyfiToEth(post);
   };

computeExchangeRate();
  /* const numberSet=async (t)=>{
	   t.preventDefault();
	   const accounts=await window.ethereum.enable();
	   const account =accounts[0];
	    const gas = await storageContract.methods.set(number).estimateGas();
		const post = await storageContract.methods.set(number).send({
				from: account,
				gas,
		});
   };
   
   const numberGet=async(t)=>{
	   t.preventDefault();
	   const post = await storageContract.methods.get().call(); 
	   setGet(post);
   };*/
return (
 
 <div className="cargo">
     <div className="header"><h2>Uniswap Exchange Rates</h2></div> 
     <div className="pair"><h3>ETH/DAI</h3></div>  
     <div className="exchangerate"><h4>{ethToDai}</h4></div>	
	 <div className="pair"><h3>YFI/ETH</h3></div>  
	 <div className="exchangerate"><h4>{yfiToEth}</h4></div>
     <div className="pair"><h3>CRV/ETH</h3></div>  
	 <div className="exchangerate"><h4>{crvToEth}</h4></div>	 
   </div>
 );
}



export default App;

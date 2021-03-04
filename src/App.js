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
 
 
 //pair addresses uniswap v2
 const ETH_DAI="0xa478c2975ab1ea89e8196811f51a7b7ade33eb11";
 const YFI_ETH="0x2fdbadf3c4d5a8666bc06645b8358ab803996e28";
 const CRV_ETH="0x3dA1313aE46132A397D90d95B1424A9A7e3e0fCE";
 
 // pair contracts
 const CRVETHContract = new web3.eth.Contract(UniswapV2PairABI.abi, CRV_ETH);
 const YFIETHContract = new web3.eth.Contract(UniswapV2PairABI.abi, YFI_ETH);
 const ETHDAIContract = new web3.eth.Contract(UniswapV2PairABI.abi, ETH_DAI);
 
 
 
 
function App() {
	
 // storing exchange rates
 
 const [ethToDai, setEthToDai] = useState(0.0);
 const [yfiToEth, setYfiToEth] = useState(0.0);
 const [crvToEth, setCrvToEth] = useState(0.0);
 
 const [blockNumber, setBlockNumber] = useState('#');
  
	
const computeExchangeRate=async(t)=>{
	  // t.preventDefault();
	   var reserves;
	   //ETH/DAI exchange rate 
		reserves=await ETHDAIContract.methods.getReserves().call();
		setEthToDai(Number(reserves[0]) / Number(reserves[1]));
		
		//YFI/ETH exchange rate 
		reserves=await YFIETHContract.methods.getReserves().call();
		setYfiToEth(Number(reserves[1]) / Number(reserves[0]));
		
		//YFI/ETH exchange rate 
		reserves=await CRVETHContract.methods.getReserves().call();
		setCrvToEth(Number(reserves[1]) / Number(reserves[0]));
		
   };

computeExchangeRate();

// subscribe and event for new blocks
var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
       // console.log(result);

        return;
    }

    console.error(error);
})
.on("connected", function(subscriptionId){
    //console.log(subscriptionId);
})
.on("data", function(blockHeader){
  //  console.log(blockHeader);
    computeExchangeRate();
	setBlockNumber(blockHeader.number);
	//computeExchangeRate();
})
.on("error", console.error);

// unsubscribes the subscription
/*subscription.unsubscribe(function(error, success){
    if (success) {
        console.log('Successfully unsubscribed!');
    }
});*/

return (
 
 <div className="cargo">
     <div className="header"><h2>Uniswap Exchange Rates</h2></div> 
	 <div className="title"><h4>Block number</h4></div> 
	 <div className="blockNumber"><h4>{blockNumber}</h4></div> 
	 
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

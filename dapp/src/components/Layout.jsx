import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import MintNFT from "../lib/MintNFT.json";

function Layout() {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    if (!signer) return;

    setContract(
      new Contract(
        "0xb4E7e1ACDaB54734D129fB12d7b7b653Ac332843",
        MintNFT,
        signer
      )
    );
  }, [signer]);

  useEffect(() => console.log(contract), [contract]);

  return (
    <div className="bg-red-100 min-h-screen">
      <Header signer={signer} setSigner={setSigner} />
      <Outlet context={{ signer, contract }} />
    </div>
  );
}

export default Layout;

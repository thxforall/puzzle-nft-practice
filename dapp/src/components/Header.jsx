import { ethers } from "ethers";
import { useState } from "react";

function Header() {
  const [signer, setSigner] = useState();

  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setSigner(null);
  };

  return (
    <header className="bg-green-100 flex justify-between items-center px-8 h-20">
      <div className="text-2xl font-semibold">🌏 Earth & Run 🏃‍♀️</div>
      <div>
        {signer ? (
          <button
            className="text-xl font-semibold hover:text-gray-600 hover:underline"
            onClick={onClickLogOut}
          >
            {signer.address.substring(0, 7)}...
            {signer.address.substring(signer.address.length - 5)}
          </button>
        ) : (
          <button
            className="bg-blue-300 border-2 border-blue-500 px-4 py-2 text-xl font-semibold rounded-full hover:bg-blue-500"
            onClick={onClickMetamask}
          >
            🦊 Log In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;

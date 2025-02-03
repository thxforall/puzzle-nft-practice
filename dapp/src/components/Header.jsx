import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ signer, setSigner }) {
  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      // 활성 계정을 요청합니다.
      await window.ethereum.request({ method: 'eth_requestAccounts' });
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
    <header className="bg-gradient-to-r from-[#f5efe6] to-[#d7c4ad] shadow-md flex justify-between items-center px-8 h-20">
      <nav className="flex space-x-6" aria-label="Main Navigation">
        <Link 
          className="text-lg text-[#666666] hover:text-[#8b7355] transition-colors duration-300" 
          to="/"
        >
          Home
        </Link>
        <Link 
          className="text-lg text-[#666666] hover:text-[#8b7355] transition-colors duration-300" 
          to="/mint"
        >
          Mint
        </Link>
      </nav>
      <div>
        {signer ? (
          <button
            className="text-lg font-medium text-[#4a4a4a] hover:text-[#8b7355] transition-colors duration-300"
            onClick={onClickLogOut}
          >
            {signer.address.substring(0, 7)}...
            {signer.address.substring(signer.address.length - 5)}
          </button>
        ) : (
          <button 
            className="bg-[#8b7355] hover:bg-[#6d5a43] text-white px-6 py-2 rounded-full transition-colors duration-300 font-medium"
            onClick={onClickMetamask}
          >
            🦊 Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  signer: PropTypes.object,
  setSigner: PropTypes.func,
};

export default Header;

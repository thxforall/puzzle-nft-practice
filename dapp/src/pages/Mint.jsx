import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Mint() {
  const [tokenId, setTokenId] = useState(1);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(null);
  const { signer, contract } = useOutletContext();
  const [loading, setLoading] = useState(false);

  const onClickMint = async () => {
    try {
      if (!signer || !contract) return;
      setLoading(true);
      await contract.mintNFT(tokenId, amount);

      const response = await contract.uri(tokenId);
      const result = await axios.get(response);

      setResult(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5efe6] to-[#d7c4ad] flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold text-[#4a4a4a] mb-4">Mint Your NFT</h1>
      <div className="flex gap-4">
        <input
          type="number"
          className="input-style"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Token ID"
        />
        <input
          type="number"
          className="input-style"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button disabled={!signer} className="btn-style" onClick={onClickMint}>
          Mint
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        {loading && <div className="text-2xl text-[#666666]">Loading...</div>}

        {result && (
          <>
            <img
              src={result.image}
              alt={result.name}
              className="rounded-lg shadow-md"
            />
            <h1 className="text-xl font-semibold text-[#4a4a4a]">
              {result.name}
            </h1>
            <h3 className="text-lg text-[#666666]">{result.description}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Mint;

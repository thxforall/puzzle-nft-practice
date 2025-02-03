import { useOutletContext } from "react-router-dom";

function Mint() {
  const { signer, contract } = useOutletContext();

  const onClickMint = async () => {
    try {
      if (!signer || !contract) return;

      const response = await contract.mintNFT(7, 100);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-orange-100">
      <button
        className={`btn-style ${
          !signer && "bg-gray-300 border-gray-500 cursor-not-allowed"
        }`}
        disabled={!signer}
        onClick={onClickMint}
      >
        Mint
      </button>
    </div>
  );
}

export default Mint;

import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const { signer, contract } = useOutletContext();
  const [responses, setResponses] = useState(Array(16).fill(0));
  const [ownedCount, setOwnedCount] = useState(0);

  const tokenIds = Array.from({ length: 16 }, (_, i) => i + 1);

  useEffect(() => {
    const getMyNFTs = async () => {
      try {
        if (!signer || !contract) return;

        const fetchedResponses = await Promise.all(
          tokenIds.map(async (id) => {
            const balance = await contract.balanceOf(signer.address, id);
            return Number(balance);
          })
        );

        setResponses(fetchedResponses);
      } catch (error) {
        console.error(error);
      }
    };
    getMyNFTs();
  }, [signer, contract]);

  useEffect(() => {
    const ownedCount = responses.filter((response) => response > 0).length;
    setOwnedCount(ownedCount);
  }, [responses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5efe6] to-[#d7c4ad] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-[#4a4a4a] mb-2">
            Chilling Playtypus 😎
          </h1>
          <p className="text-xl text-[#666666]">
            No Stress, Just Puzzle Pieces – Chill with Playtypus.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {/* 총 보유 퍼즐 수 */}
          <div className="text-2xl text-[#666666] mb-2">
            Total Playtypus: {ownedCount} / {tokenIds.length}
          </div>
          <div className="w-1/2 h-10 bg-gray-200 rounded-full mb-4">
            <div
              className="h-full bg-[#d7c4ad] rounded-full"
              style={{
                width: `${(ownedCount / tokenIds.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 w-1/2">
            {tokenIds.map((id) => (
              <div
                key={id}
                className="aspect-square bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="relative w-full h-full">
                  <img
                    src={`/public/images/${id}.png`}
                    alt={`Playtypus ${id}`}
                    className={`w-full h-full object-cover ${
                      responses[id - 1] === 0 ? 'brightness-40' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-60 transition-opacity duration-300 grid place-items-center rounded-2xl">
                    <span className="text-white text-lg font-semibold">
                      #{id} : {responses[id - 1] || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 pb-8">
            <button className="bg-[#8b7355] hover:bg-[#6d5a43] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
              <Link
                to="https://sepolia.etherscan.io/address/0xb4E7e1ACDaB54734D129fB12d7b7b653Ac332843"
                target="_blank"
              >
                View on Etherscan
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

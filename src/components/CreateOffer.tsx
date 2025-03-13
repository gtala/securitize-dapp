'use client'

import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { useMarketPlaceCreateOffer, usePrepareMarketPlaceCreateOffer, useMarketPlaceGetAllOffers } from '../generated'
import { parseEther, formatEther } from 'viem'

export function CreateOffer() {
  const [formData, setFormData] = useState({
    tokenAddress: '0x5e50717d6ead1efbb66e39824efd5ca36f6fa22c',
    quantity: '0.01', // string input, need to convert
    cost: '0.01', // string input, need to convert
  })

  // Convert string input to numbers before passing to parseEther
  const quantityInEther = (parseFloat(formData.quantity)).toFixed(18) // Convert to string with decimals
  const costInEther = (parseFloat(formData.cost)).toFixed(18) // Convert to string with decimals

  // Prepare transaction for creating offer
  const { config, error: prepareError, isError: isPrepareError } = usePrepareMarketPlaceCreateOffer({
    args: [
      formData.tokenAddress,
      parseEther(`${quantityInEther as unknown as number}`),  // Passing properly formatted string
      parseEther(`${costInEther as unknown as number}` )  // Passing properly formatted string
    ]
  } as any)

  const { data, error, isError, write } = useMarketPlaceCreateOffer(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (write) write()
  }

  // Fetch all offers using useMarketPlaceGetAllOffers
  const { data: offers, isLoading: offersLoading, isError: offersError, refetch: refetchOffers } = useMarketPlaceGetAllOffers()

  // Refresh offers after creating a new offer
  const handleRefreshOffers = () => {
    refetchOffers() // Triggers the refetch for offers
  }

  return (
      <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Offer</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Token Address */}
          <div>
            <label className="block font-semibold">Token Address:</label>
            <input
                type="text"
                name="tokenAddress"
                value={formData.tokenAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="0x..."
                required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold">Quantity (Tokens):</label>
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter quantity"
                required
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block font-semibold">Cost (ETH):</label>
            <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter cost"
                required
            />
          </div>

          {/* Submit Button */}
          <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={!write || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Offer'}
          </button>
        </form>

        {/* Success Message */}
        {isSuccess && (
            <div className="mt-4 p-2 border rounded bg-green-100 text-green-700">
              Successfully created offer!
              <div>
                <a
                    href={`https://testnet.bscscan.com/tx/${data?.hash}`} // Use the BSC Testnet explorer URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                  View on BSC Testnet Explorer
                </a>
              </div>
            </div>
        )}

        {(isPrepareError || isError) && (
            <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  borderLeft: "4px solid red",
                  backgroundColor: "#fdecea",
                  color: "#d32f2f",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
            >
              Error: You have to allow token spent to Marketplace contract
            </div>
        )}
        {/* Display all offers */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Available Offers</h2>

          {/* Check if offers are loading or there's an error */}
          {offersLoading && <p>Loading offers...</p>}

          {/* Display list of offers */}
          {offers && offers.length > 0 ? (
              <ul className="space-y-2">
                {offers.map((offer, index) => (
                    <li key={index} className="p-2 border rounded bg-gray-100">
                      <div><strong>Seller:</strong> {offer.seller}</div>
                      <div><strong>Token Address:</strong> {offer.token}</div>
                      <div><strong>Quantity:</strong> {offer.quantity.toString()}</div>
                      <div><strong>Cost:</strong> {formatEther(offer.cost)} ETH</div> {/* Format the cost to ETH */}
                    </li>
                ))}
              </ul>
          ) : (
              <p>No offers available.</p>
          )}

          {/* Refresh button */}
          <button
              onClick={handleRefreshOffers}
              className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Refresh Offers
          </button>
        </div>
      </div>
  )
}
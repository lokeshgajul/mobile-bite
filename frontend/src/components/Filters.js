import React, { useState } from "react";

const Filters = ({ setFilteredMobiles, setSearchTerm }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [mobileName, setMobileName] = useState("");
  const [mobileProcessor, setMobileProcessor] = useState("");
  const [mobileDetails, setMobileDetails] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState("");

  const handleFilterByMemory = async (event) => {
    const Memory = event.target.value;

    setSelectedMemory(Memory);
    setMobileProcessor("");
    setMobileName("");

    setSelectedMemory(Memory);
    try {
      const response = await fetch(
        "https://mobile-bite-backend.vercel.app/api/filterByMemory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedMemory: Memory }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFilteredMobiles(data.mobiles);
      } else {
        console.error("Error filtering mobiles:", response.statusText);
        setFilteredMobiles([]);
      }
    } catch (error) {
      console.error("Error filtering mobiles:", error);
      setFilteredMobiles([]);
    }
  };

  const handleFilterByName = async () => {
    setMobileProcessor(""); // Reset mobileProcessor when name filter is applied
    setSelectedMemory("");

    try {
      const response = await fetch(
        "https://mobile-bite-backend.vercel.app/api/filterByName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileName }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMobileDetails(data);
      } else {
        console.error("Error filtering mobiles:", response.statusText);
      }
    } catch (error) {
      console.error("Error filtering mobiles:", error);
    }
  };

  const handleFilterByProcessor = async (event) => {
    const processor = event.target.value;

    setMobileProcessor(processor);
    setMobileName("");
    setSelectedMemory("");
    if (processor) {
      try {
        const response = await fetch(
          `https://mobile-bite-backend.vercel.app/api/filterByProcessor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobileProcessor: processor }),
          }
        );

        const data = await response.json();

        if (data.mobiles && Array.isArray(data.mobiles)) {
          setFilteredMobiles(data.mobiles);
        } else {
          console.error("Mobiles not found in the selected price range");
          setFilteredMobiles([]);
        }
      } catch (error) {
        console.error("Error fetching mobiles:", error);
        setFilteredMobiles([]);
      }
    } else {
      setFilteredMobiles([]);
    }
  };

  const handlePriceRangeChange = async (event) => {
    const priceRange = event.target.value;

    setSelectedPriceRange(priceRange);
    setMobileName("");
    setMobileProcessor("");
    setSelectedMemory("");

    if (priceRange) {
      try {
        const response = await fetch(
          `https://mobile-bite-backend.vercel.app/api/filterByPrice`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filteredPrice: priceRange }),
          }
        );

        const data = await response.json();

        if (data.mobiles && Array.isArray(data.mobiles)) {
          setFilteredMobiles(data.mobiles);
        } else {
          console.error("Mobiles not found in the selected price range");
          setFilteredMobiles([]);
        }
      } catch (error) {
        console.error("Error fetching mobiles:", error);
        setFilteredMobiles([]);
      }
    } else {
      setFilteredMobiles([]);
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setMobileName(name);
    setSearchTerm(name);
    setMobileProcessor("");
    setSelectedMemory("");
  };

  return (
    <div className="py-3 max-md:flex flex-col">
      <h2 className="pb-5">Filters</h2>
      <label htmlFor="priceRange">Price Range:</label>
      <div className="flex flex-col my-2">
        <select
          className="max-w-[70%] py-1"
          id="priceRange"
          name="priceRange"
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          <option value="">Select Price</option>
          <option value="10000-20000">10,000 - 20,000</option>
          <option value="20001-30000">20,001 - 30,000</option>
          <option value="30001-40000">30,001 - 40,000</option>
          <option value="40001-50000">40,001 - 50,000</option>
          <option value="50001">50,000 and above</option>
        </select>
        <p className="py-2">
          selected range: {selectedPriceRange ? selectedPriceRange : "all "}
        </p>
      </div>

      <div className="flex flex-col py-3">
        <select
          className="max-w-[70%] py-1"
          id="priceRange"
          name="priceRange"
          value={mobileProcessor}
          onChange={handleFilterByProcessor}
        >
          <option value="">Select Processor</option>
          <option value="Snapdragon">Snapdragon </option>
          <option value="Google Tensor">Google Tensor</option>
          <option value="MediaTek Helio G95">MediaTek Helio G95</option>
          <option value="Exynos">Exynos </option>
          <option value="A15 Bionic">A15 Bionic</option>
        </select>
        <p className="py-2">
          selected processor : {mobileProcessor ? mobileProcessor : "all "}
        </p>
      </div>

      <div>
        <input
          className="border-2 border-black rounded-md bg-blue-200 mr-2 p-1.5"
          type="text"
          value={mobileName}
          onChange={handleNameChange}
          placeholder="Search mobile here..."
        />
        <button onClick={handleFilterByName}>Filter by Name</button>

        {mobileDetails && (
          <div>
            <h2>{mobileDetails.name}</h2>
          </div>
        )}
      </div>

      <div className="flex flex-col py-3">
        <select
          className="max-w-[70%] py-1"
          id="memoryDropdown"
          name="memoryDropdown"
          value={selectedMemory}
          onChange={handleFilterByMemory}
        >
          <option>Select Memory</option>
          <option value="4GB 64GB">4GB 64GB</option>
          <option value="8GB 128GB">8GB 128GB</option>
          <option value="16GB 256GB">16GB 256GB</option>
          {/* Add more options as needed */}
        </select>
        <p className="py-2" onClick={handleFilterByMemory}>
          {selectedMemory
            ? `Selected Memory ${selectedMemory}`
            : "Filter by RAM and Memory "}
        </p>
      </div>
    </div>
  );
};

export default Filters;

import mobileData from "../mobilesData.json" assert { type: "json" };

export const displayMobiles = async (req, res) => {
  try {
    console.log("Fetching mobile data...");
    res.json({ mobiles: mobileData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const mobileDetails = async (req, res) => {
  const { mobileId } = req.params;
  try {
    console.log(`Fetching details for mobileId: ${mobileId}`);
    const mobileDetails = mobileData.mobiles.find(
      (mobile) => mobile.name === mobileId || mobile.id === mobileId
    );
    if (mobileDetails) {
      return res.json({ mobile: mobileDetails });
    } else {
      console.warn("Mobile not found");
      res.status(404).json({ error: "Mobile not found" });
    }
  } catch (error) {
    console.error("Error fetching mobile details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterByPrice = async (req, res) => {
  try {
    console.log("Filtering by price...");
    const { filteredPrice } = req.body;
    const [minPrice, maxPrice] = filteredPrice.split("-").map(Number);
    const mobilesInPriceRange = mobileData.mobiles.filter(
      (mobile) => mobile.price >= minPrice && mobile.price <= maxPrice
    );

    if (mobilesInPriceRange.length > 0) {
      return res.json({ mobiles: mobilesInPriceRange });
    } else {
      console.warn("No mobiles available in this price range");
      return res
        .status(404)
        .json({ error: "No mobiles available in this price range" });
    }
  } catch (error) {
    console.error("Error filtering mobiles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const filterByName = async (req, res) => {
  const { mobileName } = req.body;
  try {
    console.log(`Filtering by name: ${mobileName}`);
    const matchingMobiles = mobileData.mobiles.filter((mobile) =>
      mobile.name.toLowerCase().includes(mobileName.toLowerCase())
    );

    if (matchingMobiles.length > 0) {
      return res.json({ mobiles: matchingMobiles });
    } else {
      console.warn("Mobile not found");
      res.status(404).json({ error: "Mobile not found" });
    }
  } catch (error) {
    console.error("Error fetching mobile details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterByProcessor = (req, res) => {
  const { mobileProcessor } = req.body;
  try {
    console.log(`Filtering by name: ${mobileProcessor}`);
    const matchingMobileProcessor = mobileData.mobiles.filter((mobile) =>
      mobile.processor.toLowerCase().includes(mobileProcessor.toLowerCase())
    );

    if (matchingMobileProcessor.length > 0) {
      return res.json({ mobiles: matchingMobileProcessor });
    } else {
      console.warn("Mobile not found");
      res.status(404).json({ error: "Mobile not found" });
    }
  } catch (error) {
    console.error("Error fetching mobile details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// mobileController.js

export const filterByMemory = (req, res) => {
  const { selectedMemory } = req.body;

  try {
    if (!selectedMemory || selectedMemory.trim() === "") {
      console.warn("Invalid or empty memory value");
      return res.status(400).json({ error: "Invalid or empty memory value" });
    }

    console.log("Original Mobile Data:", mobileData.mobiles);

    const memoryParts = selectedMemory.split(" ");

    // Filter mobiles based on each memory part
    const matchingMobiles = mobileData.mobiles.filter((mobile) =>
      memoryParts.every((part) =>
        mobile.memory.toLowerCase().includes(part.toLowerCase())
      )
    );

    console.log(`Filtering by Memory: ${selectedMemory}`);
    console.log("Matching Mobiles:", matchingMobiles);

    if (matchingMobiles.length > 0) {
      return res.json({ mobiles: matchingMobiles });
    } else {
      console.warn("Mobiles not found");
      return res.status(404).json({ error: "Mobiles not found" });
    }
  } catch (error) {
    console.error("Error filtering mobiles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const express = require("express");
const router = express.Router();
const Settlement = require("./settlementModel");

router.get("/:linkId/settlements", async (req, res) => {
  try {
    const { linkId } = req.params;
    const settlement = await Settlement.findOne({ linkId });

    if (!settlement) {
      const newSettlement = new Settlement({
        linkId,
        settlements: [],
      });
      await newSettlement.save();
      return res.json({ settlements: [] });
    }

    res.json({ settlements: settlement.settlements });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching settlements", error: error.message });
  }
});

router.post("/:linkId/settlements", async (req, res) => {
  try {
    const { linkId } = req.params;
    const { settlements } = req.body;

    const settlement = await Settlement.findOneAndUpdate(
      { linkId },
      { settlements },
      { new: true, upsert: true }
    );

    res.json({ settlements: settlement.settlements });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating settlements", error: error.message });
  }
});

module.exports = router;

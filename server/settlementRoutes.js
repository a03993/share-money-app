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
      return res.status(201).json({ settlements: [] });
    }

    res.status(200).json({ settlements: settlement.settlements });
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

    const settlementsWithStatus = settlements.map((settlement) => ({
      ...settlement,
      status: "pending",
    }));

    const settlement = await Settlement.findOneAndUpdate(
      { linkId },
      { settlements: settlementsWithStatus },
      { new: true, upsert: true }
    );

    res.status(201).json({ settlements: settlement.settlements });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating settlements", error: error.message });
  }
});

router.put("/:linkId/settlements/:settlementId", async (req, res) => {
  try {
    const { linkId, settlementId } = req.params;
    const { status } = req.body;

    const settlement = await Settlement.findOne({ linkId });
    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found" });
    }

    const settlementDetail = settlement.settlements.id(settlementId);
    if (!settlementDetail) {
      return res.status(404).json({ message: "Settlement detail not found" });
    }

    settlementDetail.status = status;
    await settlement.save();

    res.status(200).json({ settlement: settlementDetail });
  } catch (error) {
    res.status(500).json({
      message: "Error updating settlement status",
      error: error.message,
    });
  }
});

module.exports = router;

import { Address } from "../models/address.model.js";


export const addAddress = async (req, res) => {
  const address = await Address.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json(address);
};

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({
    userId: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(addresses);
};

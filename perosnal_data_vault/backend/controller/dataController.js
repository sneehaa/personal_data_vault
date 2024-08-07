const Data = require("../model/dataModel");
const mongoose = require("mongoose");

// Create new data entry
const createData = async (req, res) => {
  try {
    const { fullName, dateOfBirth, address, phoneNumber, email } = req.body;
    let documents = [];

    console.log("Create Data: req.user:", req.user); // Log the req.user object

    const { id: userId } = req.user; // Ensure the correct property is accessed

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please login again.",
      });
    }

    if (req.files && Array.isArray(req.files)) {
      documents = req.files.map((file) => file.path);
    }

    if (!fullName || !dateOfBirth || !address || !phoneNumber || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const newData = new Data({
      fullName,
      dateOfBirth,
      address,
      phoneNumber,
      email,
      documents,
      createdBy: userId,
    });

    await newData.save();
    res.status(201).json({
      success: true,
      message: "Data added successfully.",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// View all data entries for a specific user
const viewData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Data.find({ createdBy: userId });
    res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get data entry by ID
const getDataById = async (req, res) => {
  try {
    const dataId = req.params.dataId;

    if (!mongoose.Types.ObjectId.isValid(dataId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data ID.",
      });
    }

    const data = await Data.findById(dataId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    data.documents = data.documents.map(
      (doc) => `http://192.168.68.109:5500/uploads/${doc}`
    );

    res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update a data entry
const updateData = async (req, res) => {
  try {
    const dataId = req.params.dataId;
    const updatedData = req.body;

    const data = await Data.findByIdAndUpdate(dataId, updatedData, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete a data entry
const deleteData = async (req, res) => {
  try {
    const dataId = req.params.dataId;

    const data = await Data.findByIdAndDelete(dataId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
    createData,
    viewData,
    getDataById,
    updateData,
    deleteData

    
};
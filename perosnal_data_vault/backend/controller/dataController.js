const cloudinary = require("cloudinary");
const Data = require("../model/dataModel");

const createData = async (req, res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // step 2 : Destructuring data
  const { fullName, dateOfBirth, address, phoneNumber, email } = req.body;
  const { dataImage } = req.files;

  // step 3 : Validate data
  if (!fullName || !dateOfBirth || !address || !phoneNumber || !email) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // upload image to cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(dataImage.path, {
      folder: "userData",
      crop: "scale",
    });

    // Save to database
    const newData = new Data({
      fullName: fullName,
      dateOfBirth:  dateOfBirth,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      dataImageUrl: uploadedImage.secure_url,
    });
    await newData.save();
    res.json({
      success: true,
      message: "Data created successfully",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all Data
const getData = async (req, res) => {
  try {
    const allData = await Data.find({});
    res.json({
      success: true,
      message: "All datas fetched successfully!",
      data: allData,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

// fetch single data
const getSingleData = async (req, res) => {
  const dataId = req.params.id;
  try {
    const singleData = await Data.findById(dataId);
    res.json({
      success: true,
      message: "Single data fetched successfully!",
      data: singleData,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

// update data
const updatedata = async (req, res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // destructuring data
  const { fullName, dateOfBirth, address, phoneNumber, email } =
    req.body;
  const { dataImage } = req.files;

  // validate data
  if (
    !fullName ||
    !dateOfBirth ||
    !address ||
    !phoneNumber ||
    !email
  ) {
    return res.json({
      success: false,
      message: "Required fields are missing!",
    });
  }

  try {
    // case 1 : if there is image
    if (dataImage) {
      // upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        dataImage.path,
        {
          folder: "userData",
          crop: "scale",
        }
      );

      // make updated json data
      const updatedData = {
        fullName: fullName,
      dateOfBirth:  dateOfBirth,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      dataImageUrl: uploadedImage.secure_url,
      };

      // find data and update
      const dataId = req.params.id;
      await Data.findByIdAndUpdate(dataId, updatedData);
      res.json({
        success: true,
        message: "data updated successfully with Image!",
        updateddata: updatedData,
      });
    } else {
      // update without image
      const updatedData = {
        fullName: fullName,
      dateOfBirth:  dateOfBirth,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      
      };

      // find data and update
      const dataId = req.params.id;
      await Data.findByIdAndUpdate(dataId, updatedData);
      res.json({
        success: true,
        message: "data updated successfully without Image!",
        updateddata: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete data
const deletedata = async (req, res) => {
  const dataId = req.params.id;

  try {
    await Data.findByIdAndDelete(dataId);
    res.json({
      success: true,
      message: "data deleted successfully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error!!",
    });
  }
};


module.exports = {
 createData,
 getData,
 getSingleData,
 updatedata,
 deletedata
};

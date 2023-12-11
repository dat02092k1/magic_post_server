const xlsx = require("xlsx");
const Joi = require('joi');

const validateFieldsMiddleware = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded' });
    }
  
    // Check if the uploaded file is an xlsx file
    if (req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return res.status(400).json({ message: 'Invalid file type. Only xlsx files are allowed' });
    }
  
    const workbook = xlsx.readFile(req.file.path);
    // , { cellDates: true }
     
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
  
    console.log("flag");
  
    const validationErrors = [];
  
    for (const item of data) {
  
      const { error } = userSchema.validate(item);
  
      if (error) {
        validationErrors.push(`Row ${data.indexOf(item) + 2}: ${error.message}`);
      }
    }
  
     
  
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation errors",
        errors: validationErrors,
      });
    }
  
    req.data = data;
    next();
  };

  const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    departmentId: Joi.required(),
    password: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    phone: Joi.required(),
    role: Joi.required(),
});

  module.exports = validateFieldsMiddleware;
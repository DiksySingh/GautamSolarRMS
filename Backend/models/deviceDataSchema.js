const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceDataSchema = new Schema({
    dateTime: { 
        type: Date,
        default: Date.now,
    },
    imeiNo: { 
        type: String, 
        required: true,
        minlength: 15,
        maxlength: 15,
        validate: {
            validator: function(v) {
                return /^\d{15}$/.test(v); // Validate if IMEI is exactly 15 digits
            },
            message: props => `${props.value} is not a valid IMEI number!`
        }
    },
    simNo: { 
        type: String, 
        required: true 
    },
    dcVoltage: { 
        type: Number, 
        required: true 
    },
    dcCurrent: { 
        type: Number, 
        required: true 
    },
    dcPower: { 
        type: Number, 
        required: true 
    },
    acVoltage: { 
        type: Number, 
        required: true 
    },
    acCurrent: { 
        type: Number, 
        required: true 
    },
    acPower: { 
        type: Number, 
        required: true 
    },
    fault: { 
        type: Number, 
        required: true 
    },
    todayProduction: { 
        type: Number, 
        required: true 
    },
    totalProduction: { 
        type: Number, 
        required: true 
    },
    createdOn: { 
        type: Date, 
        default: Date.now,
    }
});

const DeviceData = mongoose.model("DeviceData", deviceDataSchema);
module.exports = DeviceData;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceDataSchema = new Schema({
    IMEI_NO: { 
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
    SIM_NO: { 
        type: String, 
        required: true 
    },
    DATE_TIME: { 
        type: Date,
        default: Date.now,
    },
    INPUT_VOLTAGE: { 
        type: String, 
        required: true 
    },
    INPUT_CURRENT: { 
        type: String, 
        required: true 
    },
    INPUT_POWER: { 
        type: String, 
        required: true 
    },
    OUTPUT_VOLTAGE: { 
        type: String, 
        required: true 
    },
    OUTPUT_CURRENT: { 
        type: String, 
        required: true 
    },
    OUTPUT_POWER: { 
        type: String, 
        required: true 
    },
    FAULT: { 
        type: String, 
        required: true 
    },
    TODAY_ENERGY: { 
        type: String, 
        required: true 
    },
    TOTAL_ENERGY: { 
        type: String, 
        required: true 
    },
});

const DeviceData = mongoose.model("DeviceData", deviceDataSchema);
module.exports = DeviceData;
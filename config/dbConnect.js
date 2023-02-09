const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        mongoose.set("strictQuery", true);
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Sukses Koneksi ke database")
    } catch (error) {
        console.log("Koneksi Database Error")
    }
}

module.exports = dbConnect;
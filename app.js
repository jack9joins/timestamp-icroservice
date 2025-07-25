require('dotenv')
const express = require('express');
const router = express.Router();

/*mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const itemSchema = new mongoose.Schema({
    unix: {
        type: Number,
        required: true
    },
    utc: {
        type: Date,
        required: true
    },
});
const Item = mongoose.model('Item', itemSchema);*/

router.get('/:date?', (req, res) => {
    const { date } = req.params;

    // 情况一：无参数，返回当前时间
    if (!date) {
        const now = new Date();
        return res.json({
            unix: now.getTime(),
            utc: now.toUTCString()
        });
    }

    // 情况二：判断是否是纯数字（时间戳）
    const isUnix = /^\d+$/.test(date);
    const parsedDate = isUnix ? new Date(Number(date)) : new Date(date);

    // 情况三：判断是否有效日期
    if (parsedDate.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // 情况四：有效日期，返回格式化时间
    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });
});


module.exports = router;

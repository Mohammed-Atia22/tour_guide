const Job = require('../model/job');



const search = async (req,res)=>{
    const{city,slanguage} = req.body;
    try {
        const job = await Job.find({city:city,slanguage:slanguage});
        res.status(200).json({job,count:job.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no Job with id ${id}`});
    }
}


module.exports = {
    search
}
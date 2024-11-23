const Job = require('../model/job');

const createjob = async (req,res)=>{
    req.body.createdby = req.user.userid;
    console.log(req.user.userid);
    const {city,flanguage,slanguage,fdate,sdate,money,createdby} = req.body;
    if(!city||!flanguage||!slanguage||!fdate||!sdate||!money||!createdby){
        return res.status(400).json({msg:'please provide your city and your first language and your second language and your trip date and the money you want to pay'});
    }
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json(error);
    }
}    
const getalljobs = async (req,res)=>{ 
    try {
        console.log(req.user.userid);
        const job = await Job.find({createdby:req.user.userid});
        res.status(200).json({job,count:job.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:'there is no job available'});
    }
}
const getjob = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid;
    try {
        const job = await Job.findOne({_id:id,createdby:createdby});
        res.status(200).json({job,count:job.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no Job with id ${id}`});
    }
}
const updatejob = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid; 
    try {
        const job = await Job.findByIdAndUpdate({_id:id,createdby:createdby},req.body,{new:true,runValidators:true});
        res.status(200).json({job,count:job.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
}
const deletejob = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid;
    try {
        const job = await Job.findByIdAndDelete({_id:id,createdby:createdby},{new:true,runValidators:true});
        res.status(200).json({job,count:job.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
    
}


module.exports = {
    createjob,
    getalljobs,
    getjob,
    updatejob,
    deletejob
}
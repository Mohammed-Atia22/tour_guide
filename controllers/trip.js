const Trip = require('../model/trip');

const createTrip = async (req,res)=>{
    req.body.createdby = req.user.userid;
    console.log(req.user.userid);
    const {city,flanguage,slanguage,time,money,createdby} = req.body;
    if(!city||!flanguage||!slanguage||!time||!money||!createdby){
        return res.status(400).json({msg:'please provide your city and your first language and your second language and your trip time and the money you want to pay'});
    }
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json(error);
    }
}    
const getallTrips = async (req,res)=>{ 
    try {
        console.log(req.user.userid);
        const trip = await Trip.find({createdby:req.user.userid});
        res.status(200).json({trip,count:trip.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:'there is no trips available'});
    }
}
const getTrip = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid;
    try {
        const trip = await Trip.findOne({_id:id,createdby:createdby});
        res.status(200).json({trip,count:trip.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no trip with id ${id}`});
    }
}
const updateTrip = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid; 
    try {
        const trip = await Trip.findByIdAndUpdate({_id:id,createdby:createdby},req.body,{new:true,runValidators:true});
        res.status(200).json({trip,count:trip.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no trip with id ${id}`});
    }
}
const deleteTrip = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid;
    try {
        const trip = await Trip.findByIdAndDelete({_id:id,createdby:createdby},{new:true,runValidators:true});
        res.status(200).json({trip,count:trip.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no trip with id ${id}`});
    }
    
}


module.exports = {
    createTrip,
    getallTrips,
    getTrip,
    updateTrip,
    deleteTrip
}
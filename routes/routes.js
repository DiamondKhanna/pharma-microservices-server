const fs=require('fs');
const db="./db/medicines_data.json";
const medicine=require('../model/medicine.js');

var appRouter=function(app)
{
    app.get('/',function(req,res)
        {
            res.status(200).send('welcome to our restful apis');
        });

    app.post('/medicine/getAllMedicines',function(req,res)
    {
        fs.readFile(db,function(err,response)
        {
            if(err)
            {
                console.log(err);
                res.status(402).send(JSON.stringify('Error encountered in fetching details. Try again later'));
            }
            var medicines=(JSON.parse(response));
            var result=medicines.filter(item=>
            {
                return !(item.deleted);
            })
            res.status(200).send(JSON.parse(JSON.stringify(result)));
        });
    });

    app.post('/medicine/addMedicine',function(req,res)
    {
        var req_data=req.body;
        fs.readFile(db, function (err, data) {
            var existing_data = JSON.parse(data);
            let med = {};

            if(existing_data.length>0)
            {
                med['id'] = existing_data[existing_data.length-1].id+1;
                med['name'] = req_data.name,
                med['manufacturer'] = req_data.manufacturer,
                med['batch_number'] = req_data.batch_number,
                med['expiration_date'] = req_data.expiration_date,
                med['manufactured_date'] = new Date(),
                med['price'] = req_data.price,
                med['type'] = req_data.type,
                med['deleted'] = false
            }
            else
            {
                med['id'] = 1;
                med['name'] = req_data.name,
                med['manufacturer'] = req_data.manufacturer,
                med['batch_number'] = req_data.batch_number,
                med['expiration_date'] = req_data.expiration_date,
                med['manufactured_date'] = new Date(),
                med['price'] = req_data.price,
                med['type'] = req_data.type,
                med['deleted'] = false
            }

            existing_data.push(med);  
            fs.writeFile(db, JSON.stringify(existing_data),function(err,success)
            {
                if(err)
                {
                    console.log(err);
                    res.status(402).send('Error in saving medicine details. Try again later');
                }
                res.status(200).send(JSON.parse(JSON.stringify({"status":'Medicine added successfully'})));
                   
            });
        });
    });

    app.post('/medicine/updateMedicine',function(req,res)
    {
        var req_data=req.body;
        fs.readFile(db, function (err, data) {
            if(err)
            {
                console.log(err);
            }
            var medicine_array = JSON.parse(data);

            medicine_array[parseInt(req_data.id)-1].name=req_data.name;
            medicine_array[parseInt(req_data.id)-1].manufacturer=req_data.manufacturer;
            medicine_array[parseInt(req_data.id)-1].batch_number=req_data.batch_number;
            medicine_array[parseInt(req_data.id)-1].expiration_date=req_data.expiration_date;
            medicine_array[parseInt(req_data.id)-1].price=req_data.price;
            medicine_array[parseInt(req_data.id)-1].type=req_data.type;

            fs.writeFile(db, JSON.stringify(medicine_array),function(err,success)
            {
                if(err)
                {
                    console.log(err);
                    res.status(402).send('Error in updating medicine details. Try again later');
                }
                res.status(200).send(JSON.parse(JSON.stringify({"status":'Medicine updated successfully'})));
                   
            });

        });

    });

    app.post('/medicine/deleteMedicine',function(req,res)
    {
        var req_data=req.body;
        fs.readFile(db, function (err, data) {
            if(err)
            {
                console.log(err);
            }
            var medicine_array = JSON.parse(data);

            medicine_array[parseInt(req_data.id)-1].deleted=req_data.deleted;

            fs.writeFile(db, JSON.stringify(medicine_array),function(err,success)
            {
                if(err)
                {
                    console.log(err);
                    res.status(402).send('Error in deleting medicine details. Try again later');
                }
                res.status(200).send(JSON.parse(JSON.stringify({"status":'Medicine deleted successfully'})));
                   
            });

        });
    });

}



module.exports={appRouter};
const moment = require("moment");
const pool = require("../config/db.js");

async function addCaseContact(params){
    var createdAt =moment(new Date()).valueOf();
    var updatedAt =moment(new Date()).valueOf();
    const isDeleted = 0;
    const SQL = `insert into casecontact set fullName = ${params.name}, cellNumber = ${params.phoneNumber},
createdAt = ${createdAt}, updatedAt = ${updatedAt} ,createdByUserId = ${params.userId}, modifiedByUserId = ${params.userId},isDeleted = ${isDeleted} ,
caseId = (select caseId from appuser where userId = ${userId} ), contactTypeId = ${params.contactTypeId}, email = ${params.email};
`;

    return new Promise((resolve,reject)=>{
        pool.query(SQL,(err, result) => {
            if(err){
                resolve({
                    isError: true,
                    err: err
                })
            }else{
                resolve({
                    isError:false,
                    message:'Contact inserted successfully',
                    insertId : result.insertId
                        })
            }
        });
    });
}

async function updateCaseContact(params){
    var updatedAt =moment(new Date()).valueOf();
    var SQL = `select * from casecontact where caseContactId = ${params.caseContactId}`;
    if(!params.caseContactId){
        resolve({
            isError: true,
            message: 'CaseContact Id is a required field'
        })
    }
    return new Promise((resolve, reject)=>{
        pool.query(SQL,(err, result)=>{
            if(err){
                resolve({
                    isError: true,
                    err: err
                })
            }else{
                const fullName = params.name ? params.name : result[0].fullName;
                const email = params.email ? params.email : result[0].email;
                const phoneNumber = params.phoneNumber ? params.phoneNumber : result[0].cellNumber;
                const contactTypeId = params.contactTypeId ? params.contactTypeId : result[0].contactTypeId;
                const modifiedUserId = params.userId;
                const updateSQL = `UPDATE casecontact SET fullName = '${fullName}', cellNumber = '${phoneNumber}',
                 updatedAt = ${updatedAt} , modifiedByUserId = ${modifiedUserId},
                 contactTypeId = ${contactTypeId}, email = '${email}'  where caseContactId = ${params.caseContactId}`;
                    pool.query(updateSQL, (err, updateDetails)=>{
                        if(err){
                            resolve({
                                isError: true,
                                err: err
                            });
                        }else{
                            resolve({
                                        isError: false,
                                        message: 'Updated the contact successfully'
                                    });
                        }
                    });
            }
        })
    })
}

async function getCaseContact(detials){
    var SQL = `select * from casecontact where caseContactId = ${detials.caseContactId} and isDeleted = 0`;
    return new Promise((resolve, reject)=>{
        pool.query(SQL,(err,result)=>{
            if(err){
                resolve({
                    isError: true,
                    err: err
                })
            }else{
                resolve({
                    isError: false,
                    message: 'successfully fetched the list',
                    contactDetails:result
                        })
            }
        })
    })
}

async function getAllCaseContact(){
    var SQL = `select * from casecontact where isDeleted = 0`;
    return new Promise((resolve, reject)=>{
        pool.query(SQL,(err,result)=>{
            if(err){
                resolve({
                    isError: true,
                    err: err
                })
            }else{
                resolve({
                    isError: false,
                    message: 'successfully fetched the list of contacts',
                    contactDetails:result
                        })
            }
        })
    })
}

async function deleteCaseContact(detials){
    var SQL = `update casecontact set isDeleted = 1 where caseContactId = ${detials.caseContactId}`;
    return new Promise((resolve, reject)=>{
        pool.query(SQL,(err,result)=>{
            if(err){
                resolve({
                    isError: true,
                    err: err
                })
            }else{
                resolve({
                            isError: false,
                            message: 'successfully Deleted the Contact'
                        })
            }
        })
})
}

module.exports = {
    addCaseContact: addCaseContact,
    updateCaseContact: updateCaseContact,
    getCaseContact:getCaseContact,
    deleteCaseContact:deleteCaseContact,
    getAllCaseContact:getAllCaseContact
};

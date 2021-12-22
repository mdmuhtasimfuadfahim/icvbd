const crypto = require('crypto')
const Web3 = require('web3')
const rpcUrl = "http://localhost:8000"
const web3 = new Web3(rpcUrl)
var Accounts = require('web3-eth-accounts')
var keyth = require('keythereum')
const tx = require('ethereumjs-tx').Transaction
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../../models/certificate')
const Student = require('../../../models/student')
const moment = require('moment')
const axios = require('axios')
const { debuglog } = require('util')
const blockchainCertificate = require('../../../models/blockVerifiedCertificate')
const contarctAdd = require('../../../models/contract')
var getAbi = require('../../../config/abi')
var abi = getAbi.abi
var accountOne = process.env.AccountOne
var privateKeyofAccountOne = process.env.PrivateKeyofAccountOne

function universityCertificateController(){
    return{
        fromRender(req, res){
            res.render('universities/certificate/createForm')
        },
        async tableRender(req, res){
            const certificate = await Certificate.find()
            res.render('universities/certificate/certifcateTable', {certificate: certificate, moment: moment})
        },
        updateForm(req, res){
            axios.get(`${process.env.APP_BASE_URL}/university/certificate/update`, { params : { id : req.query.id }}).then((certificateData) =>{
                 console.log(certificateData.data)
                res.render('universities/certificate/updateForm', { certificate : certificateData.data, moment: moment })
            }).catch(err =>{
                res.send(err)
            })
        },
        createCertificate(req, res){
            const { full_name, email_address, student_id, credit, courses, university_name, major, cgpa, minor, dob, gender, doa, dog } = req.body
            // console.log(req.body)
            /*------------validate request----------*/
            if(!full_name || !email_address || !student_id || !credit || !courses || !university_name || !major || !cgpa || !minor || !dob|| !gender || !doa || !dog){
                req.flash('error', 'All Fields are Required for Cerating a Certificate')
                req.flash('full_name', full_name)
                req.flash('email_address', email_address)
                req.flash('student_id', student_id)
                req.flash('credit', credit)
                req.flash('courses', courses)
                req.flash('university_name', university_name)
                req.flash('major', major)
                req.flash('cgpa', cgpa)
                req.flash('minor', minor)
                req.flash('dob', dob)
                req.flash('gender', gender)
                req.flash('doa', doa)
                req.flash('dog', dog)
                return res.redirect('/university/certificate/form')
            }


            /*-------------check if student email exists------------*/ 
            Certificate.exists({email_address: email_address}, (err, result) =>{
                if(result){
                    req.flash('error', 'This Email is Already Exists')
                    req.flash('full_name', full_name)
                    req.flash('email_address', email_address)
                    req.flash('student_id', student_id)
                    req.flash('credit', credit)
                    req.flash('courses', courses)
                    req.flash('university_name', university_name)
                    req.flash('major', major)
                    req.flash('cgpa', cgpa)
                    req.flash('minor', minor)
                    req.flash('dob', dob)
                    req.flash('gender', gender)
                    req.flash('doa', doa)
                    req.flash('dog', dog)
                    return res.redirect('/university/certificate/form')
                }


                /*-------------check if student ID exists------------*/ 
                Certificate.exists({student_id: student_id}, (err, result) =>{
                    if(result){
                        req.flash('error', 'This Student ID is Already Exists')
                        req.flash('full_name', full_name)
                        req.flash('email_address', email_address)
                        req.flash('student_id', student_id)
                        req.flash('credit', credit)
                        req.flash('courses', courses)
                        req.flash('university_name', university_name)
                        req.flash('major', major)
                        req.flash('cgpa', cgpa)
                        req.flash('minor', minor)
                        req.flash('dob', dob)
                        req.flash('gender', gender)
                        req.flash('doa', doa)
                        req.flash('dog', dog)
                        return res.redirect('/university/certificate/form')
                    }
                })

                /*-------check major and minor are same or not-----------*/
                if(major === minor){
                    req.flash('error', 'Major and Minor cannot be same')
                    req.flash('full_name', full_name)
                    req.flash('email_address', email_address)
                    req.flash('student_id', student_id)
                    req.flash('credit', credit)
                    req.flash('courses', courses)
                    req.flash('university_name', university_name)
                    req.flash('major', major)
                    req.flash('cgpa', cgpa)
                    req.flash('minor', minor)
                    req.flash('dob', dob)
                    req.flash('gender', gender)
                    req.flash('doa', doa)
                    req.flash('dog', dog)
                    return res.redirect('/university/certificate/form')
                } 

                const hash = crypto.createHash('sha256', secret)
                                   .update(full_name, email_address, student_id, credit, courses, university_name, major, cgpa, minor, dob, gender, doa, dog)
                                   .digest('hex');

                const certificate = new Certificate({
                    uniqueID: uuid(),
                    full_name,
                    email_address, 
                    student_id,
                    credit,
                    courses,
                    university_name,
                    major,
                    cgpa, 
                    minor, 
                    dob, 
                    gender, 
                    doa, 
                    dog,
                    hash: hash
                })

                console.log(certificate)

                certificate.save().then(request =>{
                    Student.update({studentID:student_id}, {certificateRequest: 'processing'},{multi:true},
                        (err,result)=>{
                            if(result)
                                console.log(result)
                            else
                                console.log(err)
                        });
                   
                    req.flash('success', 'Certificate Created Successfully')
                    return res.redirect('/university/certificate/form')
                }).catch(err => {
                    console.log(err)
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/university/certificate/form')
                })
    
            })
        },
        postFind(req, res){
            if(req.query.id){
                const id = req.query.id
                console.log(id)
                Certificate.findById(id).then(certificate =>{
                    if(!certificate){
                        res.status(404).send({ message: `Not Found Any Certificate with this ${id}`})
                    }else{
                        res.send(certificate)
                    }
                }).catch(err =>{
                    res.status(500).send({ message: `Error While Retriving Certificate with this ${id}`})
                })
            }
            else{
                Certificate.find().then(certificate =>{
                    res.send(certificate)
                }).catch(err =>{
                    res.status(500).send({ message: err.message || 'Error Occurred While Retriving Certificate Information' })
                })
            }
        },
        postUpdate(req, res){
            if(!req.body){
                return res.status(400).send({ message: 'Data to Update can not be Empty'})
            }
            
            const id = req.params.id
            Certificate.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(certificate =>{
                if(!certificate){
                    res.status(404).send({ message: `Cannot Update Certificate info with ${id}. Maybe Certificate not Found`})
                }else{
                    res.send(certificate)
                }
            }).catch(err =>{
                res.status(500).send({ message: 'Error in Updating Certificate Information'})
            })
        },
        postDelete(req, res){
            const id = req.params.id

            Certificate.findByIdAndDelete(id).then(certificate =>{
                if(!certificate){
                    res.status(404).send({ message: `Cannot Delete Certificate with ${id}. Maybe Id is not Correct`})
                }
                else{
                    res.send({ message: 'Certificate Deleted Successfully'})
                }
            }).catch(err =>{
                res.status(500).send({ message: `Cound not Delete Certificate with this ${id}}`})
            })
        },
        showReadOnly(req, res){
            axios.get(`${process.env.APP_BASE_URL}/university/certificate/update`, { params : { id : req.query.id }}).then((certificateData) =>{
                console.log(certificateData.data)
               res.render('universities/certificate/readOnly', { certificate : certificateData.data, moment: moment})
           }).catch(err =>{
               res.send(err)
           })
        },
        async checkerDashboard(req,res){
            if(req.session.uniUserType !='checker')
               res.redirect('/university/login')
            university_name = req.session.user.uniName
            const certificates = await Certificate.find({isVerified:'not_verified'})
            // console.log(certificates)
            res.render('universities/checker/dashboard',{certificates:certificates,moment:moment})
            
        },
        async checkerVerifies(req,res){           
            var result = await Certificate.findByIdAndUpdate(req.body.certificateId,{isVerified:'approved'},{useFindAndModify:false})
            const contract = await contarctAdd.find();
            const certificateInformation = await Certificate.find({_id: req.body.certificateId})
            console.log(certificateInformation)
            contract.forEach(async (contractAddressGetting) =>{
                const contarctAddressGotten = contractAddressGetting.contractAddress;
                //  console.log(contarctAddressGotten)
                 certificateInformation.forEach(async (certificateInfo) =>{
                    const _uuid = certificateInfo.uniqueID
                    const _fullName = certificateInfo.full_name
                    const _studentEmail = certificateInfo.email_address
                    const _studentID = certificateInfo.student_id
                    const _universityName = certificateInfo.university_name
                    // console.log(uuid + '\n' + full_name + '\n' + email_address + '\n' + student_id)
                    web3.eth.getAccounts().then(async (accounts) =>{
                        const myContract = new web3.eth.Contract(abi, contarctAddressGotten)

                        const myContractCertificate = myContract.methods.storeVerificatedCertificateInfo(_uuid, _fullName, _studentEmail, _studentID, _universityName).encodeABI()

                        const tx = {
                            chainId: 87253,
                            data: myContractCertificate,
                            to: accountOne,
                            value: web3.utils.toWei('0.1', 'ether'),
                            gas: 600000*1.50
                        }

                        web3.eth.accounts.signTransaction(tx, "0x"+ privateKeyofAccountOne).then(signed =>{
                            web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', async (response) =>{
                                console.log(response)

                                const blockchainReturnInformation = new blockchainCertificate({
                                    certificateId: certificateInfo._id,
                                    blockHash: response.blockHash,
                                    blockNumber: response.blockNumber,
                                    contractAddress: response.contractAddress,
                                    cumulativeGasUsed: response.cumulativeGasUsed,
                                    from: response.from,
                                    gasUsed: response.gasUsed,
                                    logsBloom: response.logsBloom,
                                    to: response.to,
                                    transactionHash: response.transactionHash,
                                    transactionIndex: response.transactionIndex,
                                    type: response.type
                                })

                                const saveBlockchainReturnInfo = await blockchainReturnInformation.save()
                                console.log(saveBlockchainReturnInfo)
                            })
                        })
                    })
                })

            })
            

            res.redirect('/university/checker/dashboard')
        }
    }
}

module.exports = universityCertificateController
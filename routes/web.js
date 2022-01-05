const homeController = require('../app/http/controllers/homeController')
const universityAuthController = require('../app/http/controllers/universities/universityAuthController')
const authController = require('../app/http/controllers/authController')
const studentAuthController = require('../app/http/controllers/students/studentAuthController')
const otherAuthController = require('../app/http/controllers/others/otherAuthController')
const ugcAuthController = require('../app/http/controllers/ugc/ugcAuthController')
const universityCertificateController = require('../app/http/controllers/universities/universityCertificateController')
const universityDashboardController = require('../app/http/controllers/universities/universityDashboardController')
const studentDashboardController = require('../app/http/controllers/students/studentDashboardController')
const otherDashboardController = require('../app/http/controllers/others/otherDashboardController')
const ugcDashboardController = require('../app/http/controllers/ugc/ugcDashboardController')
const ugcRequestController = require('../app/http/controllers/ugc/ugcRequestController')
const universityAccount = require('../app/http/controllers/universities/universityAccount')
const universityRequestController = require('../app/http/controllers/universities/universityRequestController')


//------------------Middlewares---------------
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const university = require('../app/http/middlewares/university')
const student = require('../app/http/middlewares/student')
const other = require('../app/http/middlewares/other')


function initRoutes(app){
    app.get('/', homeController().index)
    app.post('/frontpage/verify', homeController().verifyCertificate)
    app.post('/ugc/frontpage/verify', ugcDashboardController().verifyCertificate)
    app.post('/university/frontpage/verify', universityDashboardController().verifyCertificate)

    /*-----------Login and Registration Routes-----------*/
    app.get('/login',  authController().loginpage)
    app.get('/registration', authController().index)

    /*-------------Get Login Pages Routes---------------*/ 
    app.get('/student/login',  studentAuthController().login)
    app.get('/university/login',  universityAuthController().login)
    app.get('/other/login',  otherAuthController().login)
    app.get('/ugc/login',  ugcAuthController().login)

    /*-------------Get Registration Pages Routes----------*/ 
    app.get('/student/registration',  studentAuthController().index)
    app.get('/university/registration',  universityAuthController().index)
    app.get('/other/registration',  otherAuthController().index)
    

    /*-------------Post Routes for Registration-----------*/
    app.post('/university/registration',  universityAuthController().registration)
    app.post('/student/registration',  studentAuthController().registration) 
    app.post('/other/registration',  otherAuthController().registration)

    /*-------------Post Routes for User Login & Logout----------*/
    app.post('/student/login',  studentAuthController().postLogin) 
    app.post('/university/login', universityAuthController().postLogin)
    app.post('/other/login',  otherAuthController().postLogin) 
    app.post('/ugc/login', ugcAuthController().postLogin)
    app.post('/logout',  authController().logout)
    app.get('/logout',  authController().logout) //GET for universal logout
 

    /*-----------University Routes-----------*/
    app.get('/university/certificate/form', universityCertificateController().fromRender) 
    app.get('/university/certificate/table', universityCertificateController().tableRender)
    app.get('/university/certificate/approved-list', universityCertificateController().tableRender)
    app.post('/university/certificate/create', universityCertificateController().createCertificate)
    app.get('/university/certificate/update_form', universityCertificateController().updateForm) 
    app.put('/university/certificate/update/:id',  universityCertificateController().postUpdate) 
    app.delete('/university/certificate/delete/:id', universityCertificateController().postDelete)
    app.get('/university/certificate/read/read_from', universityCertificateController().showReadOnly)
    app.get('/university/certificate/update', universityCertificateController().postFind)
    app.post('/university/certificate/edit', universityCertificateController().certificateEdit)
    app.get('/university/certificate/edit', universityCertificateController().certificateEditDisplay)
    app.get('/university/certificate/maker/view-pending', universityCertificateController().makerViewsPending)
    

    app.get('/university/dashboard', universityDashboardController().dashboardRender) // 'Maker' Dashboard
    app.get('/university/checker/dashboard',  universityCertificateController().checkerDashboard)
    app.post('/university/checker/verify',  universityCertificateController().checkerVerifies)
    app.get('/university/my/account', universityAccount().myAccount)

    app.get('/university/accounts/request', universityRequestController().accountRequests)
    app.post('/university/accounts/approval', universityRequestController().accountApproval)
    app.get('/university/accounts/completed', universityRequestController().showCompleted)

    app.post('/certificate-comment/save', universityCertificateController().certCommentPost)
    app.get('/university/certificate-details/:certId',universityCertificateController().singleCertificateDisplay)
    app.get('/university/certificate/delete', universityRequestController().certificateDeleteForm)
    
    app.get('/university/certificate-filter/display',universityCertificateController().certificateFilterDisplay)
    app.post('/university/certificate-filter/process',universityCertificateController().certificateFilterProcess)
    
    app.post('/university/certificate/delete', universityRequestController().certificateDeletePost)
    app.get('/university/log', universityRequestController().varsityLogDisplay)
    

    /*------------Student Routes-------------*/ 
    app.get('/student/dashboard', studentDashboardController().dashboardRender)
    app.get('/student/account', studentDashboardController().showMyAccount)
    app.get('/student/certificate', studentAuthController().studentCertificate)
    app.get('/student/public/certificate', studentAuthController().viewStudentCertificateQR)
    app.get('/student/public/certificate/:id',studentAuthController().viewPublicStudentCertificateQR)
    

    /*----------Other Routes-------------*/ 
    app.get('/other/dashboard', otherDashboardController().dashboardRender)

    /*-----------------UGC Routes-----------------*/ 
    app.get('/ugc/dashboard', ugcDashboardController().dashboardRender)
    app.get('/ugc/accounts/request', ugcRequestController().accountRequests)
    app.post('/ugc/accounts/approval', ugcRequestController().accountApproval)
    app.get('/ugc/accounts/completed', ugcRequestController().showCompleted)

    app.get('/ugc/accounts/other/request', ugcRequestController().accountOtherRequests)
    app.post('/ugc/accounts/other/approval', ugcRequestController().accounOthertApproval)
    app.get('/ugc/accounts/other/completed', ugcRequestController().showOtherCompleted)

    app.get('/ugc/certificate/bulk', ugcRequestController().bulkCertificateValidationDisplay)
    app.post('/ugc/certificate/bulk/check',ugcRequestController().bulkCertificateValidation)

    app.get('/ugc/university/restrict',ugcRequestController().restrictUniversityDisplay)
    app.post('/ugc/university/restrict',ugcRequestController().restrictUniversityPost)
    app.get('/ugc/university/restricted-list',ugcRequestController().restrictedUniversityList)
    app.get('/ugc/university/logs',ugcRequestController().varsityLogDisplay)
    

    app.get('/ugc/admin/create-faq',ugcRequestController().createQA)
    app.post('/ugc/admin/create-faq',ugcRequestController().createQA)

    app.get('/ugc/client/create',  ugcDashboardController().showThirdPartyRegistrationForm)
    app.post('/ugc/client/create-form-process',  ugcDashboardController().thirdPartyRegistration)
    
    /***experimental routes. NOT TO BE USED IN PRODUCTION***/

    app.get('/exp/session',  universityAuthController().sessionTest)
    app.get('/exp/session-destroy',  universityAuthController().sessionDestroy)
    app.get('/exp/fetch',  universityAuthController().fetchData)
    app.get('/exp/fetch-university',  universityAuthController().fetchUniversity)
    app.get('/exp/fetch-university-names',  universityAuthController().fetchUniNames)
    app.get('/exp/fetch-student',  studentAuthController().fetchData)
    app.get('/exp/edit-student',  studentAuthController().editData)
    app.get('/exp/fetch-other',  otherAuthController().fetchData)
    app.get('/exp/fetch-certificate', homeController().fetchCertificate)
    app.get('/exp/fetch-ugc', ugcAuthController().fetchUGC)
    app.get('/exp/send-email', universityCertificateController().sendEmailToStudent)
    app.get('/exp/send-email2', universityCertificateController().sendEmailToStudentSendGrid)
    app.get('/exp/show-cert-delete-request', ugcRequestController().certificateDeleteRequestShow)
    app.get('/exp/cert-bulk-update', ugcRequestController().certificateBulkUpdateCron)
    app.get('/exp/fetch-log', universityAuthController().fetchLog)
    app.get('/exp/qr-code', universityAuthController().fetchQR)
    app.get('/exp/fetch-other-new',  ugcDashboardController().fetchOther)
}

module.exports = initRoutes
import { createBrowserRouter } from "react-router-dom"
import LeadUpload from "../Dashboard/Admin/Lead/LeadUpload";
import TotalAdmission from "../Dashboard/Admin/Lead/TotalAdmission";
import TotalClose from "../Dashboard/Admin/Lead/TotalClose";
import UploadLead from "../Dashboard/Admin/UploadLead";
import Dashboard from "../Dashboard/Dashboard";
import MyAdmission from "../Dashboard/Employee/MyAdmission";
import MyClose from "../Dashboard/Employee/MyClose";
import MyLead from "../Dashboard/Employee/MyLead";
import OnlineStudent from "../Dashboard/Employee/OnlineStudent";
import OfflineStudent from "../Dashboard/Employee/OfflineStudent";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import PrivateRoutes from "./PrivateRoutes";
import OfflineStudents from "../Dashboard/Admin/Lead/OfflineStudents";
import OnlineStudents from "../Dashboard/Admin/Lead/OnlineStudents";
import SeminarInterested from "../Dashboard/Employee/SeminarInterested";
import TodayFollowup from "../Dashboard/Employee/TodayFollowup";
import TotalAdd from "../Dashboard/Head/TotalAdd";
import TClose from "../Dashboard/Head/TClose";
import OnlineSt from "../Dashboard/Head/OnlineSt";
import OfflineSt from "../Dashboard/Head/OfflineSt";
import UserSetting from "../Dashboard/Admin/Settings/UserSetting";
import TotalLead from "../Dashboard/Admin/Lead/TotalLead";
import ResponsiveDrawer from "../Layout/ResponsiveDrawer";
import NoReceive from "../Dashboard/Employee/NoReceive";
import SeminarAttend from "../Dashboard/Employee/SeminarAttend";
import Report from "../Dashboard/Employee/Report";
import TotalSemiInter from "../Dashboard/Admin/Lead/TotalSemiInter";
import TotalSemiAttend from "../Dashboard/Admin/Lead/TotalSemiAttend";
import TotalNoReceive from "../Dashboard/Admin/Lead/TotalNoReceive";
import TotalTodayFollowUp from "../Dashboard/Admin/Lead/TotalTodayFollowUp";
import HeadSemiInter from "../Dashboard/Head/HeadSemiInter";
import HeadSemiAttends from "../Dashboard/Head/HeadSemiAttends";
import HeadNoReceive from "../Dashboard/Head/HeadNoReceive";
import HeadTodayFollow from "../Dashboard/Head/HeadTodayFollow";
import HeadLeads from "../Dashboard/Head/HeadLeads";
import Profile from "../Pages/Profile";
import PaymentDetails from "../Dashboard/Employee/PaymentDetails";
import PayDetails from "../Dashboard/Admin/Lead/PayDetails";
import HeadPayDetails from "../Dashboard/Head/HeadPayDetails";
import PayReport from "../Dashboard/Admin/Report/BatchReport";
import AddAdmission from "../Dashboard/Admin/Lead/AddAdmission";
import DashboardLayoutM from "../Layout/DashboardLayoutM";
import BatchSetting from "../Dashboard/Admin/Settings/BatchSetting";
import CourseSetting from "../Dashboard/Admin/Settings/CourseSetting";
import HeadSetting from "../Dashboard/Admin/Settings/HeadSetting";
import CollectionReport from "../Dashboard/Admin/Report/CollectionReport";
import PayGetAccountsReport from "../Dashboard/Admin/Report/PayGetAccountsReport";
import ExpenseHead from "../Dashboard/Admin/Expense/ExpenseHead";
import Expense from "../Dashboard/Admin/Expense/Expense";
import AddExpense from "../Dashboard/Admin/Expense/AddExpense";
import ExpenseDateWiseReport from "../Dashboard/Admin/Expense/ExpenseDateWiseReport";
import AddCollection from "../Dashboard/Admin/Collection/AddCollection";
import Collection from "../Dashboard/Admin/Collection/Collection";
import CollectionDateWiseReport from "../Dashboard/Admin/Collection/CollectionDateWiseReport";
import MeneyReceiptWiseReport from "../Dashboard/Admin/Collection/MeneyReceiptWiseReport";
import PurposeWiseReport from "../Dashboard/Admin/Collection/PurposeWiseReport";
import VoucherNoWiseReport from "../Dashboard/Admin/Expense/VoucherNoWiseReport";
import PurposeWiseExReport from "../Dashboard/Admin/Expense/PurposeWiseExReport";
import ProvideLoan from "../Dashboard/Admin/Loan/ProvideLoan";
import ReceiveLoan from "../Dashboard/Admin/Loan/ReceiveLoan";
import AllProviderLoan from "../Dashboard/Admin/Loan/AllProviderLoan";
import AllReceiveLoan from "../Dashboard/Admin/Loan/AllReceiveLoan";
import CollectionHead from "../Dashboard/Admin/Collection/CollectionHead";
import LoanHead from "../Dashboard/Admin/Loan/LoanHead";
import PaymentTypeSetting from "../Dashboard/Admin/Settings/PaymentTypeSetting";
import PayReceiveLoan from "../Dashboard/Admin/Loan/PayReceiveLoan";
import RevPayableLoan from "../Dashboard/Admin/Loan/RevPayableLoan";
import CashIn from "../Dashboard/Admin/CashIn/CashIn";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            // {
            //     path: "/categorie/:id",
            //     element: <PrivateRoutes><CategoryDetails></CategoryDetails></PrivateRoutes>,
            //     loader: ({ params }) =>
            //         fetch(
            //             `https://used-products-resale-server-vert.vercel.app/categorie/${params.id}`
            //         ),
            // },
        ],
    },
    {
        path: '/dashboard/farvez',
        element: <PrivateRoutes><ResponsiveDrawer></ResponsiveDrawer></PrivateRoutes>,
    },
    {
        path: '/dashboard',
        // element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        // element: <PrivateRoutes><ResponsiveDrawer></ResponsiveDrawer></PrivateRoutes>,
        element: <PrivateRoutes><DashboardLayoutM></DashboardLayoutM></PrivateRoutes>,
        // element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        // errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            // {
            //     path: '/dashboard/signup',
            //     element: <Signup />,
            // },
            {
                path: '/dashboard/upload-lead',
                element: <UploadLead></UploadLead>
            },
            {
                path: '/dashboard/total-leads',
                element: <TotalLead></TotalLead>
            },
            {
                path: '/dashboard/total-admission',
                element: <TotalAdmission></TotalAdmission>
            },
            {
                path: '/dashboard/total-close',
                element: <TotalClose></TotalClose>
            },
            {
                path: '/dashboard/online-students',
                element: <OnlineStudents></OnlineStudents>
            },
            {
                path: '/dashboard/offline-students',
                element: <OfflineStudents></OfflineStudents>
            },
            {
                path: '/dashboard/seminar-interesteds',
                element: <TotalSemiInter></TotalSemiInter>
            },
            {
                path: '/dashboard/seminar-attends',
                element: <TotalSemiAttend></TotalSemiAttend>
            },
            {
                path: '/dashboard/total-no-receive',
                element: <TotalNoReceive></TotalNoReceive>
            },
            {
                path: '/dashboard/today-followUps',
                element: <TotalTodayFollowUp></TotalTodayFollowUp>
            },
            {
                path: '/dashboard/admin-pay-details',
                element: <PayDetails></PayDetails>
            },
            {
                path: '/dashboard/add-admissions',
                element: <AddAdmission></AddAdmission>
            },
            {
                path: '/dashboard/lead-upload',
                element: <LeadUpload></LeadUpload>
            },
            {
                path: '/dashboard/setting/user',
                element: <UserSetting></UserSetting>
            },
            {
                path: '/dashboard/settings/batch',
                element: <BatchSetting></BatchSetting>
            },
            {
                path: '/dashboard/settings/course',
                element: <CourseSetting></CourseSetting>
            },
            {
                path: '/dashboard/settings/head',
                element: <HeadSetting></HeadSetting>
            },
            {
                path: '/dashboard/setting/payment-type',
                element: <PaymentTypeSetting></PaymentTypeSetting>
            },
            {
                path: '/dashboard/admin-pay-report',
                element: <PayReport></PayReport>
            },
            {
                path: '/dashboard/report/collection',
                element: <CollectionReport></CollectionReport>
            },
            {
                path: '/dashboard/collection/head',
                element: <CollectionHead></CollectionHead>
            },
            {
                path: '/dashboard/report/payGetway',
                element: <PayGetAccountsReport></PayGetAccountsReport>
            },
            {
                path: '/dashboard/expense/head',
                element: <ExpenseHead></ExpenseHead>
            },
            {
                path: '/dashboard/expense/expense',
                element: <Expense></Expense>
            },
            {
                path: '/dashboard/expense/add',
                element: <AddExpense></AddExpense>
            },
            {
                path: '/dashboard/expense/date-report',
                element: <ExpenseDateWiseReport></ExpenseDateWiseReport>
            },
            {
                path: '/dashboard/collection/add',
                element: <AddCollection></AddCollection>
            },
            {
                path: '/dashboard/collection/collection',
                element: <Collection></Collection>
            },
            {
                path: '/dashboard/collection/date-report',
                element: <CollectionDateWiseReport></CollectionDateWiseReport>
            },
            {
                path: '/dashboard/collection/money-receipt',
                element: <MeneyReceiptWiseReport></MeneyReceiptWiseReport>
            },
            {
                path: '/dashboard/collection/purpose',
                element: <PurposeWiseReport></PurposeWiseReport>
            },
            {
                path: '/dashboard/expense/boucher-report',
                element: <VoucherNoWiseReport></VoucherNoWiseReport>
            },
            {
                path: '/dashboard/expense/purpose',
                element: <PurposeWiseExReport></PurposeWiseExReport>
            },
            {
                path: '/dashboard/loan/provide',
                element: <ProvideLoan></ProvideLoan>
            },
            {
                path: '/dashboard/loan/all-provide',
                element: <AllProviderLoan></AllProviderLoan>
            },
            {
                path: '/dashboard/loan/receive',
                element: <ReceiveLoan></ReceiveLoan>
            },
            {
                path: '/dashboard/loan/all-receive',
                element: <AllReceiveLoan></AllReceiveLoan>
            },

            {
                path: '/dashboard/loan/head',
                element: <LoanHead></LoanHead>
            },
            {
                path: '/dashboard/loan/pay-receive-loan',
                element: <PayReceiveLoan></PayReceiveLoan>
            },
            {
                path: '/dashboard/loan/rev-payable-loan',
                element: <RevPayableLoan></RevPayableLoan>
            },
            {
                path: '/dashboard/cash/cash-report',
                element: <CashIn></CashIn>
            },
            // ________________Head Route

            {
                path: '/dashboard/head-admission',
                element: <TotalAdd></TotalAdd>
            },
            {
                path: '/dashboard/head-close',
                element: <TClose></TClose>
            },
            {
                path: '/dashboard/head-online',
                element: <OnlineSt></OnlineSt>
            },
            {
                path: '/dashboard/head-offline',
                element: <OfflineSt></OfflineSt>
            },
            {
                path: '/dashboard/head-interesteds',
                element: <HeadSemiInter></HeadSemiInter>
            },
            {
                path: '/dashboard/head-attends',
                element: <HeadSemiAttends></HeadSemiAttends>
            },
            {
                path: '/dashboard/head-no-receive',
                element: <HeadNoReceive></HeadNoReceive>
            },
            {
                path: '/dashboard/head-today-followUps',
                element: <HeadTodayFollow></HeadTodayFollow>
            },
            {
                path: '/dashboard/head-leads',
                element: <HeadLeads></HeadLeads>
            },
            {
                path: '/dashboard/head-pay-details',
                element: <HeadPayDetails></HeadPayDetails>
            },


            // ------------User Route
            {
                path: '/dashboard/my-lead',
                element: <MyLead></MyLead>
            },
            {
                path: '/dashboard/my-admission',
                element: <MyAdmission></MyAdmission>
            },
            {
                path: '/dashboard/my-close',
                element: <MyClose></MyClose>
            },
            {
                path: '/dashboard/online-student',
                element: <OnlineStudent></OnlineStudent>
            },
            {
                path: '/dashboard/offline-student',
                element: <OfflineStudent></OfflineStudent>
            },
            {
                path: '/dashboard/seminar-interested',
                element: <SeminarInterested></SeminarInterested>
            },
            {
                path: '/dashboard/seminar-attend',
                element: <SeminarAttend></SeminarAttend>
            },
            {
                path: '/dashboard/no-receive',
                element: <NoReceive></NoReceive>
            },
            {
                path: '/dashboard/today-followup',
                element: <TodayFollowup></TodayFollowup>
            },
            {
                path: '/dashboard/user-report',
                element: <Report></Report>
            },
            {
                path: '/dashboard/payment-details',
                element: <PaymentDetails></PaymentDetails>
            },


        ]
    },

])

export default router

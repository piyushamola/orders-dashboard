import React ,{ useState, useEffect } from 'react'
import Tile from '../Tile/Tile'
import Chart from '../Chart/Chart'
import Datatable from '../Datatable/Datatable'
import {data} from '../../Utils/orders';
import moment from 'moment';
import './Layout.css';

function Layout() {


    let [labels, setLables] = useState([])
    let [dates, setDates] = useState([]);
    let [orderCount, setOrderCount] = useState([]);
    let [topFiveOrder, setTopFiveOrder] = useState();
    let [bottomFiveOrder, setBottomFiveOrder] = useState();
    let [orderTables, setOrderTables] = useState(["Order No", "Total Amount", "Total Quantity", "User Name"]);
    let [userTables, setUserTables] = useState(["User Name", "Total Amount", "Total Quantity", "City"]);
    let [detailTables, setDetailTables] = useState(["User Name", "Order No", "Order Date", "Status", "Total Amount", "Total Qty", "Total Product Count"])
    let [topUserValuesData, setTopUserValues]  = useState([]);
    let [bottomUserValuesData, setBottomUserValues] = useState([]);
    let [detailedValues, setDetailedReport] = useState([]);

    const calculateValues = () => {
        let now = moment();
        let date =  moment(new Date()).format("MM-DD-YY");
        let todaysOrders = data.filter((data) => {
             return data.orderDate === date;
        })

        let currentWeekOrder = data.filter((data) => {
            let input = moment(data.orderDate)
            return now.isoWeek() === input.isoWeek()
        })

        let todaysOrderAmount = todaysOrders.reduce((sum, ele) => {
           return  sum + ele.totalAmount;
        }, 0);


        let weeksOrderAmount = currentWeekOrder.reduce((sum, ele) => {
            return  sum + ele.totalAmount;
        }, 0)

        let currentMonthTotalOrder = data.filter((data) => {
           return  moment(data.orderDate).isSame(moment(new Date()).format("MM-DD-YY"), 'month');
        })

        let lastMonthTotalOrder = data.filter((data) => {
            return moment(data.orderDate).isSame(moment(new Date()).subtract(1, 'months').format('MM-DD-YY'), 'month');
        })

        let currentMonthOrderAmount = currentMonthTotalOrder.reduce((sum, ele) => {
            return sum + ele.totalAmount;
        }, 0)

        let previousMonthOrderAmount = lastMonthTotalOrder.reduce((sum, ele) => {
           return   sum + ele.totalAmount;
        }, 0)

        let options = [
        { label1 : "Today's Order", label2 : "Current Week Order", value2: currentWeekOrder.length, value1 : todaysOrders.length},
        { label1 : "Today's Order Amount", label2 : "Current Week Amount", value2: weeksOrderAmount, value1 : todaysOrderAmount},
        { label1 : "MTD Order", label2 : "Last Month Order", value2: lastMonthTotalOrder.length, value1 : currentMonthTotalOrder.length},
        { label1 : "MTD Order Amount", label2 : "Last Month Amount", value2: previousMonthOrderAmount, value1 : currentMonthOrderAmount}
        ]
        setLables(options);
    }

    const computeChartValues = () => {
       let a = new Map();
       for(let i=0; i<data.length; i++) {
           if(!a.get(data[i].orderDate)) {
               a.set(data[i].orderDate, 1)
           } else {
               let count = a.get(data[i].orderDate);
               count++;
               a.set(data[i].orderDate, count);
           }
       }
       let newData = Array.from(a);
       newData.sort((a, b) => {
           return new Date(a[0]) - new Date(b[0])
       })
       let dates = [];
       let orderCount = [];
       newData.forEach((ele) => {
            dates.push(ele[0]);
            orderCount.push(ele[1]);
       })

       setDates(dates);
       setOrderCount(orderCount);
    }

    const computeTopTableValues = () => {
        let topValues = [...data].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5).map((ele) => {
            return {
                key : ele.orderNo,
                OrderNo : ele.orderNo,
                totalAmount : ele.totalAmount,
                totalQuantity : ele.totalQuantity,
                userName : ele.userName
            }

        });
        let BottomValues = [...data].sort((a,b) => a.totalAmount - b.totalAmount ).slice(0, 5).map((ele) => {
            return {
                key : ele.orderNo,
                OrderNo : ele.orderNo,
                totalAmount : ele.totalAmount,
                totalQuantity : ele.totalQuantity,
                userName : ele.userName
            }
        });

        let topUserValues = [...data].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5).map((ele) => {
            return {
                key : ele.orderNo,
                userName : ele.userName,
                totalAmount : ele.totalAmount,
                totalQuantity : ele.totalQuantity,
                city : ele.city
            }

        });

        let bottomUserValues = [...data].sort((a, b) => a.totalAmount - b.totalAmount).slice(0, 5).map((ele) => {
            return {
                key : ele.orderNo,
                userName : ele.userName,
                totalAmount : ele.totalAmount,
                totalQuantity : ele.totalQuantity,
                city : ele.city
            }

        });

        let detailReportValues = [...data].map((ele) => {
            return {
                key: ele.orderNo,
                userName : ele.userName,
                orderNo : ele.orderNo,
                orderDate : ele.orderDate,
                status : ele.status,
                totalAmount : ele.totalAmount,
                totalQuantity : ele.totalQuantity,
                totalProductCount : ele.totalProductCount
            }
        })
        setTopFiveOrder(topValues);
        setBottomFiveOrder(BottomValues);
        setTopUserValues(topUserValues);
        setBottomUserValues(bottomUserValues);
        setDetailedReport(detailReportValues);
    }

    useEffect(() => {
        calculateValues();
        computeChartValues();
        computeTopTableValues();
    }, [])

    return (
        <div className="Layout">
            <div> <Tile lables = {labels}></Tile></div>
            <div className="chartClass"> <Chart dates={dates} orderCount={orderCount}></Chart> </div>
            <div className="DataTable"> <Datatable values={topFiveOrder} labels={orderTables} heading={"Top 5 Order"}></Datatable></div>
            <div className="DataTable"><Datatable values={bottomFiveOrder} labels={orderTables} heading={"Bottom 5 Order"}></Datatable></div>
            <div className="DataTable"><Datatable values={topUserValuesData} labels={userTables} heading={"Top 5 User"}></Datatable></div>
            <div className="DataTable"><Datatable values={bottomUserValuesData} labels={userTables} heading={"Bottom 5 User"}></Datatable></div>
            <div className="DataTable"><Datatable values={detailedValues} labels={detailTables} heading={"Detailed Order Report"}></Datatable></div>
        </div>
    )
}

export default Layout

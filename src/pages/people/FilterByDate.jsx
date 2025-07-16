import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useCustomerListQuery } from '../../redux/services/customerService';

function FilterByDate({ setFilteredData }) {
    //date start
    const { data } = useCustomerListQuery();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const clickedHandler = () => {
        filterTableData(startDate, endDate);
    };
    const resetHandler = () => {
        setFilteredData(data);
        setStartDate(null);
        setEndDate(null);
    };
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const filterTableData = (start, end) => {
        try {
            if (end && start) {
                const filtered =
                    data &&
                    data.filter((item) => {
                        const itemDate = new Date(item.createdAt);
                        return itemDate >= startDate && itemDate <= endDate;
                    });
                setFilteredData(filtered);
            } else if (start) {
                const filtered =
                    data &&
                    data.filter((item) => {
                        const itemDate = new Date(item.createdAt);
                        return itemDate >= startDate;
                    });
                setFilteredData(filtered);
            } else if (end) {
                const filtered =
                    data &&
                    data.filter((item) => {
                        const itemDate = new Date(item.createdAt);
                        return itemDate <= endDate;
                    });
                setFilteredData(filtered);
            } else if (!end && !start) {
                const filtered =
                    data &&
                    data.filter((item) => {
                        const itemDate = new Date(item.createdAt);
                        return itemDate;
                    });
                setFilteredData(filtered);
            } else {
                setFilteredData(data);
            }
        } catch (error) {
            console.log(error.message);
            setFilteredData([]);
        }
    };
    //date end
    return (
        <div className="ms-4 d-flex gap-2" style={{height: "58px"}}>
            <div className="bg-light rounded-2 text-center">
                <span className="fs-5 fw-bold">Start Date</span>
                <DatePicker
                    className="form-control text-center"
                    selected={startDate}
                    toggleCalendarOnIconClick
                    isClearable
                    placeholderText="provide start date!"
                    onChange={(date) => handleStartDateChange(date)}
                    closeOnScroll={true}
                />
            </div>
            <div className="bg-light rounded-2 text-center">
                <span className="fs-5 fw-bold">End Date</span>
                <DatePicker
                    className="form-control text-center"
                    selected={endDate}  
                    toggleCalendarOnIconClick
                    isClearable
                    placeholderText="provide end date!"
                    onChange={(date) => handleEndDateChange(date)}
                    closeOnScroll={true}
                />
            </div>
            <div className="bg-light rounded-1 align-content-center px-2">
                <button className="btn btn-primary px-2" onClick={clickedHandler}>
                    Filter
                </button>
            </div>
            <div className="bg-light rounded-1 align-content-center px-2">
                <button className="btn btn-warning px-2" onClick={resetHandler}>
                    Reset Table
                </button>
            </div>
        </div>
    );
}

export default FilterByDate;

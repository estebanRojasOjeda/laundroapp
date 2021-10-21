import React from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useEffect, useState } from "react";

const Dashboard = () => {

    const [wash, setWash] = useState([]);

    useEffect(() => {
        axios.get('/api/wash-cycle')
            .then(res => {
                setWash(res.data)
            }).catch(err => Swal.fire('Error al listar lavados', 'favor comunicar al admin', 'error'));
    }, []);


    const dates = [];

    wash.forEach(el => {
        let dateFormated = moment(el.date).format('DD-MM-YYYY');
        dates.push(dateFormated);
    });
    const date = new Set(dates);
    const dateGroup = [...date];

    var cycles = [];
    var charge = [];
    var amount = [];
    dateGroup.forEach(el => {
        var countCycles = 0;
        var sumCharge = 0;
        var sumAmount = 0;
        wash.forEach(data => {
            let dateFormated = moment(data.date).format('DD-MM-YYYY');
            if (el == dateFormated) {
                countCycles++;
                sumCharge += data.charge;
                sumAmount += data.totalAmount;
            }
        })
        cycles.push(countCycles);
        charge.push(sumCharge);
        amount.push(sumAmount);
    })




    const data = {
        labels: dateGroup,
        datasets: [
            {
                label: 'N° lavados',
                data: cycles,
                backgroundColor: '#00acc1',
            },
            {
                label: 'N° Cargas',
                data: charge,
                backgroundColor: '#d81b60',
            },
            {
                label: 'Ganancia',
                data: amount,
                backgroundColor: '#fb8c00',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    };

    return (<>
        <div className='header'>
            <h1 className='title'>Dashboard</h1>
            <div className='links'>

            </div>
        </div>
        <Bar data={data} options={options} />
    </>
    );
}

export default Dashboard;
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
/*
    const dates = [];

    wash.forEach(el =>{
        let dateFormated = moment(el.date).format('DD-MM-YYYY');
        dates.push(dateFormated);
    });

    const dataArr = new Set(dates);

    let result = [...dataArr];
*/

let nuevoObjeto = {};
//Recorremos el arreglo 
wash.forEach( el => {
    let dateFormated = moment(el.date).format('DD-MM-YYYY');
  //Si la ciudad no existe en nuevoObjeto entonces
  //la creamos e inicializamos el arreglo de profesionales. 
  if( !nuevoObjeto.hasOwnProperty(dateFormated)){
    nuevoObjeto[dateFormated] = {
      ventas: []
    }
  }
  
  //Agregamos los datos de profesionales. 
    nuevoObjeto[dateFormated].ventas.push({
      ventas: el.charge
    })
  
})

console.log(nuevoObjeto)

    const data = {
        labels: [nuevoObjeto.indexOf()],
        datasets: [
            {
                label: '# of Green Votes',
                data: [3, 10, 13, 15, 22, 30],
                backgroundColor: 'rgb(75, 192, 192)',
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
            <h1 className='title'>Lavados por mes</h1>
            <div className='links'>

            </div>
        </div>
        <Bar data={data} options={options} />
    </>
    );
}

export default Dashboard;
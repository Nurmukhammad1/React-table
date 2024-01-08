
import React from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Table from '../src/constants/Table';
import './App.css';
import PaginatedTable from './constants/Pagination';


interface Data {
  id: number;
  name: string;
  surname: string;
  baseSalary: number;
  kpi1: number;
  kpi2: number;
  kpi3: number;
  total: number;
  [key: string]: any;
}

const App: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/list');
        const updatedData = response.data.map((item: Data) => ({
          ...item,
          total: item.baseSalary * (item.kpi1 + item.kpi2 + item.kpi3),
        }));
        setData(updatedData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnId] = value;

    if(['baseSalary', 'kpi1', 'kpi2', 'kpi3'].includes(columnId)) {
      const updatedTotal = 
      updatedData[rowIndex].baseSalary *
      (
        updatedData[rowIndex].kpi1 +
        updatedData[rowIndex].kpi2 +
        updatedData[rowIndex].kpi3
      );
      updatedData[rowIndex].total = updatedTotal
    }
    setData(updatedData);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Имя',
        accessor: 'name',
      },
      {
        Header: 'Фамилия',
        accessor: 'surname',
      },
      {
        Header: 'Базовая Зарплата',
        accessor: 'baseSalary',
      },
      {
        Header: 'KPI 1',
        accessor: 'kpi1',
      },
      {
        Header: 'KPI 2',
        accessor: 'kpi2',
      },
      {
        Header: 'KPI 3',
        accessor: 'kpi3',
      },
      {
        Header: 'Итого',
        accessor: 'total',
      },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} updateData={updateData}/>
      {/* < PaginatedTable columns={columns} data={data} updateData={updateData}/> */}
    </div>
  );
};




export default App
